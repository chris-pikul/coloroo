/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 * 
 * Defines the implementation for the RGB color spectrum. This version of the
 * RGB color-space uses 8-bit channel values for R, G, and B. Alpha is present
 * as an optional unit float (0..1)
 * 
 * @module RGB
 */
import NamedColors from './NamedColors';

import {
  clamp,
  clampByte,
  cleanFloatStr,
  lerp,
} from './utils/math';

import {
  regexpHex,
  captureFirst,
  regexpRGBFunc,
} from './utils/regexp';
import { convertParam, ParameterType } from './utils/params';

import type { IColorClass } from './IColorClass';
import type { StringEnum } from './utils/types';


export type RGBTuple = [number, number, number];

/**
 * Valid string enumerations for formating `ColorRGB` into either a string, or
 * an integer number.
 * 
 * @enum
 */
const RGBFormat:StringEnum = {
  /**
   * Format the color into a single integer value, with automatic alpha
   * detection.
   */
  INTEGER: 'INTEGER',

  /**
   * Format the color into a single integer value, with FORCED alpha usage.
   */
  INTEGER_ALPHA: 'INTEGER_ALPHA',

  /**
   * Format the color into a hexidecimal string, with automatic alpha
   * detection.
   */
  HEX: 'HEX',

  /**
   * Format the color into a hexidecimal string, with FORCED alpha usage.
   */
  HEX_ALPHA: 'HEX_ALPHA',

  /**
   * Format the color into it's functional notation string, with automatic
   * alpha detection.
   */
  FUNCTIONAL: 'FUNCTIONAL',

  /**
   * Format the color into it's functional notation string, with FORCED alpha
   * usage.
   */
  FUNCTIONAL_ALPHA: 'FUNCTIONAL_ALPHA',
} as const;
export type ERGBStringFormat = typeof RGBFormat[string];

/**
 * RGB with Alpha color-space. The red, green, and blue channels are 8-bit
 * bytes (0..255) and will round/truncate on manipulation.
 */
export class ColorRGB implements IColorClass {
  /**
   * The accepted string formats for generating strings.
   * 
   * @enum
   */
  public static readonly Formats = RGBFormat;

  /**
   * Holds the RGB components as an tuple array
   */
  #rgb:RGBTuple = [
    0,
    0,
    0,
  ];

  /**
   * The alpha (opacity) of the color, clamped to a unit number 0..1 by the
   * public getter/setters.
   */
  #alpha = 1.0;

  /**
   * Creates a new Color in the RGB color-space.
   * 
   * Accepts variable amounts of arguments, and depending on the number,
   * dictates how the color will be created.
   * 
   * If only a single argument is supplied it is ran through the
   * {@link ColorRGB.parse} method. If an error occurs during parsing, this
   * constructor will throw an `Error`. The following value types are accepted:
   * 
   * - `number`: Will be treated as a 32-bit integer.
   * - `string`: Can be either a hexidecimal string (ex. "#FFAA88"), a
   * functional-notation string such that CSS4 accepts (ex.
   * `rgba(255, 127, 64)`), an X11 named color (ex. "gold"), or the keyword
   * "transparent" for a fully-transparent black color.
   * - `array`: An array of RGB(A) component values, either as numbers, or as
   * strings that can be parsed into numbers (such as percentages, or the
   * "none" keyword). It does not need to contain all the channels, any missing
   * will be skipped and remain at their defaults.
   * - `object`: Any object that has any of the following properties available:
   *   - `r` or `red`: Byte value for red channel
   *   - `g` or `green`: Byte value for green channel
   *   - `b` or `blue`: Byte value for blue channel
   *   - `a` or `alpha` or `opacity`: Unit number (0..1) for alpha channel
   * 
   * If multiple arguments are supplied they are treated as R, G, B, and A;
   * exactly as the {@link ColorRGB.set} method does (as they are passed
   * directly to it). Since `set()` does not throw errors, any issues in
   * parsing are quietly ignored and will default to 0.
   * 
   * Examples of usage:
   * ```
   * new ColorRGB() // Default black color
   * new ColorRGB(255, 127, 64, 0.5) // Color from channels
   * new ColorRGB(0xFFAA88)   // Color from integer
   * new ColorRGB('gold')     // Color from X11 named color
   * new ColorRGB('#FFAA88')  // Color from hexidecimal string
   * new ColorRGB('rgb(255, 127, 64)')  // Color from functional-notation
   * new ColorRGB([255, 127, 64, 0.5])  // Color from array of numbers
   * new ColorRGB(['100%', '50%', 'none', '50%]) // Color from array of strings
   * new ColorRGB({ r: 255, g: 127, b: 64}) // Color from object
   * ```
   */
  constructor(
    _arg1?:(number|string|Array<number|string>|Record<any, any>|ColorRGB),
    _argG?:(number|string),
    _argB?:(number|string),
    _argA?:(number|string),
  ) {
    // Bind methods
    this.toString = this.toString.bind(this);
    this.toInteger = this.toInteger.bind(this);
    this.toHexString = this.toHexString.bind(this);
    this.toFuncString = this.toFuncString.bind(this);
    this.toArray = this.toArray.bind(this);
    this.toUnitArray = this.toUnitArray.bind(this);
    this.toYIQValue = this.toYIQValue.bind(this);
    
    this.set = this.set.bind(this);
    this.setUnits = this.setUnits.bind(this);
    this.setRed = this.setRed.bind(this);
    this.setRedUnit = this.setRedUnit.bind(this);
    this.setGreen = this.setGreen.bind(this);
    this.setGreenUnit = this.setGreenUnit.bind(this);
    this.setBlue = this.setBlue.bind(this);
    this.setBlueUnit = this.setBlueUnit.bind(this);
    this.setAlpha = this.setAlpha.bind(this);
    this.fromInteger = this.fromInteger.bind(this);
    this.fromHexString = this.fromHexString.bind(this);
    this.fromFuncString = this.fromFuncString.bind(this);
    this.fromString = this.fromString.bind(this);
    this.fromArray = this.fromArray.bind(this);
    this.fromObject = this.fromObject.bind(this);
    this.parse = this.parse.bind(this);

    this.luminosity = this.luminosity.bind(this);
    this.contrast = this.contrast.bind(this);
    this.contrastLevel = this.contrastLevel.bind(this);
    this.isDark = this.isDark.bind(this);
    this.isLight = this.isLight.bind(this);

    this.invert = this.invert.bind(this);
    this.lerp = this.lerp.bind(this);

    // Check if we have any arguments
    if(arguments.length === 1) {
      // For a single argument this can be passed to the parse function
      try {
        this.parse(arguments[0]);
      } catch (err) {
        throw new Error(`ColorRGB was constructed with an argument "${arguments[0]}" that cannot be parsed.`);
      }
    } else if(arguments.length > 1) {
      // For multiple arguments, it is treated as setting the components
      this.set(...arguments);
    }
  }

  /**
   * The red component as a byte (0..255) integer
   */
  get red():number {
    return this.#rgb[0];
  }

  set red(byteValue:number) {
    this.#rgb[0] = clampByte(byteValue);
  }

  /**
   * The green component as a byte (0..255) integer
   */
  get green():number {
    return this.#rgb[1];
  }

  set green(byteValue:number) {
    this.#rgb[1] = clampByte(byteValue);
  }

  /**
   * The blue component as a byte (0..255) integer
   */
  get blue():number {
    return this.#rgb[2];
  }

  set blue(byteValue:number) {
    this.#rgb[2] = clampByte(byteValue);
  }

  /**
   * The alpha, or opacity, of the color as a unit (0..1) float
   */
  get alpha():number {
    return this.#alpha;
  }

  set alpha(value:number) {
    this.#alpha = clamp(value);
  }

  /**
   * Gets the red component as a unit
   * 
   * @returns Unit value (0..1)
   */
  redUnit = ():number => (this.red / 255);

  /**
   * Gets the green component as a unit
   * 
   * @returns Unit value (0..1)
   */
  greenUnit = ():number => (this.green / 255);

  /**
   * Gets the blue component as a unit
   * 
   * @returns Unit value (0..1)
   */
  blueUnit = ():number => (this.blue / 255);

  /**
   * Returns the string representation of this color, with an optional formating
   * parameter.
   * 
   * The following enums are accepted for formats:
   * - `INTEGER`: Integer representation including alpha as the LSB if it is not
   * the default 1.0.
   * - `INTEGER_ALPHA`: Integer representation with alpha included as the LSB.
   * - `HEX`: Hexidecimal string representation, only includes alpha as the LSB
   * if it is not the default opaque (1.0).
   * - `HEX_ALPHA`: Hexidecimal string with the alpha as the LSB.
   * - `FUNCTIONAL` (default): CSS-style functional notation. Only includes the
   * alpha channel if it is not opaque (1.0).
   * - `FUNCTIONAL_ALPHA`: CSS-style functional notation with the alpha
   * channel. Uses the "rgba()" function style. 
   * 
   * @param format Optional enum for the output format. Defaults to functional.
   * @returns String representation
   */
  public toString(format:ERGBStringFormat = ColorRGB.Formats.FUNCTIONAL):string {
    switch(format) {
      case ColorRGB.Formats.INTEGER:
        return this.toInteger().toString();
      case ColorRGB.Formats.INTEGER_ALPHA:
        return this.toInteger(true).toString();
      case ColorRGB.Formats.HEX:
        return this.toHexString();
      case ColorRGB.Formats.HEX_ALPHA:
        return this.toHexString(true);
      case ColorRGB.Formats.FUNCTIONAL:
        return this.toFuncString();
      case ColorRGB.Formats.FUNCTIONAL_ALPHA:
        return this.toFuncString(true);
      default:
        console.warn(`ColorRGB.toString() was supplied a format "${format}" which is invalid, defaulting to "HEX".`);
        return this.toHexString();
    }
  }

  /**
   * Converts this RGB Color into it's integer representation.
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
  public toInteger(forceAlpha = false, alphaMSB = false):number {
    let value = ((this.red & 0xFF) << 16) | ((this.green & 0xFF) << 8) | (this.blue & 0xFF);

    if(forceAlpha || this.alpha !== 1) {
      const alphaComp = Math.trunc(this.alpha * 255);
      if(alphaMSB)
        value |= (alphaComp & 0xFF) << 24;
      else
        value = (value << 8) | (alphaComp & 0xFF);
    }

    return value >>> 0;
  };

  /**
   * Converts this RGB Color into it's hexidecimal string representation.
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
  public toHexString(forceAlpha = false, alphaMSB = false):string {
    // Helper function to convert the Hex with padding to make it 2-chars
    const enc = (val:number):string => ((val & 0xFF).toString(16).padStart(2, '0'));
    
    // Build the RGB representation
    const str = `#${enc(this.red)}${enc(this.green)}${enc(this.blue)}`;

    // If we force the alpha, or if alpha is not fully-opaque (1) then add it
    if(forceAlpha || this.#alpha !== 1) {
      // With alphaMSB, the alpha component is first in the string
      if(alphaMSB)
        return `#${enc(this.#alpha * 255)}${str.substring(1)}`;

      // Without alphaMSB, the alpha component is last
      return str + enc(this.#alpha * 255);
    }
    
    // Alpha was not needed, so return the original string
    return str;
  };

  /**
   * Converts this RGB Color into it's functional-notation string, as if it was
   * being used with CSS.
   * 
   * By default the alpha information is only included if the alpha value is
   * not 1.0, or the `forceAlpha` flag is true (defaults to false). Additionally
   * it is truncated to 4 points of precision.
   * 
   * The output follows this format:
   * ```
   * rgb(255, 180, 127)
   * rgba(255, 180, 127, 180)
   * ```
   * 
   * @param {boolean} [forceAlpha = false] If this flag is true, then
   * regardless of whether or not the alpha channel is opaque (1), than the
   * alpha information will be included in the results. This defaults to false
   * which will only use the alpha information if it is not completely opaque.
   * @returns {string} Functional-notation string
   */
  public toFuncString(forceAlpha = false):string {
    if(forceAlpha || this.#alpha !== 1)
      return `rgba(${this.red}, ${this.green}, ${this.blue}, ${cleanFloatStr(this.#alpha)})`;

    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  /**
   * Returns this color as an Array of numbers. The first 3 components are the
   * RGB channels as byte integers (0..255). The last component is the alpha
   * channel as it's unit-float (0..1).
   * 
   * @returns {Array} Array of component values
   */
  public toArray():number[] {
    return [ ...this.#rgb, this.#alpha ];
  }

  /**
   * Returns this color as an Array of unit numbers (0..1). The first 3 indices
   * are the R, G, and B channels. The last indice is the alpha channel.
   * 
   * @returns Array of component values as units (0..1)
   */
  public toUnitArray():number[] {
    return [
      this.redUnit(),
      this.greenUnit(),
      this.blueUnit(),
      this.#alpha,
    ];
  }

  /**
   * Calculates the YIQ-color encoding value for this color
   * 
   * @see https://24ways.org/2010/calculating-color-contrast
   * @returns YIQ value
   */
  public toYIQValue():number {
    return ((this.red * 299) + (this.green * 587) + (this.blue * 114)) / 1000;
  }

  /**
   * Sets the components of this RGB Color using variable arguments. The order
   * of the variables is taken as `set(R, G, B, A)`. Any missing components are
   * skipped.
   * 
   * This will parse string values to the best of it's ability. This includes
   * parameter detection, and then treatment depending on the type.
   * 
   * For the RGB components the following formats are accepted
   * - Integer 0..255 = mapped directly to the component
   * - Float 0..255 = truncates the decimal point and applied
   * - Percentage 0..100% = applies to the range 0..255 and set.
   * 
   * For the alpha component, any value given is clamped to a unit 0..1. For
   * floats and percentages this is straight forward, for integers it just
   * becomes an on/off of 0 or 1. In other words, no byte conversion is made.
   * 
   * @returns `this` for method-chaining
   */
  public set(...components:(number|string)[]):IColorClass {
    // Iterate through the arguments
    for(let ind = 0; ind < components.length; ind++) {
      const comp = components[ind];
      if(comp === null || typeof comp === 'undefined')
        continue;
      
      const { type, value } = convertParam(comp);

      // Check if this is the first 3 arguments (R, G, B)
      if(ind <= 2) {
        // Each type gets a treatment on RGB
        if(type === ParameterType.INTEGER)
          this.#rgb[ind] = clamp(value, 0, 255);
        else if(type === ParameterType.FLOAT)
          this.#rgb[ind] = clampByte(value);
        else if(type === ParameterType.PERCENTAGE)
          this.#rgb[ind] = clampByte(value * 255);
        else
          this.#rgb[ind] = 0;
      } else if(ind === 3) {
        // For alpha, we don't care on the type, just clamp its number
        this.#alpha = clamp(value);
      } else {
        // Break here since it's over 4 components
        break;
      }
    }

    return this;
  }

  /**
   * Sets the components of this RGB Color using variable arguments. The order
   * of the variables is taken as `set(R, G, B, A)`. Any missing components are
   * skipped.
   * 
   * Each value should be a unit (0..1).
   * 
   * @returns `this` for method-chaining
   */
  public setUnits(...components:number[]):IColorClass {
    for(let ind = 0; ind < components.length; ind++) {
      if(ind <= 2)
        this.#rgb[ind] = Math.trunc(clamp(components[ind]) * 255);
      else if(ind === 3)
        this.#alpha = clamp(components[ind]);
      else
        break;
    }

    return this;
  }

  /**
   * Sets the red component of this RGB color with a byte value (0..255)
   * 
   * @param byte Byte value (0..255)
   * @returns `this` for method-chaining
   */
  public setRed(byte:number):ColorRGB {
    this.red = byte;
    return this;
  }

  /**
   * Sets the red component of this RGB color with a unit value (0..1)
   * 
   * @param unit Unit value (0..1)
   * @returns `this` for method-chaining
   */
  public setRedUnit(unit:number):ColorRGB {
    this.red = clamp(unit) * 255;
    return this;
  }

  /**
   * Sets the green component of this RGB color with a byte value (0..255)
   * 
   * @param byte Byte value (0..255)
   * @returns `this` for method-chaining
   */
  public setGreen(byte:number):ColorRGB {
    this.green = byte;
    return this;
  }

  /**
   * Sets the green component of this RGB color with a unit value (0..1)
   * 
   * @param unit Unit value (0..1)
   * @returns `this` for method-chaining
   */
  public setGreenUnit(unit:number):ColorRGB {
    this.green = clamp(unit) * 255;
    return this;
  }

  /**
   * Sets the green component of this RGB color with a byte value (0..255)
   * 
   * @param byte Byte value (0..255)
   * @returns `this` for method-chaining
   */
  public setBlue(byte:number):ColorRGB {
    this.blue = byte;
    return this;
  }

  /**
   * Sets the blue component of this RGB color with a unit value (0..1)
   * 
   * @param unit Unit value (0..1)
   * @returns `this` for method-chaining
   */
  public setBlueUnit(unit:number):ColorRGB {
    this.blue = clamp(unit) * 255;
    return this;
  }

  /**
   * Sets the alpha component of this RGB color with a unit value (0..1)
   * 
   * @param unit Unit value (0..1)
   * @returns `this` for method-chaining
   */
  public setAlpha(unit:number):ColorRGB {
    this.alpha = unit;
    return this;
  }

  /**
   * Converts an incoming integer number into it's RGB(A) channel values and
   * sets this `ColorRGB` components appropriately.
   * 
   * @param value Incoming integer number to convert
   * @param useAlpha If true, then an alpha component is present on this value,
   * and will be parsed appropriately. Default is `false`.
   * @param alphaMSB When `useAlpha` is true, this flag sets whether the alpha
   * component is in the Most-Significant-Byte, or the Least-Significant-Byte.
   * Default is to treat alpha as the LSB.
   * @returns `this` for method-chaining
   */
  public fromInteger(value:number, useAlpha = false, alphaMSB = false):IColorClass {
    // Convert the number to an integer
    let int = (value >>> 0);

    if(useAlpha) {
      // Determine the alpha byte position and grab it
      const alphaByte = alphaMSB ? ((int >> 24) & 0xFF) : (int & 0xFF);
      this.#alpha = alphaByte / 255.0;

      // If the alpha was LSB then shift the remaining integer right by 8-bits
      if(alphaMSB)
        int = int & 0xFFFFFF;
      else
        int >>= 8;
    }

    // Red component
    this.#rgb[0] = (int >> 16) & 0xFF;
    
    // Green component
    this.#rgb[1] = (int >> 8) & 0xFF;

    // Blue component
    this.#rgb[2] = int & 0xFF;

    return this;
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
   * @returns `this` for method-chaining
   * 
   * @throws {TypeError} If the string is not parsable as a hex value
   * @throws {TypeError} If the string has too many or too little
   */
  public fromHexString(str:string):ColorRGB {
    const hexMatch = str.match(regexpHex);
    if(hexMatch && hexMatch.length === 2) {
      const hex = hexMatch[1];
      const int = Number.parseInt(hex, 16) >>> 0;

      // Turns half-byte integers into full-byte
      const htf = (hb:number) => (hb | (hb << 4));

      if(hex.length === 3) {
        // 3 length hex implies shorthand 4-bit colors (RGB)
        this.#rgb[2] = htf(int & 0xF);
        this.#rgb[1] = htf((int & 0xF0) >>> 4);
        this.#rgb[0] = htf((int & 0xF00) >>> 8);
      } else if(hex.length === 4) {
        // 4 length hex implies shorthand 4-bit colors (RGBA)
        this.#alpha = htf(int & 0xF) / 255.0;
        this.#rgb[2] = htf((int & 0xF0) >>> 4);
        this.#rgb[1] = htf((int & 0xF00) >>> 8);
        this.#rgb[0] = htf((int & 0xF000) >>> 12);
      } else if(hex.length === 6) {
        // 6 length hex is opaque 8-bit colors (RRGGBB)
        this.fromInteger(int);
      } else if(hex.length === 8) {
        // 8 length hex is transparent 8-bit colors (RRGGBBAA)
        this.fromInteger(int, true);
      } else {
        throw new Error(`ColorRGB.fromHexString() received malformed hexidecimal string. Expected length of 3, 6, or 8, but instead got "${hex.length}".`);
      }

      return this;
    }

    throw new TypeError(`ColorRGB.fromHexString() received malformed hexidecimal string. The value "${str}" cannot be parsed.`);
  }

  /**
   * Parses the input string as a CSS4 functional-notation color value. Only
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
   * @returns `this` for method-chaining
   * 
   * @throws {TypeError} if the string cannot be parsed
   * @throws {TypeError} if the number of components is invalid
   */
  public fromFuncString(str:string):ColorRGB {
    const clnStr = str.trim().toLowerCase();

    // Use the regular expression to match against functional notation for RGB
    const matches = captureFirst(regexpRGBFunc, clnStr);
    if(matches === null)
      throw new TypeError(`ColorRGB.fromFuncString() failed to parse the string "${str}".`);

    // Pass the remaining values off to this.set() since it converts strings
    return this.set(...matches) as ColorRGB;
  }

  /**
   * Converts an incoming string to acceptable components and sets the channels
   * of this ColorRGB object. Will attempt to parse as each format in order
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
   * Uses the {@link ColorRGB.fromHexString} method to parse as a hexidecimal
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
   * Uses the {@link ColorRGB.fromFuncString} method to parse as a
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
   * @returns `this` for method-chaining
   */
  public fromString(str:string):IColorClass {
    let clnStr = str.trim().toLowerCase();

    // Check for the special keyword "transparent"
    if(clnStr === 'transparent') {
      this.#rgb = [
        0,
        0,
        0,
      ];
      this.#alpha = 0.0;

      return this;
    }

    // Check if it is a NamedColor and replace the string with it's hex
    if(NamedColors[clnStr])
      clnStr = NamedColors[clnStr];
  
    // Check if it counts as a valid Hex string (if it doesn't throw)
    try {
      const hexRtn = this.fromHexString(clnStr);
      return hexRtn;
    // eslint-disable-next-line no-empty
    } catch { }

    // Check if it is functional-notation (if it doesn't throw)
    try {
      const funcRtn = this.fromFuncString(clnStr);
      return funcRtn;
    // eslint-disable-next-line no-empty
    } catch { }

    throw new TypeError(`ColorRGB.fromString() failed to parse the input string "${str}".`);
  }

  /**
   * Sets the components of this `ColorRGB` given an array. This is supplied
   * for clarity of API, but really just shortcuts to spread operating the
   * array into the `ColorRGB.set()` function.
   * 
   * Accepts both strings and numbers. Strings will attempt to be converted
   * based on whatever type the value can be detected as.
   * 
   * @see {@link ColorRGB.set} for the underlying functionality.
   * @param arr Input array
   * @returns `this` for method-chaining
   */
  public fromArray(arr: (number|string)[]): IColorClass {
    return this.set(...arr);
  }

  /**
   * Attempts to set the components of this `ColorRGB` given potential
   * properties of the supplied object. Any missing components will default to
   * 0, except for alpha which defaults to 1 (opaque).
   * 
   * Each color searches for a single-letter property, or the full-word name.
   * - Red: `obj.r` OR `obj.red` OR 0
   * - Green: `obj.g` OR `obj.green` OR 0
   * - Blue: `obj.b` OR `obj.blue` OR 0
   * - Alpha: `obj.a` OR `obj.alpha` OR obj.opacity OR 1
   * 
   * @param obj Plain JS object
   * @returns `this` for method-chaining
   */
  public fromObject(obj: Record<any, any>): IColorClass {
    this.red = obj.r ?? obj.red ?? 0;
    this.green = obj.g ?? obj.green ?? 0;
    this.blue = obj.b ?? obj.blue ?? 0;
    this.alpha = obj.a ?? obj.alpha ?? obj.opacity ?? 1;

    return this;
  }

  /**
   * Attempts to parse the incoming parameter as a ColorRGB object and sets the
   * appropriate channels when found. Any missing components will use their
   * defaults, which for RGB is 0.0, and for Alpha is 1.0.
   * 
   * Any failure to parse the object will throw an `Error` object. If a null, 
   * or undefined object is supplied it will be quietly skipped.
   * 
   * @param arg The argument to attempt to parse.
   * @returns `this` for method-chaining
   */
  public parse(arg:any):IColorClass {
    // Check that we even have an argument first
    if(arg) {
      // Cache the typeof for the remaining if statements
      const to = typeof arg;
      if(to === 'number') {
        return this.fromInteger(arg);
      } else if(to === 'string') {
        return this.fromString(arg);
      } else if(to === 'object') {
        if(Array.isArray(arg))
          return this.fromArray(arg);
        
        // Default to object parsing, this doesn't throw errors
        return this.fromObject(arg);
      }

      throw new TypeError(`ColorRGB.parse() only accepts numbers, strings, arrays, and objects. Instead found "${typeof arg}".`);
    }

    return this;
  }

  /**
   * Calculates the WCAG 2.0 Luminosity value of this color.
   * 
   * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
   * @returns Floating-point unit luminosity value
   */
  public luminosity():number {
    // Map each channel to it's calculated luminosity base
    const lum = this.#rgb.map(chan => {
      // We work in sRGB units
      const unit = chan / 255.0;
      return (unit < 0.03928) ? (unit / 12.92) : (((unit + 0.055) / 1.055) ** 2.4);
    });

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
  public contrast(other:ColorRGB):number {
    const lumA = this.luminosity();
    const lumB = other.luminosity();

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
  public contrastLevel(other:ColorRGB):string {
    const ratio = this.contrast(other);

    if(ratio >= 7.1)
      return 'AAA';
    else if(ratio >= 4.5)
      return 'AA';
    return '';
  }

  /**
   * Performs a YIQ conversion using {@link ColorRGB.toYIQValue} and then
   * compares the output to a "half-way" point to decide if the color is
   * considered "dark".
   * 
   * @returns Boolean true if this color is considered "dark"
   */
  public isDark():boolean {
    return this.toYIQValue() < 128;
  }

  /**
   * Performs a YIQ conversion using {@link ColorRGB.toYIQValue} and then
   * compares the output to a "half-way" point to decide if the color is
   * considered "light".
   * 
   * @returns Boolean true if this color is considered "light"
   */
  public isLight():boolean {
    return this.toYIQValue() >= 128;
  }

  /**
   * __Immutable__
   * 
   * Inverts this RGB colors values and returns a new color. Optionally will
   * invert the alpha as well.
   * 
   * @param alpha (default false) If true, the alpha will be inverted as well
   * @returns New ColorRGB object
   */
  public invert(alpha = false):ColorRGB {
    return new ColorRGB(
      255 - this.red,
      255 - this.green,
      255 - this.blue,
      alpha ? (1 - this.#alpha) : this.#alpha,
    );
  }

  /**
   * __Immutable__
   * 
   * Converts this RGB color into a grayscale color using the "Weighted" method.
   * 
   * @see https://www.dynamsoft.com/blog/insights/image-processing/image-processing-101-color-space-conversion/
   * @param perc Percentage of desaturation as a unit 0..1
   * @returns New ColorRGB object
   */
  public desaturate():ColorRGB {
    // The weighted "gray" color as a unit
    const gray = (this.redUnit() * 0.299) + (this.greenUnit() * 0.587) + (this.blueUnit() * 0.114);

    return new ColorRGB().setUnits(gray, gray, gray) as ColorRGB;
  }

  /**
   * __Immutable__
   * 
   * Linearly interpolates this RGB color, and an other RGB color, given a
   * delta weight.
   * 
   * @param other Other color to interpolate to
   * @param delta Unit (0..1) weight between this and the other
   * @returns New ColorRGB object
   */
  public lerp(other:ColorRGB, delta:number):ColorRGB {
    const otherArr = other.toArray();
    const arr = this.toArray().map((val, ind) => lerp(val, otherArr[ind], delta));
    return new ColorRGB(arr);
  }
}
export default ColorRGB;
