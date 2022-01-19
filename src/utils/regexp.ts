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

/**
 * Runs a regular expression against an input string, capturing all groups.
 * The return is an array of arrays, where the inner arrays are all the capture
 * groups.
 * 
 * @param regexp Regular Expression to use
 * @param str Input string to match against
 * @returns Array of arrays containing strings or undefined objects
 */
export function captureAll(regexp:RegExp, str:string):Array<(string|undefined)[]> {
  const matches = [ ...str.matchAll(regexp) ];
  return matches.map(match => match.slice(1));
}

/**
 * Runs a regular expression against an input string, returning only the 
 * capture groups within that first match. If no matches are made then null
 * is returned
 * 
 * @param regexp Regular Expression to use 
 * @param str Input string to match against
 * @returns Either null, or an array of the matches
 */
export function captureFirst(regexp:RegExp, str:string):(Array<string|undefined> | null) {
  const arr = captureAll(regexp, str);
  return arr[0] ?? null;
}

/**
 * Regular expression matching (with capture groups) for hexidecimal color
 * codes.
 */
export const regexpHex = /^#?([A-F0-9]{3,8})$/i;

/**
 * Regular expression matching integers for testing
 */
export const regexpInteger = /^[+-]?\d+$/;

/**
 * Regular expression matching a valid number as of CSS4 standards
 */
export const regexpNumber = /^(?!e)[+-]?(?![+-])\d*\.?\d+(?:e[+-]?\d+)?$/i;

/**
 * Regular expression matching a percentage value
 */
export const regexpPercent = /^[+-]?\d*\.?\d+%$/;

/**
 * Regular expression matching the CSS4 definition of RGB(A) functional
 * notation. Features named capture groups for the components. As defined with
 * the spec, both the rgb() and rgba() variations accept 4 components. This
 * additionally accepts the new "none" keyword.
 */
export const regexpRGBFunc = /^rgba?\(\s*(?<red>none|(?!e)[+-]?(?![+-])\d*\.?\d+(?:e[+-]?\d+)?|\d*\.?\d+%)\s*,?\s*(?<green>none|(?!e)[+-]?(?![+-])\d*\.?\d+(?:e[+-]?\d+)?|\d*\.?\d+%)\s*,?\s*(?<blue>none|(?!e)[+-]?(?![+-])\d*\.?\d+(?:e[+-]?\d+)?|\d*\.?\d+%)(?:\s*[,/]\s+(?<alpha>none|(?!e)[+-]?(?![+-])\d*\.?\d+(?:e[+-]?\d+)?|\d*\.?\d+%))?\s*\)$/gi;
