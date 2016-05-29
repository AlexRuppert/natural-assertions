#Natural Assertions Extension for Visual Studio Code

This small extension converts natural language comments into [Chai](http://chaijs.com) BDD-Style assertions for Unit tests.
Both the [Should](http://chaijs.com/guide/styles/#should) and [Expect](http://chaijs.com/guide/styles/#expect) syntax are supported.

##Features
Write sentences describing the desired behavior in a `////` comment line and then transform them into assertions that can be used by your javascript testing framework.
This extension automatically identifies parameters and transforms them accordingly.
In addition to the existing Chai syntax, it accepts aliases (like `greater  than` for `above`) and filler words when listing parameters (`and`, `or`, `with`, `to`).

###Transformation Examples
```javascript
//// result1 should be true
//// result2 should be not a number
//// expect result3 to equal 'blue'
//// expect result4 to be exactly [1, 2, 3]
//// expect result5 to be greater than 5
//// expect result6 to be within 1 and 5
//// expect result7 to have own property 'length'
//// expect result8 to havy any keys 'size' 'area'
//// expect result9 to have property 'teas' that is an 'array' that contains 'tea'
```
Tramsforms to:
```javascript
result1.should.be.true;
result2.should.be.NaN;
expect(result3).to.equal('blue');
expect(result4).to.be.eql([1, 2, 3]);
expect(result5).to.be.above(5);
expect(result6).to.be.within(1, 5);
expect(result7).to.have.ownProperty('length');
expect(result8).to.havy.any.keys('size', 'area');
expect(result9).to.have.property('teas').that.is.an('array').that.contain('tea');
```


##Usage
Type `F1` followed by `Assertify`. You can also use the keybinding `CTRL + K CTRL + A` or `CMD + K CMD + A` respectively.

If lines are selected, only those are transformed, if applicable.
Otherwise all lines in the currently open document are searched and transformed.

Lines are only considered for transformation, if they contain `////` followed by a phrase.
The phrase must contain the word `should` or `expect`.
The transformation currently works on a line base, so your sentence must be written in one single line.


###Example

```javascript
it('should not recognize normal comments', () => {
  const result = recognize('// expect');
  //// expect result to have property 'offset' that is less than 0
  //// expect result to have property 'text' that is equal ' expect'
}); 
```
Turns to:
```javascript
it('should not recognize normal comments', () => {
  const result = recognize('// expect');
  expect(result).to.have.property('offset').that.is.below(0);
  expect(result).to.have.property('text').that.is.equal(' expect');
}); 
```
When a function accepts optional parameters, there might be disambiguity, when mixing parameters with reserved words for the assertions.
Use commas to make clear, that the variables are actually meant to be used as the optional parameters.
This is for example the case for:
```javascript
//// foo should have property 'active' false
//// foo should have property 'active', false
```
```javascript
foo.should.have.property('active').false;
foo.should.have.property('active', false);
```

##Building the Extension
The extension uses mostly the unmodified default template.
To run the extension or tests, open the extension folder in Visual Studio Code, switch to the _Debug_ panel and select the desired option from the drop down.
For more details see [the extension developer documentation](https://code.visualstudio.com/docs/extensions/debugging-extensions).