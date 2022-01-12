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
export function clamp(value:number, min = 0.0, max = 1.0):number {
  return Math.min(Math.max(value, min), max);
}
