/**
 * Copyright © 2021 Chris Pikul.
 *
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 *
 * Provides a TypeScript interface for any color-space class
 *
 * @module RGB
 */
import ColorRGB from './RGB';
/**
 * Definition of any color-space class.
 */
export interface IColor {
    /**
     * Opacity of the color, clamped as a unit float (0..1).
     */
    alpha: number;
    /**
     * Convert the color to a string representation. In general this results in a
     * CSS3 compatible functional-notation string.
     */
    toString(): string;
    /**
     * Get the channels of this color as an array of values
     */
    toArray(): Array<number>;
    /**
     * Get an object (JSON acceptable) representation of this color
     */
    toObject(): Record<string, number>;
    /**
     * Convert the color-space into a CSS3 compatible functional-notation string.
     */
    toFunctional(): string;
    /**
     * Convert this color-space to RGB.
     *
     * Used for inter-color conversion.
     *
     * @note May change this later to a higher fidelity format
     */
    toRGB(): ColorRGB;
}
export default IColor;
