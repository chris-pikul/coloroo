import { expect } from 'chai';

import { captureAll, captureFirst } from '../../src/utils/regexp';

const reTest = /(bar)/gi;

describe('RegExp Utils', () => {
  describe('captureAll()', () => {
    it('grabs all capture groups', () => {
      expect(captureAll(reTest, 'foo bar foo bar')).to.eql([ ['bar'], ['bar'] ]);
    });
  });

  describe('captureFirst()', () => {
    it('grabs only the first group', () => {
      expect(captureFirst(reTest, 'foo bar foo bar')).to.eql([ 'bar' ]);
    });
  });
});