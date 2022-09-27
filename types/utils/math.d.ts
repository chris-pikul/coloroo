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
export declare function clamp(value: number, min?: number, max?: number): number;
/**
 * Clamps an incoming number to fit within an integer-byte (0..255)
 *
 * @param value The given value to clamp
 * @returns Integer number within the range 0..255
 */
export declare const clampByte: (value: number) => number;
/**
 * Performs a fixed-precision conversion of a number and returns the value
 * as a base-10 string with trailing 0s removed.
 *
 * @param value Input floating point value
 * @param precision Optional precision value
 * @returns String of the number with trailing 0s removed
 */
export declare function cleanFloatStr(value: number, precision?: number): string;
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
export declare function lerp(start: number, end: number, alpha: number): number;
/**
 * Re-scales and clamps a unit to a 0..255 byte integer
 *
 * @param unit Unit float (0..1)
 * @returns Byte integer (0..255)
 */
export declare function toByte(unit: number): number;
/**
 * Multiplies the value by 100 and then adds the % character
 *
 * @param unit Unit float (0..1)
 * @param round Whether to round to a whole integer percentage (default: false)
 * @returns String with percentage postfix
 */
export declare function toPercent(unit: number, round?: boolean): string;
/**
 * Ensures that the input results in a clamped unit, regardless of type. If the
 * value type is not a number, null is returned.
 *
 * @param value Any value
 * @returns {number | null} Unit float (0..1) or null if NaN
 */
export declare function ensureUnit(value: any): (number | null);
