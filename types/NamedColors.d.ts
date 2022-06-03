/**
 * Copyright © 2021 Chris Pikul.
 *
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 *
 * An object-map of the named colors or "X11 Color Set" as defined currently
 * in the CSS4 spec.
 *
 * https://www.w3.org/TR/css-color-4/#typedef-named-color
 *
 * @module RGB
 */
import { StringEnum } from './utils/types';
export declare const NamedColors: StringEnum;
export declare type ENamedColor = typeof NamedColors[string];
export default NamedColors;
