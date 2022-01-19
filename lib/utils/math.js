"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanFloatStr = exports.clampByte = exports.clamp = void 0;
/**
 * Clamps an incoming number to be within a minimum and maximum range.
 *
 * @param value The given value to clamp
 * @param min Minimum value
 * @param max Maximum value
 * @returns Number within the given range
 */
function clamp(value, min = 0.0, max = 1.0) {
    return Math.min(Math.max(value, min), max);
}
exports.clamp = clamp;
/**
 * Clamps an incoming number to fit within an integer-byte (0..255)
 *
 * @param value The given value to clamp
 * @returns Integer number within the range 0..255
 */
const clampByte = (value) => Math.trunc(clamp(value, 0, 255));
exports.clampByte = clampByte;
/**
 * Performs a fixed-precision conversion of a number and returns the value
 * as a base-10 string with trailing 0s removed.
 *
 * @param value Input floating point value
 * @param precision Optional precision value
 * @returns String of the number with trailing 0s removed
 */
function cleanFloatStr(value, precision = 4) {
    return parseFloat(value.toFixed(precision)).toString();
}
exports.cleanFloatStr = cleanFloatStr;
//# sourceMappingURL=math.js.map