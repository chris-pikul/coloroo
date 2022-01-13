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
 * @module Color
 */
import { clamp } from './utils/math';

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
   * The accepted string formats for parsing and generation
   * 
   * @enum
   */
  public static readonly Formats = RGBFormat;

  /**
   * Holds the RGB components as an tuple array
   */
  #components:RGBTuple = [
    0,
    0,
    0,
  ];

  /**
   * The alpha (opacity) of the color, clamped to a unit number 0..1 by the
   * public getter/setters.
   */
  #alpha = 1.0;

  constructor() {
    // Bind methods
    this.toString = this.toString.bind(this);
    this.toInteger = this.toInteger.bind(this);
    this.toHexString = this.toHexString.bind(this);
    this.toFunctionalString = this.toFunctionalString.bind(this);
    this.toArray = this.toArray.bind(this);
    
    this.set = this.set.bind(this);
    this.fromInteger = this.fromInteger.bind(this);
    this.fromString = this.fromString.bind(this);
    this.fromArray = this.fromArray.bind(this);
    this.fromObject = this.fromObject.bind(this);
    this.parse = this.parse.bind(this);
  }

  /**
   * The red component as a byte (0..255) integer
   */
  get red():number {
    return this.#components[0];
  }

  set red(byteValue:number) {
    this.#components[0] = Math.trunc(clamp(byteValue, 0, 255));
  }

  /**
   * The green component as a byte (0..255) integer
   */
  get green():number {
    return this.#components[1];
  }

  set green(byteValue:number) {
    this.#components[1] = Math.trunc(clamp(byteValue, 0, 255));
  }

  /**
   * The blue component as a byte (0..255) integer
   */
  get blue():number {
    return this.#components[2];
  }

  set blue(byteValue:number) {
    this.#components[2] = Math.trunc(clamp(byteValue, 0, 255));
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

  public toString(format:ERGBStringFormat = ColorRGB.Formats.FUNCTIONAL):string {
    switch(format) {
      case 'INTEGER':
        return this.toInteger().toString();
      case 'INTEGER_ALPHA':
        return this.toInteger(true).toString();
      case 'HEX':
        return this.toHexString();
      case 'HEX_ALPHA':
        return this.toHexString(true);
      case 'FUNCTIONAL':
        return this.toFunctionalString();
      case 'FUNCTIONAL_ALPHA':
        return this.toFunctionalString(true);
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
    let value = 0;

    value |= (this.red << 16);
    value |= (this.green << 8);
    value |= (this.blue);

    if(forceAlpha || this.alpha !== -1) {
      const alphaComp = (Math.round(this.alpha * 255) & 0xFF);
      if(alphaMSB)
        value = (alphaComp << 24) | value;
      else
        value = (value << 8) | alphaComp;
    }

    return value;
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
  public toFunctionalString(forceAlpha = false):string {
    if(forceAlpha || this.#alpha !== 1)
      return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.#alpha.toPrecision(4)})`;

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
    return [ ...this.#components, this.#alpha ];
  }

  /**
   * Sets the components of this RGB Color using variable arguments. The order
   * of the variables is taken as `set(R, G, B, A)`. Any missing components are
   * skipped.
   * 
   * @returns `this` for method-chaining
   */
  public set(...components:number[]):IColorClass {
    for(let ind = 0; ind < components.length; ind++) {
      if(ind <= 2)
        this.#components[ind] = Math.trunc(clamp(components[ind], 0, 255));
      else if(ind === 3)
        this.#alpha = clamp(components[ind]);
      else
        break;
    }

    return this;
  }

  public fromInteger(value:number, alphaMSB = false):IColorClass {
    // Convert the number to an integer
    const int = (value >>> 0);



    return this;
  }

  public fromString(str:string):IColorClass {
    return this;
  }

  public fromArray(arr: number[]): IColorClass {
      
  }

  public fromObject(obj: Record<any, any>): IColorClass {
      
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
      if(to === 'number')
        return this.fromInteger(arg);
    }

    return this;
  }
}
export default ColorRGB;
