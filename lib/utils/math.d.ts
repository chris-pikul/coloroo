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
 * @param min Minimum value
 * @param max Maximum value
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
