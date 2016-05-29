const expect = require('../../node_modules/chai/lib/chai').expect;

import tokenize from '../src/tokenizer';

describe('Tokenizer', () => {
  it('should support simple white space separeted tokens', () => {
    let tokens = {};
    tokens[0] = tokenize('foo bar na dadi do');
    tokens[1] = tokenize('foo.bar na\tdadi do');
    tokens[2] = tokenize('foo');
    expect(tokens[0]).to.deep.equal(['foo', 'bar', 'na', 'dadi', 'do']);
    expect(tokens[1]).to.deep.equal(['foo.bar', 'na', 'dadi', 'do']);
    expect(tokens[2]).to.deep.equal(['foo']);
  });

  it('should support commas as individual tokens', () => {
    let tokens = {};
    tokens[0] = tokenize('foo bar,do,di');
    tokens[1] = tokenize('foo bar,,di');

    expect(tokens[0]).to.deep.equal(['foo', 'bar', ',', 'do', ',', 'di']);
    expect(tokens[1]).to.deep.equal(['foo', 'bar', ',', ',', 'di']);
  });
  it('should recognize text in quotes as one token', () => {
    let tokens = {};
    tokens[0] = tokenize('foo \'bar code\'');
    tokens[1] = tokenize('foo "bar code"');
    tokens[2] = tokenize('foo "bar ( { [ , code"');
    tokens[3] = tokenize('foo "bar ) } ] , code"');
    tokens[4] = tokenize('foo "bar ( ) [ ] { }, code"');

    expect(tokens[0]).to.be.eql(['foo', '\'bar code\'']);
    expect(tokens[1]).to.be.eql(['foo', '"bar code"']);
    expect(tokens[2]).to.be.eql(['foo', '"bar ( { [ , code"']);
    expect(tokens[3]).to.be.eql(['foo', '"bar ) } ] , code"']);
    expect(tokens[4]).to.be.eql(['foo', '"bar ( ) [ ] { }, code"']);
  });

  it('should recognize text in brackets as one token', () => {
    let tokens = {};
    tokens[0] = tokenize('foo (bar code)');
    tokens[1] = tokenize('foo [bar code]');
    tokens[2] = tokenize('foo {bar code}');
    tokens[3] = tokenize('foo {bar "code"}');
    tokens[4] = tokenize('foo {bar {code}}');
    tokens[5] = tokenize('foo {bar: {code: {foo: "123"}}}');

    expect(tokens[0][1]).to.be.equal('(bar code)');
    expect(tokens[1][1]).to.be.equal('[bar code]');
    expect(tokens[2][1]).to.be.equal('{bar code}');
    expect(tokens[3][1]).to.be.equal('{bar "code"}');
    expect(tokens[4][1]).to.be.equal('{bar {code}}');
    expect(tokens[5][1]).to.be.equal('{bar: {code: {foo: "123"}}}');
  });
});