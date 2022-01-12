/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 * 
 * Defines the implementation for the RGB color spectrum.
 * 
 * @module Color
 */
import { clamp } from './utils/math';

import type { IColorClass } from './IColorClass';
import type { StringEnum } from './utils/types';

export type RGBTuple = [number, number, number];

const RGBFormat:StringEnum = {
  INTEGER: 'INTEGER',
  INTEGER_ALPHA: 'INTEGER_ALPHA',
  HEX: 'HEX',
  HEX_ALPHA: 'HEX_ALPHA',
  FUNCTIONAL: 'FUNCTIONAL',
  FUNCTIONAL_ALPHA: 'FUNCTIONAL_ALPHA',
};
export type ERGBStringFormat = typeof RGBFormat[string];

export class ColorRGB implements IColorClass {
  /**
   * The accepted string formats for parsing and generation
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
  }

  /**
   * The red component as a byte (0..255) integer
   */
  get red():number {
    return Math.round(this.#components[0] * 255.0);
  }

  set red(byteValue:number) {
    this.#components[0] = clamp(byteValue, 0, 255) / 255.0;
  }

  /**
   * The red component as a unit (0..1) float
   */
  get redUnit():number {
    return this.#components[0];
  }

  set redUnit(unitValue:number) {
    this.#components[0] = clamp(unitValue);
  }

  /**
   * The green component as a byte (0..255) integer
   */
  get green():number {
    return Math.round(this.#components[1] * 255.0);
  }

  set green(byteValue:number) {
    this.#components[1] = clamp(byteValue, 0, 255) / 255.0;
  }

  /**
   * The green component as a unit (0..1) float
   */
  get greenUnit():number {
    return this.#components[1];
  }

  set greenUnit(unitValue:number) {
    this.#components[1] = clamp(unitValue);
  }

  /**
   * The blue component as a byte (0..255) integer
   */
  get blue():number {
    return Math.round(this.#components[2] * 255.0);
  }

  set blue(byteValue:number) {
    this.#components[2] = clamp(byteValue, 0, 255) / 255.0;
  }

  /**
   * The blue component as a unit (0..1) float
   */
  get blueUnit():number {
    return this.#components[2];
  }

  set blueUnit(unitValue:number) {
    this.#components[2] = clamp(unitValue);
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
   * regardless of whether or not the alpha channel is opaque (1), then the
   * alpha information will be included in the results. This defaults to false
   * which will only use the alpha information if it is not completely opaque. 
   * @param {boolean} [alphaMSB = false] Instructs the alpha component to be the
   * Most Significant Byte in the final result. If false (default) then it will
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

  public toHexString(forceAlpha = false):string {
    // Helper function to convert the Hex with padding to make it 2-chars
    const enc = (val:number):string => ((val & 0xFF).toString(16).padStart(2, '0'));
    
    // Pull apart the components
    const [
      red,
      grn,
      blu,
    ] = this.#components;
    
    // Build the RGB representation
    const str = `#${enc(red)}${enc(grn)}${enc(blu)}`;

    // If we force the alpha, or if alpha is not fully-opaque (1) then add it
    if(forceAlpha || this.#alpha !== 1)
      return str + enc(this.#alpha * 255);
    
    // Alpha was not needed, so return the original string
    return str;
  };

  public toFunctionalString(forceAlpha = false):string {
    return '';
  }

  public toArray():number[] {
    return [ ...this.#components, this.#alpha ];
  }
}
export default ColorRGB;
