import { expect } from 'chai';

import {
  clamp,
  clampByte,
  lerp,
  toByte,
} from '../../src/utils/math';

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

  describe('lerp()', () => {
    it('calculates correctly', () => {
      expect(lerp(5, 10, 0)).to.eql(5);
      expect(lerp(5, 10, 1)).to.eql(10);
      expect(lerp(5, 10, 0.5)).to.eql(7.5);
    })
  });

  describe('toByte()', () => {
    it('re-scales appropriately', () => {
      expect(toByte(0.5)).to.eql(127);
    });

    it('clamps negatives to 0', () => {
      expect(toByte(-0.75)).to.eql(0);
    });

    it('clamps over 1 to 255', () => {
      expect(toByte(2.1)).to.eql(255);
    });
  });
});
