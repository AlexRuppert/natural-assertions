const expect = require('../../node_modules/chai/lib/chai').expect;

import constructAssertion from '../src/assertion-constructor';
import tokenize from '../src/tokenizer';
import chains from '../src/chai-chains';

function helper(text) {
  return constructAssertion(tokenize(text), chains);
}

describe('Assertion Constructor', () => {
  it('should support simple examples', () => {
    const result = {};
    result[0] = helper('foo should be true');
    result[1] = helper('expect foo to be true');

    expect(result[0]).to.be.equal('foo.should.be.true;');
    expect(result[1]).to.be.equal('expect(foo).to.be.true;');
  });
  it('should support parameters', () => {
    const result = {};
    result[0] = helper('foo should have property "bar" 3');
    result[1] = helper('expect foo to be within 1 and 3');

    expect(result[0]).to.be.equal('foo.should.have.property("bar", 3);');
    expect(result[1]).to.be.equal('expect(foo).to.be.within(1, 3);');
  });
  it('should should support aliases and children', () => {
    const result = {};
    result[0] = helper('expect foo to be equal to 3');
    result[1] = helper('expect foo to have own property descriptor "bar"');
    result[2] = helper('expect foo to be less than 3');

    expect(result[0]).to.be.equal('expect(foo).to.be.equal(3);');
    expect(result[1]).to.be.equal('expect(foo).to.have.ownPropertyDescriptor("bar");');
    expect(result[2]).to.be.equal('expect(foo).to.be.below(3);');

  });
  it('should should support complex examples', () => {
    const result = {};
    result[0] = helper('expect foo own property "bar" to have keys "boo" "noo" "goo"');
    result[1] = helper('expect deepObj to have property "teas" that is an "array" with deep property "[2]" that deep equals { tea: "konacha" }');

    expect(result[0]).to.be.equal('expect(foo).ownProperty("bar").to.have.keys("boo", "noo", "goo");');
    expect(result[1]).to.be.equal('expect(deepObj).to.have.property("teas").that.is.an("array").with.deep.property("[2]").that.deep.equal({ tea: "konacha" });');

  });
});