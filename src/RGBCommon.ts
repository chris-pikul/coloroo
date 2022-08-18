/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 * 
 * The RGB spaces are split between ColorRGB and ColorSRGB for the differencing
 * factor of byte channels, and unit channels. This file provides the utility
 * data types that are shared between them.
 * 
 * @module RGB
 */
import type { StringEnum } from './utils/types';

// Tuple array representing the red, green, and blue channels in order
export type RGBTuple = [number, number, number];

// Tuple array representing the red, green, blue, and alpha channels in order
export type RGBATuple = [ ...RGBTuple, number];

/**
 * Valid string enumerations for formating `ColorRGB`/`ColorSRGB` into either a 
 * string, or an integer number.
 * 
 * @enum
 */
export const RGBFormat:StringEnum = {
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
export type ERGBFormat = keyof typeof RGBFormat;
