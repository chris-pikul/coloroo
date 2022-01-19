"use strict";
/**
 * Copyright © 2021 Chris Pikul.
 *
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 *
 * Provides common regular expressions for parsing and validation.
 *
 * @module Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexpRGBFunc = exports.regexpPercent = exports.regexpNumber = exports.regexpInteger = exports.regexpHex = exports.captureFirst = exports.captureAll = void 0;
/**
 * Runs a regular expression against an input string, capturing all groups.
 * The return is an array of arrays, where the inner arrays are all the capture
 * groups.
 *
 * @param regexp Regular Expression to use
 * @param str Input string to match against
 * @returns Array of arrays containing strings or undefined objects
 */
function captureAll(regexp, str) {
    const matches = [...str.matchAll(regexp)];
    return matches.map(match => match.slice(1));
}
exports.captureAll = captureAll;
/**
 * Runs a regular expression against an input string, returning only the
 * capture groups within that first match. If no matches are made then null
 * is returned
 *
 * @param regexp Regular Expression to use
 * @param str Input string to match against
 * @returns Either null, or an array of the matches
 */
function captureFirst(regexp, str) {
    var _a;
    const arr = captureAll(regexp, str);
    return (_a = arr[0]) !== null && _a !== void 0 ? _a : null;
}
exports.captureFirst = captureFirst;
/**
 * Regular expression matching (with capture groups) for hexidecimal color
 * codes.
 */
exports.regexpHex = /^#?([A-F0-9]{3,8})$/i;
/**
 * Regular expression matching integers for testing
 */
exports.regexpInteger = /^[+-]?\d+$/;
/**
 * Regular expression matching a valid number as of CSS4 standards
 */
exports.regexpNumber = /^(?!e)[+-]?(?![+-])\d*\.?\d+(?:e[+-]?\d+)?$/i;
/**
 * Regular expression matching a percentage value
 */
exports.regexpPercent = /^[+-]?\d*\.?\d+%$/;
/**
 * Regular expression matching the CSS4 definition of RGB(A) functional
 * notation. Features named capture groups for the components. As defined with
 * the spec, both the rgb() and rgba() variations accept 4 components. This
 * additionally accepts the new "none" keyword.
 */
exports.regexpRGBFunc = /^rgba?\(\s*(?<red>none|(?!e)[+-]?(?![+-])\d*\.?\d+(?:e[+-]?\d+)?|\d*\.?\d+%)\s*,?\s*(?<green>none|(?!e)[+-]?(?![+-])\d*\.?\d+(?:e[+-]?\d+)?|\d*\.?\d+%)\s*,?\s*(?<blue>none|(?!e)[+-]?(?![+-])\d*\.?\d+(?:e[+-]?\d+)?|\d*\.?\d+%)(?:\s*[,/]\s+(?<alpha>none|(?!e)[+-]?(?![+-])\d*\.?\d+(?:e[+-]?\d+)?|\d*\.?\d+%))?\s*\)$/gi;
//# sourceMappingURL=regexp.js.map