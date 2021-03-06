import { expect } from 'chai';
import RGB from '../src/RGB';

describe('ColorRGB Class', () => {
  describe('ColorRGB()', () => {
    it('defaults to black', () => {
      expect(new RGB()).to.include({ red: 0, green: 0, blue: 0, alpha: 1});
    });

    it('accepts 32-bit integers', () => {
      expect(new RGB(0xFF7F40)).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
    });

    it('accepts named colors', () => {
      expect(new RGB('fuchsia')).to.include({ red: 255, green: 0, blue: 255 });
    });

    it('accepts hex strings', () => {
      expect(new RGB('#FF7F40')).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
    });

    it('accepts functional strings', () => {
      expect(new RGB('rgb(255, 127, 64)')).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
    });

    it('accepts arrays', () => {
      expect(new RGB([ '100%', 127, '6.4e1' ])).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
    });

    it('accepts objects', () => {
      expect(new RGB({ r: 255, g: 127, b: 64 })).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
    });

    it('accepts component values', () => {
      expect(new RGB(255, 127, 64, 1.0)).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
    });

    it('throws on bad single argument', () => {
      expect(() => new RGB('bad string')).to.throw();
    });
  });

  describe('ColorRGB GET/SET', () => {
    const clr = new RGB();
    it('clamps red to byte', () => {
      clr.red = 512;
      expect(clr.red).to.equal(255, 'expected value over to clamp down');

      clr.red = 3.14;
      expect(clr.red).to.equal(3, 'expected float to be truncated');

      clr.red = -100;
      expect(clr.red).to.equal(0, 'expected negative to clamp to 0');

      expect(clr.setRed(300.123).red).to.equal(255, 'expected func to clamp over value');
    });

    it('clamps green to byte', () => {
      clr.green = 512;
      expect(clr.green).to.equal(255, 'expected value over to clamp down');

      clr.green = 3.14;
      expect(clr.green).to.equal(3, 'expected float to be truncated');

      clr.green = -100;
      expect(clr.green).to.equal(0, 'expected negative to clamp to 0');

      expect(clr.setGreen(300.123).green).to.equal(255, 'expected func to clamp over value');
    });

    it('clamps blue to byte', () => {
      clr.blue = 512;
      expect(clr.blue).to.equal(255, 'expected value over to clamp down');

      clr.blue = 3.14;
      expect(clr.blue).to.equal(3, 'expected float to be truncated');

      clr.blue = -100;
      expect(clr.blue).to.equal(0, 'expected negative to clamp to 0');

      expect(clr.setBlue(300.123).blue).to.equal(255, 'expected func to clamp over value');
    });

    it('clamps alpha to unit', () => {
      clr.alpha = 255;
      expect(clr.alpha).to.equal(1, 'expected value over to clamp down');

      clr.alpha = -1;
      expect(clr.alpha).to.equal(0, 'expected negative to clamp to 0');

      expect(clr.setAlpha(300.123).alpha).to.equal(1, 'expected func to clamp over value');
    });

    it('sets unit values using funcs', () => {
      expect(clr.setRedUnit(3.14).red).to.eql(255, 'clamps red unit to max');
      expect(clr.setGreenUnit(3.14).green).to.eql(255, 'clamps green unit to max');
      expect(clr.setBlueUnit(3.14).blue).to.eql(255, 'clamps blue unit to max');
    });
  });

  describe('ColorRGB.toString()', () => {
    it('outputs functional by default', () => {
      expect(new RGB().toString()).to.eql('rgb(0, 0, 0)');
    });

    it('outputs integer without alpha on opaque', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toString(RGB.Formats.INTEGER)).to.eql((0xFF7F40).toString());
    });

    it('outputs integer with alpha on transparent', () => {
      const clr = new RGB().set(255, 127, 64, 0.5) as RGB;
      expect(clr.toString(RGB.Formats.INTEGER)).to.eql((0xFF7F407F).toString());
    });

    it('outputs integer with alpha forced', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toString(RGB.Formats.INTEGER_ALPHA)).to.eql((0xFF7F40FF).toString());
    });

    it('outputs integer with alpha forced on transparent', () => {
      const clr = new RGB().set(255, 127, 64, 0.5) as RGB;
      expect(clr.toString(RGB.Formats.INTEGER_ALPHA)).to.eql((0xFF7F407F).toString());
    });

    it('outputs hex string with alpha optional', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toString(RGB.Formats.HEX)).to.eql('#ff7f40');

      clr.alpha = 0.5;
      expect(clr.toString(RGB.Formats.HEX)).to.eql('#ff7f407f');
    });

    it('outputs hex string with alpha forced', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toString(RGB.Formats.HEX_ALPHA)).to.eql('#ff7f40ff');
    });

    it('uses rgb() for opaque', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toString(RGB.Formats.FUNCTIONAL)).to.eql('rgb(255, 127, 64)');
    });

    it('uses rgba() for transparent', () => {
      const clr = new RGB().set(255, 127, 64, 0.5) as RGB;
      expect(clr.toString(RGB.Formats.FUNCTIONAL)).to.eql('rgba(255, 127, 64, 0.5)');
    });

    it('uses rgba() when forced', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toString(RGB.Formats.FUNCTIONAL_ALPHA)).to.eql('rgba(255, 127, 64, 1)');
    });

    it('defaults to hex when unknown', () => {
      expect(new RGB().toString('INVALID')).to.eql('#000000');
    });
  });

  describe('ColorRGB.toInteger()', () => {
    it('converts RGB to integer without alpha if opaque', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toInteger()).to.eql(0xFF7F40);
    });

    it('converts RGBA to integer with alpha if transparent', () => {
      const clr = new RGB().set(255, 127, 64, 0.5) as RGB;
      expect(clr.toInteger()).to.eql(0xFF7F407F);
    });

    it('converts RGB to integer with alpha forced', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toInteger(true)).to.eql(0xFF7F40FF);
    });

    it('converts RGB to integer with alpha forced as MSB', () => {
      const clr = new RGB().set(255, 127, 64, 0.5) as RGB;
      expect(clr.toInteger(true, true)).to.eql(0x7FFF7F40);
    });
  });

  describe('ColorRGB.toHexString()', () => {
    it('converts RGB to hex without alpha if opaque', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toHexString()).to.eql('#ff7f40');
    });

    it('converts RGBA to hex with alpha if transparent', () => {
      const clr = new RGB().set(255, 127, 64, 0.5) as RGB;
      expect(clr.toHexString()).to.eql('#ff7f407f');
    });

    it('converts RGB to hex with alpha when forced', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toHexString(true)).to.eql('#ff7f40ff');
    });

    it('converts RGB to hex with alpha as MSB when forced', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toHexString(true, true)).to.eql('#ffff7f40');
    });
  });

  describe('ColorRGB.toFuncString()', () => {
    it('uses rgb() for opaque', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toFuncString()).to.eql('rgb(255, 127, 64)');
    });

    it('uses rgba() for transparent', () => {
      const clr = new RGB().set(255, 127, 64, 0.5) as RGB;
      expect(clr.toFuncString()).to.eql('rgba(255, 127, 64, 0.5)');
    });

    it('uses rgba() when forced', () => {
      const clr = new RGB().set(255, 127, 64) as RGB;
      expect(clr.toFuncString(true)).to.eql('rgba(255, 127, 64, 1)');
    });
  });

  describe('ColorRGB.toArray()', () => {
    it('makes an array', () => {
      const clr = new RGB().set(255, 127, 64, 0.5) as RGB;
      expect(clr.toArray()).to.eql([255, 127, 64, 0.5]);
    });
  });

  describe('ColorRGB.toUnitArray()', () => {
    it('makes an array of units', () => {
      const clr = new RGB(255, 128, 64);
      const arr = clr.toUnitArray();
      expect(arr[0]).to.eql(1);
      expect(arr[1]).to.be.closeTo(0.5, 0.01);
      expect(arr[2]).to.be.closeTo(0.25, 0.01);
      expect(arr[3]).to.eql(1);
    });
  });

  describe('ColorRGB.toYIQValue()', () => {
    it('calculates correctly', () => {
      expect(new RGB(255, 127, 64).toYIQValue()).to.be.closeTo(158.09, 0.001);
    });
  });

  describe('ColorRGB.isDark()', () => {
    it('calculates correctly for dark', () => {
      expect(new RGB('#333').isDark()).to.be.true;
    });

    it('calculates correctly for light', () => {
      expect(new RGB('#AAA').isDark()).to.be.false;
    });
  });

  describe('ColorRGB.isLight()', () => {
    it('calculates correctly for dark', () => {
      expect(new RGB('#333').isLight()).to.be.false;
    });

    it('calculates correctly for light', () => {
      expect(new RGB('#AAA').isLight()).to.be.true;
    });
  });

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

  describe('ColorRGB.setUnits()', () => {
    it('sets all components appropriately', () => {
      expect(new RGB().setUnits(1, 0.5, 0.25, 0.5, 2).toArray()).to.eql([255, 127, 63, 0.5]);
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

  describe('ColorRGB.fromFunctionalString()', () => {
    it('accepts standard RGB format with commas', () => {
      expect(new RGB().fromFuncString('rgb(255, 127, 64)')).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
      expect(new RGB().fromFuncString('rgb(  255,127 ,64 )')).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
    });

    it('accepts standard RGB format with spaces', () => {
      expect(new RGB().fromFuncString('rgb(255 127   64)')).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
    });

    it('accepts RGB with alpha format with commas', () => {
      expect(new RGB().fromFuncString('rgb(255, 127, 64, 0.5)')).to.include({ red: 255, green: 127, blue: 64, alpha: 0.5});
    });

    it('accepts RGB with alpha format with space/slash', () => {
      expect(new RGB().fromFuncString('rgb(255 127 64 / 0.5)')).to.include({ red: 255, green: 127, blue: 64, alpha: 0.5});
    });

    it('doesn\'t care about rgb vs rgba', () => {
      expect(new RGB().fromFuncString('rgba(255, 127, 64)')).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
      expect(new RGB().fromFuncString('rgba(255 127 64 / 0.5)')).to.include({ red: 255, green: 127, blue: 64, alpha: 0.5});
    });

    it('is case insensitive', () => {
      expect(new RGB().fromFuncString('RGB(255, 127, 64)')).to.include({ red: 255, green: 127, blue: 64, alpha: 1});
    });

    it('accepts the "none" keyword', () => {
      expect(new RGB().fromFuncString('RGB(255, none, 64)')).to.include({ red: 255, green: 0, blue: 64, alpha: 1});
    });

    it('allows percentages', () => {
      expect(new RGB().fromFuncString('rgb(100%, 50%, 25% / 50%)')).to.include({ red: 255, green: 127, blue: 63, alpha: 0.5});
    });

    it('throws on malformed strings', () => {
      expect(() => (new RGB().fromFuncString('bad string'))).to.throw();
    });

    it('throws on wrong function', () => {
      expect(() => (new RGB().fromFuncString('hsl(255, 127, 64)'))).to.throw();
    });
  });

  describe('ColorRGB.fromString()', () => {
    it('accepts the "transparent" keyword', () => {
      expect(new RGB().fromString('transparent')).to.include({ red: 0, green: 0, blue: 0, alpha: 0 });
    });

    it('accepts X11 named colors', () => {
      expect(new RGB().fromString('Gold')).to.include({ red: 255, green: 215, blue: 0, alpha: 1});
    });

    it('accepts hex strings', () => {
      expect(new RGB().fromString('#FF8840')).to.include({ red: 255, green: 136, blue: 64 });
    });

    it('accepts functional strings', () => {
      expect(new RGB().fromString('rgb(255, 127.5, 64, 50%)')).to.include({ red: 255, green: 127, blue: 64, alpha: 0.5 });
    });

    it('throws on un-parsables', () => {
      expect(() => new RGB().fromString('bad string')).to.throw();
    });
  });

  describe('ColorRGB.fromArray()', () => {
    it('accepts an array of numbers for RGB', () => {
      expect(new RGB().fromArray([ 255, 127, 64 ])).to.include({ red: 255, green: 127, blue: 64 });
    });

    it('accepts an array of numbers for RGBA', () => {
      expect(new RGB().fromArray([ 255, 127, 64, 0.5 ])).to.include({ red: 255, green: 127, blue: 64, alpha: 0.5 });
    });

    it('accepts an array of strings for RGB', () => {
      expect(new RGB().fromArray([ '255', '100%', 'none' ])).to.include({ red: 255, green: 255, blue: 0 });
    });
  });

  describe('ColorRGB.fromObject()', () => {
    it('works with objects of { r, g, b }', () => {
      expect(new RGB().fromObject({ r: 255, g: 127, b: 64, a: 0.5 }))
        .to.include({ red: 255, green: 127, blue: 64, alpha: 0.5 });
    });

    it('works with long-named properties', () => {
      expect(new RGB().fromObject({ red: 255, green: 127, blue: 64, alpha: 0.5 }))
        .to.include({ red: 255, green: 127, blue: 64, alpha: 0.5 });
    });

    it('allows mixing properties and absense of some', () => {
      expect(new RGB().fromObject({ red: 255, g: 127, opacity: 0.5 }))
        .to.include({ red: 255, green: 127, blue: 0, alpha: 0.5 });
    });

    it('defaults missing components to 0 (or 1 for alpha)', () => {
      expect(new RGB().fromObject({})).to.include({ red: 0, green: 0, blue: 0, alpha: 1 });
    });

    it('ignores other properties', () => {
      expect(new RGB().fromObject({ green: 255, other: 'str', props: 123 }))
        .to.include({ red: 0, green: 255, blue: 0, alpha: 1 });
    });
  });

  describe('ColorRGB.parse()', () => {
    it('skips on no parameter or null/undefined', () => {
      const clr = new RGB().set(255, 127, 64);
      expect(clr.parse(null)).to.include({ red: 255, green: 127, blue: 64 });
      expect(clr.parse(undefined)).to.include({ red: 255, green: 127, blue: 64 });
    });

    it('accepts number arguments', () => {
      expect(new RGB().parse(0xFF8840)).to.include({ red: 255, green: 136, blue: 64, alpha: 1});
    });

    it('accepts hex-string arguments', () => {
      expect(new RGB().parse('FF8840')).to.include({ red: 255, green: 136, blue: 64, alpha: 1});
    });

    it('accepts func-string arguments', () => {
      expect(new RGB().parse('rgb(255, 136, 64)')).to.include({ red: 255, green: 136, blue: 64, alpha: 1});
    });

    it('accepts named color arguments', () => {
      expect(new RGB().parse('Gold')).to.include({ red: 255, green: 215, blue: 0, alpha: 1});
    });

    it('accepts array of numbers arguments', () => {
      expect(new RGB().parse([ 255, 136.5, 64 ])).to.include({ red: 255, green: 136, blue: 64, alpha: 1});
    });

    it('accepts array of string arguments', () => {
      expect(new RGB().parse([ '100%', '136', '6.4e1'])).to.include({ red: 255, green: 136, blue: 64, alpha: 1});
    });

    it('accepts generic object arguments', () => {
      expect(new RGB().parse({ r: 255, g: 136, b: 64 })).to.include({ red: 255, green: 136, blue: 64, alpha: 1});
    });

    it('throws on invalid argument type', () => {
      expect(() => (new RGB().parse(true))).to.throw();
    });
  });

  describe('ColorRGB.luminosity()', () => {
    it('calculates correctly', () => {
      const clr = new RGB(255, 127, 64);
      expect(clr.luminosity()).to.be.closeTo(0.3680890926, 0.000001);
    });
  });

  describe('ColorRGB.contrast()', () => {
    const lit = new RGB(0xFF7F40);
    const drk = new RGB(0x223344);

    it('calculates correctly for a lighter->darker', () => {
      expect(lit.contrast(drk)).to.be.closeTo(5.1456, 0.0001);
    });

    it('calculates correctly for a darker->lighter', () => {
      expect(drk.contrast(lit)).to.be.closeTo(5.1456, 0.0001);
    });
  });

  describe('ColorRGB.contrastLevel()', () => {
    it('calculates a AAA level', () => {
      expect(new RGB('#333').contrastLevel(new RGB('#EEE'))).to.eql('AAA');
    });

    it('calculates a AA level', () => {
      expect(new RGB('#444').contrastLevel(new RGB('#BBB'))).to.eql('AA');
    });

    it('calculates an empty level', () => {
      expect(new RGB('#888').contrastLevel(new RGB('#AAA'))).to.eql('');
    });
  });

  describe('ColorRGB.invert()', () => {
    it('inverts without alpha by default', () => {
      expect(new RGB(255, 127, 64).invert().toArray()).to.eql([0, 128, 191, 1]);
    });

    it('inverts with alpha when asked', () => {
      expect(new RGB(255, 127, 64).invert(true).toArray()).to.eql([0, 128, 191, 0]);
    });
  });

  describe('ColorRGB.desaturate()', () => {
    it('calculates correctly', () => {
      expect(new RGB(255, 127, 64).desaturate().toArray()).to.eql([158, 158, 158, 1]);
    });
  });

  describe('ColorRGB.lerp()', () => {
    it('calculates correctly', () => {
      const clrA = new RGB(0, 10, 20, 0.5);
      const clrB = new RGB(255, 20, 40, 1);
      expect(clrA.lerp(clrB, 0).toArray()).to.eql([ 0, 10, 20, 0.5 ]);
      expect(clrA.lerp(clrB, 1).toArray()).to.eql([ 255, 20, 40, 1 ]);
      expect(clrA.lerp(clrB, 0.5).toArray()).to.eql([ 127, 15, 30, 0.75 ]);
    });
  });
})