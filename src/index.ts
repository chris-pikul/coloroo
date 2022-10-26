/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 */
export { NamedColors, ENamedColor } from './NamedColors';

// RGB Color-space
export {
  ColorRGB,
  RGBTuple,
  RGBObject,
} from './RGB';

// HSL Color-space
export { ColorHSL } from './HSL';
export type { HSLTuple, HSLObject } from './HSL';

export { ColorSpace, EColorSpace } from './ColorSpace';

export type { IColor } from './IColor';
