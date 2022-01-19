import { expect } from 'chai';
import RGB from '../src/RGB';

describe('ColorRGB Class', () => {
  describe('ColorRGB.set()', () => {
    it('accepts 3 number arguments', () => {
      const clr = new RGB();
      expect(clr.set(255, 127, 64)).to.include({ red: 255, green: 127, blue: 64, alpha: 1 });
    });

    it('accepts 4 numbers for RGBA', () => {
      const clr = new RGB();
      expect(clr.set(255, 127, 64, 0.5)).to.include({ red: 255, green: 127, blue: 64, alpha: 0.5 });
    });

    it('accepts less than 3 for individuals', () => {
      const clr = new RGB();
      expect(clr.set(255, 127)).to.include({ red: 255, green: 127, blue: 0, alpha: 1 });
    });

    it('skips undefined|null components', () => {
      const clr = new RGB();
      expect(clr.set(255, null, undefined, 0.5)).to.include({ red: 255, green: 0, blue: 0, alpha: 0.5 });
    });

    it('exits after 4 components', () => {
      const clr = new RGB();
      expect(clr.set(255, 127, 64, 0.5, 32, -1)).to.include({ red: 255, green: 127, blue: 64, alpha: 0.5 });
    });

    it('clamps RGB integers to bytes', () => {
      const clr = new RGB();
      expect(clr.set(512, -52)).to.include({ red: 255, green: 0 });
    });

    it('clamps RGB floats to bytes', () => {
      const clr = new RGB();
      expect(clr.set(255.5, 32.6)).to.include({ red: 255, green: 32 });
    });

    it('accepts percentage strings and clamps', () => {
      const clr = new RGB();
      expect(clr.set('200%', '-25%')).to.include({ red: 255, green: 0 });
      expect(clr.set('50%')).to.have.property('red', 127);
    });

    it('defaults RGB components to 0 on "none" keyword', () => {
      const clr = new RGB();
      clr.set(255, 127, 64);
      expect(clr.set('none', 32)).to.include({ red: 0, green: 32, blue: 64, alpha: 1 });
    });

    it('failovers un-parsable values to 0', () => {
      const clr = new RGB();
      clr.set(255, 127, 64);
      expect(clr.set('bad', 'color', 'value')).to.include({ red: 0, green: 0, blue: 0 });
    });

    it('clamps alpha regardless of input to unit', () => {
      const clr = new RGB();
      expect(clr.set(255, 127, 64, 2)).to.include({ alpha: 1 });
      expect(clr.set(255, 127, 64, -0.5)).to.include({ alpha: 0 });
    });

    it('accepts strings for RGB', () => {
      const clr = new RGB();
      expect(clr.set('255', '127.5', '25%')).to.include({ red: 255, green: 127, blue: 63 });
    });

    it('accepts sci-notation', () => {
      const clr = new RGB();
      expect(clr.set('6.4e1')).to.include({ red: 64 });
    });
  });

  describe('ColorRGB.fromInteger()', () => {
    it('accepts RGB integers', () => {
      const clr = new RGB();
      expect(clr.fromInteger(0xFF8840)).to.include({ red: 255, green: 136, blue: 64, alpha: 1});
    });

    it('converts floats into integers', () => {
      const clr = new RGB();
      const val = (0xFF8840) + 0.5;
      expect(clr.fromInteger(val)).to.include({ red: 255, green: 136, blue: 64, alpha: 1 });
    });

    it('accepts a `useAlpha` switch with LSB as default', () => {
      const clr = new RGB();
      expect(clr.fromInteger(0xFF884080, true)).to.include({ red: 255, green: 136, blue: 64 });
      expect(clr.alpha).to.be.closeTo(0.5, 0.01);
    });

    it('accepts a `useAlpha` switch with MSB as a flag', () => {
      const clr = new RGB();
      expect(clr.fromInteger(0x80FF8840, true, true)).to.include({ red: 255, green: 136, blue: 64 });
      expect(clr.alpha).to.be.closeTo(0.5, 0.01);
    });
  });

  describe('Color.RGB.fromHexString()', () => {
    it('parses short-code RGB', () => {
      const clr = new RGB();
      expect(clr.fromHexString('#F83')).to.include({ red: 255, green: 136, blue: 51 });
    });

    it('parses short-code RGBA', () => {
      const clr = new RGB();
      expect(clr.fromHexString('#F83A')).to.include({ red: 255, green: 136, blue: 51 });
      expect(clr.alpha).to.be.closeTo(0.66, 0.01);
    });

    it('parses long-code RGB', () => {
      const clr = new RGB();
      expect(clr.fromHexString('#FF8840')).to.include({ red: 255, green: 136, blue: 64 });
    });

    it('parses long-code RGBA', () => {
      const clr = new RGB();
      expect(clr.fromHexString('#FF884080')).to.include({ red: 255, green: 136, blue: 64 });
      expect(clr.alpha).to.be.closeTo(0.5, 0.01);
    });

    it('throws on invalid number of components', () => {
      const clr = new RGB();
      expect(() => clr.fromHexString('#01234')).to.throw();
    });

    it('throws on non-hex strings', () => {
      const clr = new RGB();
      expect(() => clr.fromHexString('bad string')).to.throw();
    });

    it('has the # optional', () => {
      const clr = new RGB();
      expect(clr.fromHexString('F83')).to.include({ red: 255, green: 136, blue: 51 });
      expect(clr.fromHexString('FF8840')).to.include({ red: 255, green: 136, blue: 64 });
    });
  });
})