/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 * 
 * Simple TypeScript utility types. No real functional code is output from here 
 * 
 */

/**
 * Simple interface for an object having string keys, and string values.
 * For use with enumerations.
 */
export interface StringEnum {
  [key:string]: string
};
