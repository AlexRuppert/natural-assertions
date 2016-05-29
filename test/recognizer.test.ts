const expect = require('../../node_modules/chai/lib/chai').expect;

import recognize from '../src/recognizer';

describe('Recognizer', () => {
  it('should recognize special comments', () => {
    const result = {};
    result[0] = recognize('//// expect foo');
    result[1] = recognize(' ////expect foo');
    result[2] = recognize('////foo should be');
    result[3] = recognize('////    foo should  ');
    expect(result[0]).to.have.property('offset').that.equal(0);
    expect(result[0]).to.have.property('text').that.equal(' expect foo');
    expect(result[1]).to.have.property('offset').that.equal(1);
    expect(result[1]).to.have.property('text').that.equal('expect foo');
    expect(result[2]).to.have.property('offset').that.equal(0);
    expect(result[2]).to.have.property('text').that.equal('foo should be');
    expect(result[3]).to.have.property('offset').that.equal(0);
    expect(result[3]).to.have.property('text').that.equal('    foo should  ');
  });
  it('should not recognize normal comments', () => {
    const result = {};
    result[0] = recognize('// expect');
    result[1] = recognize('// should');
    result[2] = recognize('/// should');
    result[3] = recognize('//// foo bar');
    expect(result[0]).to.have.property('offset').that.is.below(0);
    expect(result[1]).to.have.property('offset').that.is.below(0);
    expect(result[2]).to.have.property('offset').that.is.below(0);
    expect(result[3]).to.have.property('offset').that.is.below(0);
  });
});