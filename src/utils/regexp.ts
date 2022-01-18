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
 * Regular expression matching (with capture groups) for hexidecimal color
 * codes.
 */
export const regexpHex = /^#?([A-F0-9]{3,8})$/i;

/**
 * Regular expression matching (with capture groups) for functional notation
 * colors.
 * 
 * Should return a length of 3 being `[ match, func, params ]`
 */
export const regexpFunc = /^([A-Z]+)\(([\d\s.,%]+)\)$/i;

/**
 * Regular expression matching valid functional notation parameters.
 * 
 * Should be used with testing to validate that the parameters are listed in
 * proper format.
 */
export const regexpValidateParams = /^[\d.%]+(?:(?:\s*,\s*)(?:[\d.%]+))+$/i;

/**
 * Regular expression capturing values within a parameter string.
 */
export const regexpParams = /([\d.%]+)/gi;
