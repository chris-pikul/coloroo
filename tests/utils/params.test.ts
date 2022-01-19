import { describe } from 'mocha';
import { expect } from 'chai';

import {
  ParameterType,
  detectParamType,
  convertParam,
} from '../../src/utils/params';

describe('Parameter Utils', () => {
  describe('detectParamType()', () => {
    it('accepts the "none" keyword', () => {
      expect(detectParamType('none')).to.equal(ParameterType.NONE);
    });

    it('detects percentage by suffix', () => {
      expect(detectParamType('50%')).to.equal(ParameterType.PERCENTAGE);
      expect(detectParamType('50%0')).to.equal(ParameterType.UNKNOWN);
      expect(detectParamType('50.0%')).to.equal(ParameterType.PERCENTAGE);
    });

    it('resolves floats with decimal or sci-notation', () => {
      expect(detectParamType('50.0')).to.equal(ParameterType.FLOAT);
      expect(detectParamType('50.0%')).to.equal(ParameterType.PERCENTAGE);
      expect(detectParamType('3e2')).to.equal(ParameterType.FLOAT);
      expect(detectParamType('1.5e2')).to.equal(ParameterType.FLOAT);
    });

    it('detects integers as default', () => {
      expect(detectParamType('50')).to.equal(ParameterType.INTEGER);
      expect(detectParamType('-123')).to.equal(ParameterType.INTEGER);
    });
  });

  describe('convertParam()', () => {
    it('accepts number types', () => {
      expect(convertParam(50)).to.eql({ original: 50, type: ParameterType.INTEGER, value: 50 });
      expect(convertParam(3.14)).to.include({ type: ParameterType.FLOAT, value: 3.14 });
    });

    it('detects integer strings', () => {
      expect(convertParam('50')).to.eql({ original: '50', type: ParameterType.INTEGER, value: 50 });
      expect(convertParam('-5')).to.include({ type: ParameterType.INTEGER, value: -5 });
    });

    it('detects float strings', () => {
      expect(convertParam('3.14')).to.eql({ original: '3.14', type: ParameterType.FLOAT, value: 3.14 });
      expect(convertParam('2e2')).to.include({ type: ParameterType.FLOAT, value: 200 });
    });

    it('detects percentage strings and converts to frac', () => {
      expect(convertParam('50%')).to.eql({ original: '50%', type: ParameterType.PERCENTAGE, value: 0.5 });
      expect(convertParam('-20%')).to.include({ type: ParameterType.PERCENTAGE, value: -0.2});
    });

    it('accepts the "none" keyword and defaults to 0', () => {
      expect(convertParam('none')).to.eql({ original: 'none', type: ParameterType.NONE, value: 0 });
    });

    it('quietly rejects unknowns as 0 with type UNKNOWN', () => {
      expect(convertParam('bad')).to.include({ type: ParameterType.UNKNOWN, value: 0 });
      expect(convertParam('some')).to.include({ type: ParameterType.UNKNOWN });
      expect(convertParam('1e')).to.include({ type: ParameterType.UNKNOWN });
    });
  });
});