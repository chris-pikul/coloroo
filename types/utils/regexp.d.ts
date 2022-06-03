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
export declare function captureAll(regexp: RegExp, str: string): Array<(string | undefined)[]>;
/**
 * Runs a regular expression against an input string, returning only the
 * capture groups within that first match. If no matches are made then null
 * is returned
 *
 * @param regexp Regular Expression to use
 * @param str Input string to match against
 * @returns Either null, or an array of the matches
 */
export declare function captureFirst(regexp: RegExp, str: string): (Array<string | undefined> | null);
/**
 * Regular expression matching (with capture groups) for hexidecimal color
 * codes.
 */
export declare const regexpHex: RegExp;
/**
 * Regular expression matching integers for testing
 */
export declare const regexpInteger: RegExp;
/**
 * Regular expression matching a valid number as of CSS4 standards
 */
export declare const regexpNumber: RegExp;
/**
 * Regular expression matching a percentage value
 */
export declare const regexpPercent: RegExp;
/**
 * Regular expression matching the CSS4 definition of RGB(A) functional
 * notation. Features named capture groups for the components. As defined with
 * the spec, both the rgb() and rgba() variations accept 4 components. This
 * additionally accepts the new "none" keyword.
 */
export declare const regexpRGBFunc: RegExp;
