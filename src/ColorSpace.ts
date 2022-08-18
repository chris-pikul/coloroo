/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 * 
 * Holds the string enumeration object for a ColorSpace, as well as providing
 * the type declaration to support it.
 * 
 */

import type { StringEnum } from './utils/types';

/**
 * Color-space string enumeration. Holds the valid values for the supported
 * color-spaces.
 */
export const ColorSpace:StringEnum = {
  RGB: 'RGB',
  HSL: 'HSL',
  CMYK: 'CMYK',
} as const;

/**
 * TS type information for ColorSpace enum.
 */
export type EColorSpace = keyof typeof ColorSpace;

export default ColorSpace;
