import { describe } from 'mocha';
import { expect } from 'chai';

import { clamp, clampByte } from '../../src/utils/math';

describe('Math Utilities', () => {
  describe('clamp()', () => {
    it('clamps float values by default to units', () => {
      expect(clamp(0.5)).to.equal(0.5);
      expect(clamp(-1.5)).to.equal(0);
      expect(clamp(5.2)).to.equal(1);
    });

    it('clamps negatives if needed', () => {
      expect(clamp(0.5, -1, 1)).to.equal(0.5);
      expect(clamp(-0.3, -1, 1)).to.equal(-0.3);
      expect(clamp(-3, -1, -0.5)).to.equal(-1);
      expect(clamp(1, -3, -0.5)).to.equal(-0.5);
    });
  });

  describe('clampByte()', () => {
    it('clamps integers to byte by default', () => {
      expect(clampByte(64)).to.equal(64);
      expect(clampByte(-2)).to.equal(0);
      expect(clampByte(512)).to.equal(255);
    });

    it('truncates floats into integers', () => {
      expect(clampByte(32.5)).to.equal(32);
      expect(clampByte(-0.5)).to.equal(0);
      expect(clampByte(254.6)).to.equal(254);
    });
  });
});
