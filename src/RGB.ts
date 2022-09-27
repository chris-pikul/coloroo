/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 * 
 * Defines the implementation for the RGB color spectrum. The channels red,
 * green, and blue are presented as unit floats (0..1) with byte integer
 * interfaces.
 * 
 * @module RGB
 */
import IColor from './IColor';
import NamedColors, { ENamedColor } from './NamedColors';
import {
  NoOpMapCallback,
  ChannelMapCallback,
  AlphaMapCallback,
} from './mapping';

import {
  clamp,
  ensureUnit,
  lerp,
  toByte,
  toPercent,
} from './utils/math';
import { objectMatchesPattern } from './utils/objects';
import { convertParam, ParameterType } from './utils/params';
import {
  captureFirst,
  regexpHex,
  regexpRGBFunc,
} from './utils/regexp';

/**
 * Tuple array holding the red, green, blue, and optionally alpha channels.
 * Each value is considered a unit float (0..1)
 */
export type RGBTuple = [number, number, number, number?];

/**
 * Interface defining a shorthand RGB object capable of JSON serialization.
 */
export interface RGBObject extends Record<string, number> {

  /**
   * Red channel, as a unit float (0..1)
   */
  r:number;

  /**
   * Green channel, as a unit float (0..1)
   */
  g:number;

  /**
   * Blue channel, as a unit float (0..1)
   */
  b:number;

  /**
   * Alpha channel, as a unit float (0..1)
   */
  a?:number;
};

// Dummy object for use with objectMatchesPattern()
const rgbPattern:RGBObject = {
  r: 1,
  g: 1,
  b: 1,
  a: 1,
};

/**
 * RGB Color-space. Holds each channel (red, green, blue, and alpha) as unit
 * floats. Each channel is clamped to 0..1 regardless of manipulations.
 * 
 * @immutable
 */
export class ColorRGB implements IColor {
  private static ensureRGB(clr:any):ColorRGB {
    if(clr instanceof ColorRGB) {
      return clr;
    } else if(typeof clr === 'object') {
      if(typeof clr.toRGB === 'function') {
        return clr.toRGB();
      } else if(objectMatchesPattern(clr, rgbPattern, true)) {
        const obj = clr as any;
        const red = ensureUnit(obj.r ?? obj.red) ?? 0.0;
        const green = ensureUnit(obj.g ?? obj.green) ?? 0.0;
        const blue = ensureUnit(obj.b ?? obj.blue) ?? 0.0;
        const alpha = ensureUnit(obj.a ?? obj.alpha ?? obj.opacity) ?? 1.0;
        return new ColorRGB(red, green, blue, alpha);
      }
    }
    throw new TypeError(`given color cannot be implied or converted to ColorRGB. Missing "toRGB" method.`);
  }

  static fromRGB(rgb:ColorRGB):IColor {
    return new ColorRGB(rgb);
  }

  /**
   * Converts an incoming integer number into it's RGB(A) channel values and
   * returns an appropriate ColorRGB object
   * 
   * @param value Incoming integer number to convert
   * @param useAlpha If true, then an alpha component is present on this value,
   * and will be parsed appropriately. Default is `false`.
   * @param alphaMSB When `useAlpha` is true, this flag sets whether the alpha
   * component is in the Most-Significant-Byte, or the Least-Significant-Byte.
   * Default is to treat alpha as the LSB.
   * @returns {ColorRGB} new ColorRGB object
   */
  static fromInteger(value:number, useAlpha = false, alphaMSB = false):ColorRGB {
    // Convert the number to an integer
    let int = (value >>> 0);

    // Prepare channels as bytes
    let red = 0;
    let green = 0;
    let blue = 0;
    let alpha = 255;

    if(useAlpha) {
      // Determine the alpha byte position and grab it
      alpha = alphaMSB ? ((int >> 24) & 0xFF) : (int & 0xFF);

      // If the alpha was LSB then shift the remaining integer right by 8-bits
      if(alphaMSB)
        int = int & 0xFFFFFF;
      else
        int >>= 8;
    }

    red = (int >> 16) & 0xFF;
    green = (int >> 8) & 0xFF;
    blue = int & 0xFF;

    return new ColorRGB(red / 255, green / 255, blue / 255, alpha / 255);
  }

  /**
   * Parses the incoming string as a hexidecimal notation RGB(A) color. This is
   * case-insensitive, and the prefix "#" is optional. Accepts the following
   * formats:
   * 
   * - `#FA0`: Short-form, half-byte values for each channel RGB. Will be
   * resized to the full-byte size 0..255.
   * - `#FA08`: Short-form, half-byte values for the RGB and Alpha channels. 
   * Will be resized to the full-byte size 0..255.
   * - `#FFAA00`: Long-form, byte values for the RGB channels.
   * - `#FFAA0088`: Long-form, byte values for the RGB and Alpha channels.
   * 
   * @param str Input string to parse
   * @returns {ColorRGB} new ColorRGB object
   * 
   * @throws {TypeError} If the string is not parsable as a hex value
   * @throws {TypeError} If the string has too many or too little
   */
  static fromHex(str:string):ColorRGB {
    const hexMatch = str.match(regexpHex);
    if(hexMatch && hexMatch.length === 2) {
      const hex = hexMatch[1];
      const int = Number.parseInt(hex, 16) >>> 0;

      // Turns half-byte integers into full-byte
      const htf = (hb:number) => (hb | (hb << 4));

      // Prepare channels as bytes
      let red = 0;
      let green = 0;
      let blue = 0;
      let alpha = 255;

      if(hex.length === 3) {
        // 3 length hex implies shorthand 4-bit colors (RGB)
        blue = htf(int & 0xF);
        green = htf((int & 0xF0) >>> 4);
        red = htf((int & 0xF00) >>> 8);
      } else if(hex.length === 4) {
        // 4 length hex implies shorthand 4-bit colors (RGBA)
        alpha = htf(int & 0xF);
        green = htf((int & 0xF0) >>> 4);
        blue = htf((int & 0xF00) >>> 8);
        red = htf((int & 0xF000) >>> 12);
      } else if(hex.length === 6) {
        // 6 length hex is opaque 8-bit colors (RRGGBB)
        return ColorRGB.fromInteger(int);
      } else if(hex.length === 8) {
        // 8 length hex is transparent 8-bit colors (RRGGBBAA)
        return ColorRGB.fromInteger(int, true);
      } else {
        throw new Error(`ColorRGB.fromHex() received malformed hexidecimal string. Expected length of 3, 6, or 8, but instead got "${hex.length}".`);
      }

      return new ColorRGB(red / 255, green / 255, blue / 255, alpha / 255);
    }

    throw new TypeError(`ColorRGB.fromHex() received malformed hexidecimal string. The value "${str}" cannot be parsed.`);
  }

  /**
   * Parses the input string as a CSS3+ functional-notation color value. Only
   * accepts the `rgb()` and `rgba()` functions. Both the comma-separated and
   * space-separated formats are accepted. If the space-separated version is
   * used with an alpha channel, then a forward-slash delimiter is required
   * before the alpha channel. It will convert numeric formats in integer,
   * fractional, and scientific notation. As well as supporting percentages, and
   * the new "none" keyword for CSS4 (just implies 0). There is some forgiveness
   * on the formatting since it's regular-expression based. Things like mixed
   * formats between space/comma separated and such. Additionally, according to
   * the CSS4 spec, the `rgb()` version can still accept an alpha channel.
   * Either way, at least 3 components are required for at least RGB.
   * 
   * Example formats accepted.
   * ```
   * rgb(255, 127, 64)
   * rgb(255 127 64)
   * rgb(255, 127, 64, 0.5)
   * rgb(255 127 64 / 0.5)
   * rgba(100%, 50%, 25%)
   * rgba(100% 50% 25% / 50%)
   * ```
   * 
   * @param str Input string to parse
   * @returns {ColorRGB} new ColorRGB object
   * 
   * @throws {TypeError} if the string cannot be parsed
   * @throws {TypeError} if the number of components is invalid
   */
  static fromFunctional(str:string):ColorRGB {
    const clnStr = str.trim().toLowerCase();

    // Use the regular expression to match against functional notation for RGB
    const matches = captureFirst(regexpRGBFunc, clnStr);
    if(matches === null)
      throw new TypeError(`ColorRGB.fromFunctional() failed to parse the string "${str}".`);

    // Pass the remaining values off to constructor since it converts strings
    return new ColorRGB(...matches);
  }

  /**
   * Converts an incoming string to acceptable components and sets the channels
   * of a new ColorRGB object. Will attempt to parse as each format in order
   * until one does not give an error. If none of the processes work then a
   * `TypeError` is thrown specifying so.
   * 
   * Accepts the following formats with their specifications:
   * 
   * ### Named Colors (X11)
   * Checks if the input string is a valid X11 color name as specified in the
   * CSS4 color module. If there is a match, it is converted to hexidecimal and
   * then processed.
   * 
   * The special named color "transparent" is accepted and will result in black
   * with an alpha of 0 (fully transparent).
   * 
   * ### Hexidecimal
   * Uses the {@link ColorRGB.fromHex} method to parse as a hexidecimal
   * string. This is case insensitive and accepts shortform and longform hex
   * strings, with or without alpha channel. As with most hex strings if there
   * is an alpha component it is the least-significant byte. Additionally, the
   * prefix "#" is optional as well.
   * 
   * - `#FA0`: Short-form, half-byte values for each channel RGB. Will be
   * resized to the full-byte size 0..255.
   * - `#FA08`: Short-form, half-byte values for the RGB and Alpha channels. 
   * Will be resized to the full-byte size 0..255.
   * - `#FFAA00`: Long-form, byte values for the RGB channels.
   * - `#FFAA0088`: Long-form, byte values for the RGB and Alpha channels.
   * 
   * ### Functional-notation
   * Uses the {@link ColorRGB.fromFunctional} method to parse as a
   * functional notation string in the style of CSS4, with some forgiveness.
   * Will accept either 3-component for RGB, or 4-component for RGBA. Each
   * parameter can be either an integer, float, or percentage value which will
   * be converted as appropriate for the channel.
   * 
   * Example formats accepted.
   * ```
   * rgb(255, 127, 64)
   * rgb(255 127 64)
   * rgb(255, 127, 64, 0.5)
   * rgb(255 127 64 / 0.5)
   * rgba(100%, 50%, 25%)
   * rgba(100% 50% 25% / 50%)
   * 
   * rgb(200.5, 1.27e2, +64 / .5)
   * ```
   * 
   * @param str Input string
   * @returns {ColorRGB} new ColorRGB object
   */
  static fromString(str:string):ColorRGB {
    let clnStr = str.trim().toLowerCase();

    // Check for special keyword "transparent"
    if(clnStr === 'transparent')
      return new ColorRGB(0, 0, 0, 0);

    // Check if it is a NamedColor and replace the string with it's hex
    if(Object.keys(NamedColors).includes(clnStr))
      clnStr = NamedColors[clnStr as ENamedColor];

    // Check if it counts as a valid Hex string (if it doesn't throw)
    try {
      const hexRtn = this.fromHex(clnStr);
      return hexRtn;
    // eslint-disable-next-line no-empty
    } catch { }

    // Check if it is functional-notation (if it doesn't throw)
    try {
      const funcRtn = this.fromFunctional(clnStr);
      return funcRtn;
    // eslint-disable-next-line no-empty
    } catch { }

    throw new TypeError(`ColorRGB.fromString() failed to parse the input string "${str}".`);
  }

  /**
   * Sets the components of a new ColorRGB using variable arguments. The order
   * of the variables is taken as `apply(R, G, B, A)`. Any missing components
   * are skipped and will remain their defaults.
   * 
   * This will parse string values to the best of it's ability. This includes
   * parameter detection, and then treatment depending on the type.
   * 
   * If given a percentage string such as "50%", it will be converted into it's
   * unit representation. Numeric values are treaded as unit floats (0..1) and
   * will be clamped as such
   * 
   * @returns {ColorRGB} new ColorRGB object
   */
  static apply(...components:Array<number | string>):ColorRGB {
    // Prepare channels
    const rgb:RGBTuple = [
      0,
      0,
      0,
      1.0,
    ];

    // Iterate through the arguments
    for(let ind = 0; ind < components.length; ind++) {
      const comp = components[ind];
      if(comp === null || typeof comp === 'undefined')
        continue;
      
      const { type, value } = convertParam(comp);

      // Check if this is the first 3 arguments (R, G, B)
      if(ind <= 3) {
        // Each type gets a treatment on RGB
        if(type === ParameterType.INTEGER)
          rgb[ind] = clamp(value / 255);
        else if(type === ParameterType.FLOAT)
          rgb[ind] = clamp(value);
        else if(type === ParameterType.PERCENTAGE)
          rgb[ind] = value;
      } else {
        // Break here since it's over 4 components
        break;
      }
    }

    return new ColorRGB(...rgb);
  }

  static readonly Channels:Record<string, number> = {
    RED: 0,
    GREEN: 1,
    BLUE: 2,
    ALPHA: 3,
  } as const;

  /**
   * Static reference for a pure-black color.
   */
  static readonly BLACK = new ColorRGB(0, 0, 0);

  /**
   * Static reference for a mid-gray (50%) color.
   */
  static readonly GRAY = new ColorRGB(0.5, 0.5, 0.5);
  
  /**
   * Static reference for a pure-white color.
   */
  static readonly WHITE = new ColorRGB(1, 1, 1);

  /**
   * The red channel, expressed as a unit float (0..1)
   * 
   * @readonly
   */
  readonly red:number = 0.0;

  /**
   * The green channel, expressed as a unit float (0..1)
   * 
   * @readonly
   */
  readonly green:number = 0.0;

  /**
   * The blue channel, expressed as a unit float (0..1)
   * 
   * @readonly
   */
  readonly blue:number = 0.0;

  /**
   * The alpha channel, expressed as a unit float (0..1)
   */
  readonly alpha:number = 1.0;

  /**
   * Creates a new color in the RGB color-space.
   * 
   * Accepts variable amounts of arguments, and depending on the number,
   * dictates how the color will be created.
   * 
   * If only a single argument is supplied it is ran through type-checking
   * assertions, and depending on the type will perform one of the following:
   * - `number`: Will be treated as a 32-bit integer and use
   * {@link ColorRGB.fromInteger}.
   * - `string`: Can be either a hexidecimal string (ex. "#FFAA88"), a
   * functional-notation string such that CSS4 accepts (ex.
   * `rgba(255, 127, 64)`), an X11 named color (ex. "gold"), or the keyword
   * "transparent" for a fully-transparent black color. Internally uses the
   * {@link ColorRGB.fromString} function.
   * - `array`: An array of RGB(A) component values, either as numbers, or as
   * strings that can be parsed into numbers (such as percentages, or the
   * "none" keyword). It does not need to contain all the channels, any missing
   * will be skipped and remain at their defaults. Internally uses the
   * {@link ColorRGB.apply} function.
   * - `ColorRGB`: Each component will be copied as-is.
   * - `IColor` or an object having `toRGB()`: Will use the `toRGB()` function
   * and copy each channel component as-is.
   * - `object`: Any object that has any of the following properties available:
   *   - `r` or `red`: Byte value for red channel
   *   - `g` or `green`: Byte value for green channel
   *   - `b` or `blue`: Byte value for blue channel
   *   - `a` or `alpha` or `opacity`: Unit number (0..1) for alpha channel
   * 
   * If multiple arguments are supplied they are treated as R, G, B, and A. If
   * all the values are numbers they are clamped to 0..1 and applied as they
   * are. Otherwise, mixed values use the {@link ColorRGB.apply} function.
   * 
   * Examples of usage:
   * ```
   * new ColorRGB() // Default black color
   * new ColorRGB(1.0, 0.5, 0.25, 0.5) // Color from channels
   * new ColorRGB(0xFFAA88)   // Color from integer
   * new ColorRGB('gold')     // Color from X11 named color
   * new ColorRGB('#FFAA88')  // Color from hexidecimal string
   * new ColorRGB('rgb(255, 127, 64)')  // Color from functional-notation
   * new ColorRGB([1.0, 0.5, 0.25, 0.5])  // Color from array of numbers
   * new ColorRGB(['100%', '50%', 'none', '50%']) // Color from array of strings
   * new ColorRGB({ r: 255, g: 127, b: 64}) // Color from object
   * ```
   */
  constructor(
    _arg1 ?: (IColor | RGBObject | Array<number | string> | number | string),
    _arg2 ?: (number | string),
    _arg3 ?: (number | string),
    _arg4 ?: (number | string),
  ) {
    // Bind methods
    this.toString = this.toString.bind(this);
    this.toArray = this.toArray.bind(this);
    this.toObject = this.toObject.bind(this);
    this.toRGB = this.toRGB.bind(this);
    this.toInteger = this.toInteger.bind(this);
    this.toHex = this.toHex.bind(this);
    this.toFunctional = this.toFunctional.bind(this);

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.setAlpha = this.setAlpha.bind(this);
    this.map = this.map.bind(this);
    this.minChannel = this.minChannel.bind(this);
    this.maxChannel = this.maxChannel.bind(this);
    this.premultiplyAlpha = this.premultiplyAlpha.bind(this);

    this.toYIQValue = this.toYIQValue.bind(this);
    this.luminosity = this.luminosity.bind(this);
    this.contrast = this.contrast.bind(this);
    this.contrastLevel = this.contrastLevel.bind(this);
    this.pickUsingContrast = this.pickUsingContrast.bind(this);
    this.isDark = this.isDark.bind(this);
    this.isLight = this.isLight.bind(this);

    this.lerp = this.lerp.bind(this);
    this.shade = this.shade.bind(this);
    this.tint = this.tint.bind(this);
    this.tone = this.tone.bind(this);
    this.invert = this.invert.bind(this);
    this.desaturate = this.desaturate.bind(this);
    this.grayscale = this.grayscale.bind(this);
    this.median = this.median.bind(this);
    this.threshold = this.threshold.bind(this);

    // Handle construction
    if(arguments.length) {
      let rgb:ColorRGB = null;

      if(arguments.length === 1) {
        if(typeof _arg1 === 'number') {
          rgb = ColorRGB.fromInteger(_arg1);
        } else if(_arg1 instanceof ColorRGB) {
          this.red = _arg1.red;
          this.green = _arg1.green;
          this.blue = _arg1.blue;
          this.alpha = _arg1.alpha;
        } else if(typeof _arg1 === 'object') {
          if(Array.isArray(_arg1)) {
            // Try to parse the elements of the array
            try {
              rgb = ColorRGB.apply.apply(null, _arg1);
            } catch (err) {
              throw new Error(`ColorRGB was constructed with an array argument "${_arg1.toString()}" that could not be parsed because: ${err.message ?? err}`);
            }
          } else {
            // Try to coerce it into a ColorRGB object
            try {
              rgb = ColorRGB.ensureRGB(_arg1);
            } catch (err) {
              throw new Error(`ColorRGB was constructed with an object that could not be coerced into a valid ColorRGB object`);
            }
          }
        } else if(typeof _arg1 === 'string') {
          // Try to parse it as a string
          try {
            rgb = ColorRGB.fromString(_arg1);
          } catch (err) {
            throw new Error(`ColorRGB was constructed with a string argument "${_arg1}" that could not be parsed because: ${err.message ?? err}`);
          }
        }
      } else if(arguments.length > 1) {
        // If every value is a number, it's much easier
        const args = [ ...arguments ];
        if(args.every(val => typeof val === 'number')) {
          const [
            r = 0,
            g = 0,
            b = 0,
            a = 1.0,
          // eslint-disable-next-line array-bracket-newline
          ]:Array<number> = args;

          this.red = clamp(r);
          this.green = clamp(g);
          this.blue = clamp(b);
          this.alpha = clamp(a);
        } else {
          rgb = ColorRGB.apply.apply(null, args);
        }
      }

      // If some static method succeeded, use it's values
      if(rgb) {
        this.red = rgb.red;
        this.green = rgb.green;
        this.blue = rgb.blue;
        this.alpha = rgb.alpha;
      }
    }
  }

  get redByte():number {
    return toByte(this.red);
  }

  get greenByte():number {
    return toByte(this.green);
  }

  get blueByte():number {
    return toByte(this.blue);
  }

  get alphaByte():number {
    return toByte(this.alpha);
  }

  toString():string {
    return this.toFunctional();
  }

  toArray():RGBTuple {
    return [
      this.red,
      this.green,
      this.blue,
      this.alpha,
    ];
  }

  toObject():RGBObject {
    const obj:RGBObject = {
      r: this.red,
      g: this.green,
      b: this.blue,
    };

    if(this.alpha !== 1.0)
      obj.a = this.alpha;

    return obj;
  }

  /**
   * Returns a copy of this color.
   * 
   * @returns New ColorRGB object
   */
  toRGB():ColorRGB {
    return new ColorRGB(this);
  }

  /**
   * Converts this RGB Color into it's integer representation. Note that this is
   * a lossy conversion considering the channels are internally represented as
   * unit floats (0..1), and this operation converts them into byte integers.
   * 
   * By default the alpha information is only included if the alpha value is
   * not 1.0, or the `forceAlpha` flag is true (defaults to false). For
   * serialization of colors it may be best to have this flag as true and
   * manage the alpha channels byte position with the `alphaMSB` flag for more
   * consistant byte arrangement.
   * 
   * Additionally the `alphaMSB` switch can be used to move the alpha
   * information to the Most Significant Byte portion of the integer. Otherwise
   * (default) it remains as the Least Significant Byte.
   * 
   * @param {boolean} [forceAlpha = false] If this flag is true, then
   * regardless of whether or not the alpha channel is opaque (1), than the
   * alpha information will be included in the results. This defaults to false
   * which will only use the alpha information if it is not completely opaque. 
   * @param {boolean} [alphaMSB = false] Instructs the alpha component to be the
   * Most Significant Byte in the final result. If false (default) than it will
   * be the Least Significant Byte. 
   * @returns {number} Integer number representation of the color.
   */
  toInteger(forceAlpha = false, alphaMSB = false):number {
    let value = ((this.redByte & 0xFF) << 16) | ((this.greenByte & 0xFF) << 8) | (this.blueByte & 0xFF);

    // Check if we need to deal with alpha channel
    if(forceAlpha || this.alpha !== 1) {
      if(alphaMSB)
        value |= (this.alphaByte & 0xFF) << 24;
      else
        value = (value << 8) | (this.alphaByte & 0xFF);
    }

    // Return integer, ensuring it's an integer
    return value >>> 0;
  }

  /**
   * Converts this RGB Color into it's hexidecimal string representation. Note
   * that this is a lossy conversion considering the channels are internally
   * represented as unit floats (0..1), and this operation converts them into
   * byte integers.
   * 
   * By default the alpha information is only included if the alpha value is
   * not 1.0, or the `forceAlpha` flag is true (defaults to false). For
   * serialization of colors it may be best to have this flag as true and
   * manage the alpha channels byte position with the `alphaMSB` flag for more
   * consistant byte arrangement.
   * 
   * Additionally the `alphaMSB` switch can be used to move the alpha
   * information to the Most Significant Byte portion of the integer. Otherwise
   * (default) it remains as the Least Significant Byte.
   * 
   * @param {boolean} [forceAlpha = false] If this flag is true, then
   * regardless of whether or not the alpha channel is opaque (1), than the
   * alpha information will be included in the results. This defaults to false
   * which will only use the alpha information if it is not completely opaque. 
   * @param {boolean} [alphaMSB = false] Instructs the alpha component to be the
   * Most Significant Byte in the final result. If false (default) than it will
   * be the Least Significant Byte. 
   * @returns {string} Hexidecimal string representation
   */
  toHex(forceAlpha = false, alphaMSB = false):string {
    // Helper function to convert the Hex with padding to make it 2-chars
    const enc = (val:number):string => ((val & 0xFF).toString(16).padStart(2, '0'));
    
    // Build the RGB representation
    const str = `#${enc(this.redByte)}${enc(this.greenByte)}${enc(this.blueByte)}`;

    // If we force the alpha, or if alpha is not fully-opaque (1) then add it
    if(forceAlpha || this.alpha !== 1.0) {
      // With alphaMSB, the alpha component is first in the string
      if(alphaMSB)
        return `#${enc(this.alphaByte)}${str.substring(1)}`;

      // Without alphaMSB, the alpha component is last
      return str + enc(this.alphaByte);
    }
    
    // Alpha was not needed, so return the original string
    return str;
  }

  /**
   * Converts this RGB Color into it's functional-notation string, as if it was
   * being used with CSS. Because the channels are internally held as unit
   * floats, the resulting string will use percentages. It can optionally
   * truncate the channels to whole percentages using the `whole` flag.
   * 
   * By default the alpha information is only included if the alpha value is
   * not 1.0, or the `forceAlpha` flag is true (defaults to false). Additionally
   * it is truncated to 4 points of precision.
   * 
   * The output follows this format:
   * ```
   * rgb(100%, 50%, 25%)
   * rgba(100%, 50%, 25%, 0.75)
   * ```
   * 
   * @param {boolean} [forceAlpha = false] If this flag is true, then
   * regardless of whether or not the alpha channel is opaque (1), than the
   * alpha information will be included in the results. This defaults to false
   * which will only use the alpha information if it is not completely opaque.
   * @param {boolean} [whole = false] If this flag is true, then the resulting
   * RGB channel percentages will be rounded to whole numbers instead of the
   * default which is to leave the decimal places remaining.
   * @returns {string} Functional-notation string
   */
  toFunctional(forceAlpha = false, whole = false):string {
    const red = toPercent(this.red, whole);
    const green = toPercent(this.green, whole);
    const blue = toPercent(this.blue, whole);

    if(forceAlpha || this.alpha !== 1.0)
      return `rgba(${red}, ${green}, ${blue}, ${this.alpha})`;

    return `rgb(${red}, ${green}, ${blue})`;
  }

  /**
   * Returns the channel at the given index. The channels are in order as:
   * 
   * - 0: red
   * - 1: green
   * - 2: blue
   * - 3: alpha
   * 
   * For convienience {@link ColorRGB.Channels} contains an enum that maps this
   * directly.
   * 
   * If the index is out-of-range, then 0 is returned
   * 
   * @param {number} index channel index
   * @returns {number} channel value as unit float (0..1)
   */
  get(index:number):number {
    switch(index) {
      case ColorRGB.Channels.RED: return this.red;
      case ColorRGB.Channels.GREEN: return this.green;
      case ColorRGB.Channels.BLUE: return this.blue;
      case ColorRGB.Channels.ALPHA: return this.alpha;
      default: return 0;
    }
  }

  /**
   * Sets each channel of this color and returns a new ColorRGB object. Each
   * channel is mapped in order to variadic arguments: red, green, blue, alpha.
   * In the event a channel is provided `null` or `undefined` it will use the
   * same value present in `this` color. Additionally, any missing channels are
   * also considered null/undefined.
   * 
   * Channels can be provided unit float numbers (0..1), or a percentage string
   * such as "50%", or the "none" keyword implying 0.
   * 
   * @param {...(number | string)} args Variadic arguments matching each
   * channel of red, green, blue, alpha in order. Each channel can be either a
   * number (expects unit float 0..1), or a string that can be evaluated to a
   * singular value such as "none", or a percentage (ie. "50%").
   * @returns {ColorRGB} new ColorRGB object 
   */
  set(...channels:Array<undefined | null | number | string>):ColorRGB {
    // Compile new channels, trimed to size
    const newChans:Array<number | string> = channels.slice(0, 4)
      .map((val, ind):(number | string) => (val ?? this.get(ind)));

    // Use the apply static method to make a new RGB color
    return ColorRGB.apply(...newChans);
  }

  /**
   * Adjust the opacity.
   * 
   * Creates a new RGB color using the channels from `this` and sets a new alpha
   * using the one provided.
   * 
   * @immutable
   * @param {number} alpha New alpha opacity, as a unit float (0..1).
   * @returns {ColorRGB} new ColorRGB object
   */
  setAlpha(alpha:number):ColorRGB {
    return new ColorRGB(this.red, this.green, this.blue, alpha);
  }

  /**
   * Map the channels of this current color into a new color using the
   * provided mapping callbacks.
   * 
   * Example:
   * ```TypeScript
   * // Invert all the channels
   * const newColor = existingColor.map(
   *    (val:number) => (1 - val),      // Called on RGB
   *    (alpha:number) => (1 - alpha),  // Called on ALPHA only
   * );
   * ```
   * 
   * @immutable
   * @param {Function} chanCB Callback following the signature
   * `(chan:number, index:number, color:ColorRGB) => number` which is called on
   * each color channel (excluding alpha) to map a new value given the current
   * value.
   * @param {Function} alphaCB Callback following the signature
   * `(alpha:number, color:ColorRGB) => number` which is called on the alpha
   * component to map a new value using the current value. By default, this is
   * a non-op that leaves the alpha un-touched. 
   * @returns {ColorRGB} new ColorRGB object
   */
  map(chanCB:ChannelMapCallback, alphaCB:AlphaMapCallback = NoOpMapCallback):ColorRGB {
    return new ColorRGB(
      chanCB(this.red, 0, this),
      chanCB(this.green, 1, this),
      chanCB(this.blue, 2, this),
      alphaCB(this.alpha, this),
    );
  }

  /**
   * Returns the minimum (smallest) value within the RGB channels. Optionally
   * supports returning the channel index as well.
   * 
   * @param {boolean} [withIndex = false] If true, returns a tuple of `[value,
   * index ]` where the value is the smallest channel, and the index is the
   * index of the channel that was smallest. Otherwise false (default) only
   * returns the value. If all channels are the same, red is returned.
   * @returns {number|Array} Either a unit float (0..1) or a tuple depending on
   * the `withIndex` parameter. 
   */
  minChannel(withIndex = false):(number | [number, number]) {
    if(withIndex) {
      if(this.red < this.green && this.red < this.blue)
        return [ this.red, 0 ];
      else if(this.green < this.red && this.green < this.blue)
        return [ this.green, 1 ];
      else if(this.blue < this.red && this.blue < this.green)
        return [ this.blue, 2 ];
      
      return [ this.red, 0 ];
    }

    return Math.min(this.red, this.green, this.blue);
  }

  /**
   * Returns the maximum (largest) value within the RGB channels. Optionally
   * supports returning the channel index as well.
   * 
   * @param {boolean} [withIndex = false] If true, returns a tuple of `[value,
   * index ]` where the value is the largest channel, and the index is the
   * index of the channel that was largest. Otherwise false (default) only
   * returns the value. If all channels are the same, red is returned.
   * @returns {number|Array} Either a unit float (0..1) or a tuple depending on
   * the `withIndex` parameter. 
   */
  maxChannel(withIndex = false):(number | [number, number]) {
    if(withIndex) {
      if(this.red > this.green && this.red > this.blue)
        return [ this.red, 0 ];
      else if(this.green > this.red && this.green > this.blue)
        return [ this.green, 1 ];
      else if(this.blue > this.red && this.blue > this.green)
        return [ this.blue, 2 ];
      
      return [ this.red, 0 ];
    }

    return Math.max(this.red, this.green, this.blue);
  }

  /**
   * Returns a new `ColorRGB` object with each of the RGB channels multiplied
   * with the alpha component of this color. The alpha channel returned is not
   * modified and is passed-through.
   * 
   * @immutable
   * @returns {ColorRGB} new ColorRGB object
   */
  premultiplyAlpha():ColorRGB {
    return this.map((chan:number) => (chan * this.alpha));
  }

  /**
   * Calculates the YIQ-color encoding value for this color
   * 
   * @see https://24ways.org/2010/calculating-color-contrast
   * @returns YIQ value
   */
  toYIQValue():number {
    return ((this.redByte * 299) + (this.greenByte * 587) + (this.blueByte * 114)) / 1000;
  }

  /**
   * Calculates the WCAG 2.0 Luminosity value of this color.
   * 
   * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
   * @returns Floating-point unit luminosity value
   */
  luminosity():number {
    // Map each channel to it's calculated luminosity base
    const lum = ([
      this.red,
      this.green,
      this.blue,
    ]).map(chan => ((chan < 0.03928) ? (chan / 12.92) : (((chan + 0.055) / 1.055) ** 2.4)));

    // Perform the combination for the final luminosity
    return (lum[0] * 0.2126) + (lum[1] * 0.7152) + (lum[2] * 0.0722);
  }

  /**
   * Calculates the WCAG 2.0 Contrast value between this color and another.
   * 
   * @see http://www.w3.org/TR/WCAG20/#contrast-ratiodef
   * @param other The other color to compare this with
   * @returns Numerical contrast value
   */
  contrast(other:IColor):number {
    const clr = ColorRGB.ensureRGB(other);

    const lumA = this.luminosity();
    const lumB = clr.luminosity();

    if(lumA > lumB)
      return (lumA + 0.05) / (lumB + 0.05);
    return (lumB + 0.05) / (lumA + 0.05);
  }

  /**
   * Calculates the WCAG 2.0 Contrast level between this color and another.
   * Returned as a string to represent the "grade" the contrast ratio
   * represents.
   * 
   * Returned values:
   * - `"AAA"`: Ratios over-or-equal to 7.1
   * - `"AA"`: Ratios over-or-equal to 4.5
   * - `""`: Ratios under 4.5
   * 
   * @param other The other color to compare this with
   * @returns String value of either 'AAA', 'AA', or ''
   */
  contrastLevel(other:IColor):string {
    const ratio = this.contrast(other);

    if(ratio >= 7.1)
      return 'AAA';
    else if(ratio >= 4.5)
      return 'AA';
    return '';
  }

  /**
   * Selects a color from the given array of colors that has the highest
   * contrast ratio with `this` color.
   * 
   * Inspired by the CSS Color Module 5 `color-contrast()` function. Consider
   * `this` to be the background color, and the supplied `options` to be options
   * for foreground.
   * 
   * If no argument is provided, or is an empty array, it will default to using
   * opaque black and white.
   * 
   * @note alpha is not considered during contrast calculation
   * 
   * @param {Array} options Array of IColor color-space objects, each object
   * will be converted to this color-space for comparison. If the array is not
   * provided, or is empty, the colors black and white will be used instead
   * @returns {ColorRGB} new ColorRGB object
   */
  pickUsingContrast(options?:Array<IColor>):ColorRGB {
    let colors:Array<ColorRGB>;
    if(options && options.length > 0)
      colors = options.map(ColorRGB.ensureRGB);
    else
      colors = [ new ColorRGB(0, 0, 0), new ColorRGB(1, 1, 1) ];

    // Make tuple of color and it's contrast, then sort by contrast descending
    const picks:[ColorRGB, number][] = colors.map((clr:ColorRGB):[ColorRGB, number] => ([ clr, this.contrast(clr) ]))
      .sort((a:[ColorRGB, number], b:[ColorRGB, number]) => (b[1] - a[1]));

    // Get the first object's original color from the sorted picks
    return picks[0][0];
  }

  /**
   * Performs a YIQ conversion using {@link ColorRGB.toYIQValue} and then
   * compares the output to a "half-way" point to decide if the color is
   * considered "dark".
   * 
   * @returns Boolean true if this color is considered "dark"
   */
  isDark():boolean {
    return this.toYIQValue() < 128;
  }

  /**
   * Performs a YIQ conversion using {@link ColorRGB.toYIQValue} and then
   * compares the output to a "half-way" point to decide if the color is
   * considered "light".
   * 
   * @returns Boolean true if this color is considered "light"
   */
  isLight():boolean {
    return this.toYIQValue() >= 128;
  }

  /**
   * Linearly interpolates this RGB color, and an other IColor that can be
   * converted to RGB, given a `delta` weight.
   * 
   * @immutable
   * @param {IColor} other Other color to interpolate to
   * @param {number} delta Unit float (0..1) weight between this and the other
   * @returns {ColorRGB} new ColorRGB object
   */
  lerp(other:IColor, delta:number):ColorRGB {
    const clr = ColorRGB.ensureRGB(other);
    const otherArr = clr.toArray();
    const arr = this.toArray().map((val, ind) => lerp(val, otherArr[ind], delta));
    return new ColorRGB(arr);
  }

  /**
   * Shade, or darken.
   * 
   * Creates a "shade" of this color by interpolating it with black by the given
   * fraction `delta`.
   * 
   * @param {number} frac Unit float (0..1) fraction for how much to shade the
   * color. 0 results in none, 1 results in full black. 
   */
  shade(frac:number):ColorRGB {
    return this.lerp(ColorRGB.BLACK, clamp(frac));
  }

  /**
   * Darken this color and return a new color.
   * 
   * Alias for {@link ColorRGB.shade}
   * 
   * @param amount fractional unit float (0..1) for how much to darken. 
   * @returns {ColorRGB} new ColorRGB object
   */
  readonly darken = (amount:number):ColorRGB => this.shade(amount);

  /**
   * Tint, or lighten.
   * 
   * Creates a "tint" of this color by interpolating it with white by the given
   * fraction `delta`.
   * 
   * @param {number} frac Unit float (0..1) fraction for how much to shade the
   * color. 0 results in none, 1 results in full white. 
   */
  tint(frac:number):ColorRGB {
    return this.lerp(ColorRGB.WHITE, clamp(frac));
  }

  /**
   * Lighten this color and return a new color.
   * 
   * Alias for {@link ColorRGB.tint}
   * 
   * @param amount fractional unit float (0..1) for how much to lighten. 
   * @returns {ColorRGB} new ColorRGB object
   */
  readonly lighten = (amount:number):ColorRGB => this.tint(amount);

  /**
   * Tone, or saturate.
   * 
   * Creates a "tone" of this color by interpolating it with gray by the given
   * fraction `delta`. The gray is 50% gray, and not the grayscale calculation
   * of this color. For that, see {@link ColorRGB.desaturate}
   * 
   * @param {number} frac Unit float (0..1) fraction for how much to shade the
   * color. 0 results in completely gray, 1 results in original color. 
   */
  tone(frac:number):ColorRGB {
    return this.lerp(ColorRGB.GRAY, 1.0 - clamp(frac));
  }

  /**
   * Inverts this RGB colors values and returns a new color. Optionally will
   * invert the alpha as well.
   * 
   * @immutable
   * @param alpha (default false) If true, the alpha will be inverted as well
   * @returns {ColorRGB} new ColorRGB object
   */
  invert(alpha = false):ColorRGB {
    return new ColorRGB(
      1.0 - this.red,
      1.0 - this.green,
      1.0 - this.blue,
      alpha ? (1.0 - this.alpha) : this.alpha,
    );
  }

  /**
   * Converts this RGB color into a grayscale color using the "weighted" method.
   * 
   * @see https://www.dynamsoft.com/blog/insights/image-processing/image-processing-101-color-space-conversion/
   * 
   * @immutable
   * @param {number} [frac = 1.0] Percentage of desaturation as a unit float
   * (0..1), 0 resulting in no desaturation, and 1 resulting in completely gray.
   * Default is 1.0 or completely desaturated.
   * @returns {ColorRGB} new ColorRGB object
   */
  desaturate(frac = 1.0):ColorRGB {
    // The weighted "gray" color as a unit
    const gray = (this.red * 0.299) + (this.green * 0.587) + (this.blue * 0.114);

    const grayClr = new ColorRGB(gray, gray, gray, this.alpha);
    return this.lerp(grayClr, clamp(frac));
  }

  /**
   * Converts this RGB color into a grascale color using an "averaging" method
   * in which an average of each color is calculated and then applied for each
   * channel of a new color.
   * 
   * Alpha/opacity remains intact and is based on `this` colors alpha.
   * 
   * @see {@link ColorRGB.desaturate} for a weighted method.
   * @returns {ColorRGB} new ColorRGB object  
   */
  grayscale():ColorRGB {
    const gray = (this.red + this.green + this.blue) / 3.0;
    return new ColorRGB(gray, gray, gray, this.alpha);
  }

  /**
   * Calculates the median, or "middle" value between the lowest channel, and
   * the highest channel. This is the mid-point between where the minimum and
   * maximum values across the RGB channels is.
   * 
   * @returns {number} Median, or mid-point, between RGB channels.
   */
  median():number {
    const min = Math.min(this.red, this.green, this.blue);
    const max = Math.max(this.red, this.green, this.blue);
    return ((max - min) * 0.5) + min;
  }

  /**
   * Performs a median-based thresholding of this color. Calculates the median
   * value using {@link ColorRGB.median} and based on the results is compared
   * against the given `level` argument to return one of the provided colors.
   * 
   * If the median is <= `level` then the `lowColor` is returned.
   * If the median is > `level` then the `highColor` is returned.
   * 
   * @param {number} level Threshold level, as a unit float (0..1)
   * @param {ColorRGB} lowColor Color to return if the value is equal-to or
   * below the given level. Defaults to black.
   * @param highColor Color to return if the value is over the given level.
   * Defaults to white.
   * @returns {ColorRGB} new ColorRGB object
   */
  threshold(level:number, lowColor:ColorRGB = ColorRGB.BLACK, highColor:ColorRGB = ColorRGB.WHITE):ColorRGB {
    const median = this.median();
    return median <= level ? lowColor : highColor;
  }
}
export default ColorRGB;
