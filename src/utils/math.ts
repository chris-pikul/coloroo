/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 * 
 * Utilities for math operations
 * 
 * @module Utilities
 */

/**
 * Clamps an incoming number to be within a minimum and maximum range.
 * 
 * @param value The given value to clamp
 * @param min Minimum value (default: 0.0)
 * @param max Maximum value (default: 1.0)
 * @returns Number within the given range
 */
export function clamp(value:number, min = 0.0, max = 1.0):number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Clamps an incoming number to fit within an integer-byte (0..255)
 * 
 * @param value The given value to clamp
 * @returns Integer number within the range 0..255
 */
export const clampByte = (value:number):number => Math.trunc(clamp(value, 0, 255));

/**
 * Performs a fixed-precision conversion of a number and returns the value
 * as a base-10 string with trailing 0s removed.
 * 
 * @param value Input floating point value
 * @param precision Optional precision value
 * @returns String of the number with trailing 0s removed
 */
export function cleanFloatStr(value:number, precision = 4):string {
  return parseFloat(value.toFixed(precision)).toString();
}

/**
 * Linearly interpolates two numbers with an alpha value.
 * 
 * With `alpha = 0` the start value is returned
 * With `alpha = 1` the end value is returned
 * With `alpha = 0.5` a value between start and end is returned
 * 
 * @param start Starting value
 * @param end Ending value
 * @param alpha Unit value 0..1 to mix betwen
 * @returns Value interpolated
 */
export function lerp(start:number, end:number, alpha:number):number {
  return (start * (1 - alpha)) + (end * alpha);
}

/**
 * Re-scales and clamps a unit to a 0..255 byte integer
 * 
 * @param unit Unit float (0..1)
 * @returns Byte integer (0..255)
 */
export function toByte(unit:number):number {
  return clampByte(unit * 255);
}

/**
 * Multiplies the value by 100 and then adds the % character
 * 
 * @param unit Unit float (0..1)
 * @param round Whether to round to a whole integer percentage (default: false)
 * @returns String with percentage postfix
 */
export function toPercent(unit:number, round = false):string {
  const perc = unit * 100.0;
  return `${round ? Math.round(perc) : perc}%`;
}

/**
 * Ensures that the input results in a clamped unit, regardless of type. If the
 * value type is not a number, null is returned.
 * 
 * @param value Any value
 * @returns {number | null} Unit float (0..1) or null if NaN
 */
export function ensureUnit(value:any):(number | null) {
  if(typeof value === 'number' && !Number.isNaN(value))
    return clamp(value);
  return null;
}

/**
 * Wraps a value to be within 0 and the given range.
 * 
 * Negative values will wrap circularly around.
 * 
 * Example:
 * ```js
 * wrap(90) == 90
 * wrap(-90) == 270
 * wrap(720) == 0
 * ```
 * 
 * @param value Input number
 * @param range Maximum range between 0 and this number to wrap the value to
 * @returns {number} New number within 0..range
 */
export function wrap(value:number, range = 360):number {
  if(value < 0)
    return range - (-value % range);
  return value % range;
}
