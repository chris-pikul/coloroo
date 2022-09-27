/**
 * Copyright © 2021 Chris Pikul.
 *
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 *
 * Defines the implementation for the RGB color spectrum. The channels red,
 * green, and blue are presented as unit floats (0..1) with byte integer
 * interfaces.
 *
 * @module RGB
 */
import IColor from './IColor';
import { ChannelMapCallback, AlphaMapCallback } from './mapping';
/**
 * Tuple array holding the red, green, blue, and optionally alpha channels.
 * Each value is considered a unit float (0..1)
 */
export declare type RGBTuple = [number, number, number, number?];
/**
 * Interface defining a shorthand RGB object capable of JSON serialization.
 */
export interface RGBObject extends Record<string, number> {
    /**
     * Red channel, as a unit float (0..1)
     */
    r: number;
    /**
     * Green channel, as a unit float (0..1)
     */
    g: number;
    /**
     * Blue channel, as a unit float (0..1)
     */
    b: number;
    /**
     * Alpha channel, as a unit float (0..1)
     */
    a?: number;
}
/**
 * RGB Color-space. Holds each channel (red, green, blue, and alpha) as unit
 * floats. Each channel is clamped to 0..1 regardless of manipulations.
 *
 * @immutable
 */
export declare class ColorRGB implements IColor {
    private static ensureRGB;
    static fromRGB(rgb: ColorRGB): IColor;
    /**
     * Converts an incoming integer number into it's RGB(A) channel values and
     * returns an appropriate ColorRGB object
     *
     * @param value Incoming integer number to convert
     * @param useAlpha If true, then an alpha component is present on this value,
     * and will be parsed appropriately. Default is `false`.
     * @param alphaMSB When `useAlpha` is true, this flag sets whether the alpha
     * component is in the Most-Significant-Byte, or the Least-Significant-Byte.
     * Default is to treat alpha as the LSB.
     * @returns {ColorRGB} new ColorRGB object
     */
    static fromInteger(value: number, useAlpha?: boolean, alphaMSB?: boolean): ColorRGB;
    /**
     * Parses the incoming string as a hexidecimal notation RGB(A) color. This is
     * case-insensitive, and the prefix "#" is optional. Accepts the following
     * formats:
     *
     * - `#FA0`: Short-form, half-byte values for each channel RGB. Will be
     * resized to the full-byte size 0..255.
     * - `#FA08`: Short-form, half-byte values for the RGB and Alpha channels.
     * Will be resized to the full-byte size 0..255.
     * - `#FFAA00`: Long-form, byte values for the RGB channels.
     * - `#FFAA0088`: Long-form, byte values for the RGB and Alpha channels.
     *
     * @param str Input string to parse
     * @returns {ColorRGB} new ColorRGB object
     *
     * @throws {TypeError} If the string is not parsable as a hex value
     * @throws {TypeError} If the string has too many or too little
     */
    static fromHex(str: string): ColorRGB;
    /**
     * Parses the input string as a CSS3+ functional-notation color value. Only
     * accepts the `rgb()` and `rgba()` functions. Both the comma-separated and
     * space-separated formats are accepted. If the space-separated version is
     * used with an alpha channel, then a forward-slash delimiter is required
     * before the alpha channel. It will convert numeric formats in integer,
     * fractional, and scientific notation. As well as supporting percentages, and
     * the new "none" keyword for CSS4 (just implies 0). There is some forgiveness
     * on the formatting since it's regular-expression based. Things like mixed
     * formats between space/comma separated and such. Additionally, according to
     * the CSS4 spec, the `rgb()` version can still accept an alpha channel.
     * Either way, at least 3 components are required for at least RGB.
     *
     * Example formats accepted.
     * ```
     * rgb(255, 127, 64)
     * rgb(255 127 64)
     * rgb(255, 127, 64, 0.5)
     * rgb(255 127 64 / 0.5)
     * rgba(100%, 50%, 25%)
     * rgba(100% 50% 25% / 50%)
     * ```
     *
     * @param str Input string to parse
     * @returns {ColorRGB} new ColorRGB object
     *
     * @throws {TypeError} if the string cannot be parsed
     * @throws {TypeError} if the number of components is invalid
     */
    static fromFunctional(str: string): ColorRGB;
    /**
     * Converts an incoming string to acceptable components and sets the channels
     * of a new ColorRGB object. Will attempt to parse as each format in order
     * until one does not give an error. If none of the processes work then a
     * `TypeError` is thrown specifying so.
     *
     * Accepts the following formats with their specifications:
     *
     * ### Named Colors (X11)
     * Checks if the input string is a valid X11 color name as specified in the
     * CSS4 color module. If there is a match, it is converted to hexidecimal and
     * then processed.
     *
     * The special named color "transparent" is accepted and will result in black
     * with an alpha of 0 (fully transparent).
     *
     * ### Hexidecimal
     * Uses the {@link ColorRGB.fromHex} method to parse as a hexidecimal
     * string. This is case insensitive and accepts shortform and longform hex
     * strings, with or without alpha channel. As with most hex strings if there
     * is an alpha component it is the least-significant byte. Additionally, the
     * prefix "#" is optional as well.
     *
     * - `#FA0`: Short-form, half-byte values for each channel RGB. Will be
     * resized to the full-byte size 0..255.
     * - `#FA08`: Short-form, half-byte values for the RGB and Alpha channels.
     * Will be resized to the full-byte size 0..255.
     * - `#FFAA00`: Long-form, byte values for the RGB channels.
     * - `#FFAA0088`: Long-form, byte values for the RGB and Alpha channels.
     *
     * ### Functional-notation
     * Uses the {@link ColorRGB.fromFunctional} method to parse as a
     * functional notation string in the style of CSS4, with some forgiveness.
     * Will accept either 3-component for RGB, or 4-component for RGBA. Each
     * parameter can be either an integer, float, or percentage value which will
     * be converted as appropriate for the channel.
     *
     * Example formats accepted.
     * ```
     * rgb(255, 127, 64)
     * rgb(255 127 64)
     * rgb(255, 127, 64, 0.5)
     * rgb(255 127 64 / 0.5)
     * rgba(100%, 50%, 25%)
     * rgba(100% 50% 25% / 50%)
     *
     * rgb(200.5, 1.27e2, +64 / .5)
     * ```
     *
     * @param str Input string
     * @returns {ColorRGB} new ColorRGB object
     */
    static fromString(str: string): ColorRGB;
    /**
     * Sets the components of a new ColorRGB using variable arguments. The order
     * of the variables is taken as `apply(R, G, B, A)`. Any missing components
     * are skipped and will remain their defaults.
     *
     * This will parse string values to the best of it's ability. This includes
     * parameter detection, and then treatment depending on the type.
     *
     * If given a percentage string such as "50%", it will be converted into it's
     * unit representation. Numeric values are treaded as unit floats (0..1) and
     * will be clamped as such
     *
     * @returns {ColorRGB} new ColorRGB object
     */
    static apply(...components: Array<number | string>): ColorRGB;
    static readonly Channels: Record<string, number>;
    /**
     * Static reference for a pure-black color.
     */
    static readonly BLACK: ColorRGB;
    /**
     * Static reference for a mid-gray (50%) color.
     */
    static readonly GRAY: ColorRGB;
    /**
     * Static reference for a pure-white color.
     */
    static readonly WHITE: ColorRGB;
    /**
     * The red channel, expressed as a unit float (0..1)
     *
     * @readonly
     */
    readonly red: number;
    /**
     * The green channel, expressed as a unit float (0..1)
     *
     * @readonly
     */
    readonly green: number;
    /**
     * The blue channel, expressed as a unit float (0..1)
     *
     * @readonly
     */
    readonly blue: number;
    /**
     * The alpha channel, expressed as a unit float (0..1)
     */
    readonly alpha: number;
    /**
     * Creates a new color in the RGB color-space.
     *
     * Accepts variable amounts of arguments, and depending on the number,
     * dictates how the color will be created.
     *
     * If only a single argument is supplied it is ran through type-checking
     * assertions, and depending on the type will perform one of the following:
     * - `number`: Will be treated as a 32-bit integer and use
     * {@link ColorRGB.fromInteger}.
     * - `string`: Can be either a hexidecimal string (ex. "#FFAA88"), a
     * functional-notation string such that CSS4 accepts (ex.
     * `rgba(255, 127, 64)`), an X11 named color (ex. "gold"), or the keyword
     * "transparent" for a fully-transparent black color. Internally uses the
     * {@link ColorRGB.fromString} function.
     * - `array`: An array of RGB(A) component values, either as numbers, or as
     * strings that can be parsed into numbers (such as percentages, or the
     * "none" keyword). It does not need to contain all the channels, any missing
     * will be skipped and remain at their defaults. Internally uses the
     * {@link ColorRGB.apply} function.
     * - `ColorRGB`: Each component will be copied as-is.
     * - `IColor` or an object having `toRGB()`: Will use the `toRGB()` function
     * and copy each channel component as-is.
     * - `object`: Any object that has any of the following properties available:
     *   - `r` or `red`: Byte value for red channel
     *   - `g` or `green`: Byte value for green channel
     *   - `b` or `blue`: Byte value for blue channel
     *   - `a` or `alpha` or `opacity`: Unit number (0..1) for alpha channel
     *
     * If multiple arguments are supplied they are treated as R, G, B, and A. If
     * all the values are numbers they are clamped to 0..1 and applied as they
     * are. Otherwise, mixed values use the {@link ColorRGB.apply} function.
     *
     * Examples of usage:
     * ```
     * new ColorRGB() // Default black color
     * new ColorRGB(1.0, 0.5, 0.25, 0.5) // Color from channels
     * new ColorRGB(0xFFAA88)   // Color from integer
     * new ColorRGB('gold')     // Color from X11 named color
     * new ColorRGB('#FFAA88')  // Color from hexidecimal string
     * new ColorRGB('rgb(255, 127, 64)')  // Color from functional-notation
     * new ColorRGB([1.0, 0.5, 0.25, 0.5])  // Color from array of numbers
     * new ColorRGB(['100%', '50%', 'none', '50%']) // Color from array of strings
     * new ColorRGB({ r: 255, g: 127, b: 64}) // Color from object
     * ```
     */
    constructor(_arg1?: (IColor | RGBObject | Array<number | string> | number | string), _arg2?: (number | string), _arg3?: (number | string), _arg4?: (number | string));
    get redByte(): number;
    get greenByte(): number;
    get blueByte(): number;
    get alphaByte(): number;
    toString(): string;
    toArray(): RGBTuple;
    toObject(): RGBObject;
    /**
     * Returns a copy of this color.
     *
     * @returns New ColorRGB object
     */
    toRGB(): ColorRGB;
    /**
     * Converts this RGB Color into it's integer representation. Note that this is
     * a lossy conversion considering the channels are internally represented as
     * unit floats (0..1), and this operation converts them into byte integers.
     *
     * By default the alpha information is only included if the alpha value is
     * not 1.0, or the `forceAlpha` flag is true (defaults to false). For
     * serialization of colors it may be best to have this flag as true and
     * manage the alpha channels byte position with the `alphaMSB` flag for more
     * consistant byte arrangement.
     *
     * Additionally the `alphaMSB` switch can be used to move the alpha
     * information to the Most Significant Byte portion of the integer. Otherwise
     * (default) it remains as the Least Significant Byte.
     *
     * @param {boolean} [forceAlpha = false] If this flag is true, then
     * regardless of whether or not the alpha channel is opaque (1), than the
     * alpha information will be included in the results. This defaults to false
     * which will only use the alpha information if it is not completely opaque.
     * @param {boolean} [alphaMSB = false] Instructs the alpha component to be the
     * Most Significant Byte in the final result. If false (default) than it will
     * be the Least Significant Byte.
     * @returns {number} Integer number representation of the color.
     */
    toInteger(forceAlpha?: boolean, alphaMSB?: boolean): number;
    /**
     * Converts this RGB Color into it's hexidecimal string representation. Note
     * that this is a lossy conversion considering the channels are internally
     * represented as unit floats (0..1), and this operation converts them into
     * byte integers.
     *
     * By default the alpha information is only included if the alpha value is
     * not 1.0, or the `forceAlpha` flag is true (defaults to false). For
     * serialization of colors it may be best to have this flag as true and
     * manage the alpha channels byte position with the `alphaMSB` flag for more
     * consistant byte arrangement.
     *
     * Additionally the `alphaMSB` switch can be used to move the alpha
     * information to the Most Significant Byte portion of the integer. Otherwise
     * (default) it remains as the Least Significant Byte.
     *
     * @param {boolean} [forceAlpha = false] If this flag is true, then
     * regardless of whether or not the alpha channel is opaque (1), than the
     * alpha information will be included in the results. This defaults to false
     * which will only use the alpha information if it is not completely opaque.
     * @param {boolean} [alphaMSB = false] Instructs the alpha component to be the
     * Most Significant Byte in the final result. If false (default) than it will
     * be the Least Significant Byte.
     * @returns {string} Hexidecimal string representation
     */
    toHex(forceAlpha?: boolean, alphaMSB?: boolean): string;
    /**
     * Converts this RGB Color into it's functional-notation string, as if it was
     * being used with CSS. Because the channels are internally held as unit
     * floats, the resulting string will use percentages. It can optionally
     * truncate the channels to whole percentages using the `whole` flag.
     *
     * By default the alpha information is only included if the alpha value is
     * not 1.0, or the `forceAlpha` flag is true (defaults to false). Additionally
     * it is truncated to 4 points of precision.
     *
     * The output follows this format:
     * ```
     * rgb(100%, 50%, 25%)
     * rgba(100%, 50%, 25%, 0.75)
     * ```
     *
     * @param {boolean} [forceAlpha = false] If this flag is true, then
     * regardless of whether or not the alpha channel is opaque (1), than the
     * alpha information will be included in the results. This defaults to false
     * which will only use the alpha information if it is not completely opaque.
     * @param {boolean} [whole = false] If this flag is true, then the resulting
     * RGB channel percentages will be rounded to whole numbers instead of the
     * default which is to leave the decimal places remaining.
     * @returns {string} Functional-notation string
     */
    toFunctional(forceAlpha?: boolean, whole?: boolean): string;
    /**
     * Returns the channel at the given index. The channels are in order as:
     *
     * - 0: red
     * - 1: green
     * - 2: blue
     * - 3: alpha
     *
     * For convienience {@link ColorRGB.Channels} contains an enum that maps this
     * directly.
     *
     * If the index is out-of-range, then 0 is returned
     *
     * @param {number} index channel index
     * @returns {number} channel value as unit float (0..1)
     */
    get(index: number): number;
    /**
     * Sets each channel of this color and returns a new ColorRGB object. Each
     * channel is mapped in order to variadic arguments: red, green, blue, alpha.
     * In the event a channel is provided `null` or `undefined` it will use the
     * same value present in `this` color. Additionally, any missing channels are
     * also considered null/undefined.
     *
     * Channels can be provided unit float numbers (0..1), or a percentage string
     * such as "50%", or the "none" keyword implying 0.
     *
     * @immutable
     * @param {...(number | string)} args Variadic arguments matching each
     * channel of red, green, blue, alpha in order. Each channel can be either a
     * number (expects unit float 0..1), or a string that can be evaluated to a
     * singular value such as "none", or a percentage (ie. "50%").
     * @returns {ColorRGB} new ColorRGB object
     */
    set(...channels: Array<undefined | null | number | string>): ColorRGB;
    /**
     * Adjust the opacity.
     *
     * Creates a new RGB color using the channels from `this` and sets a new alpha
     * using the one provided.
     *
     * @immutable
     * @param {number} alpha New alpha opacity, as a unit float (0..1).
     * @returns {ColorRGB} new ColorRGB object
     */
    setAlpha(alpha: number): ColorRGB;
    /**
     * Map the channels of this current color into a new color using the
     * provided mapping callbacks.
     *
     * Example:
     * ```TypeScript
     * // Invert all the channels
     * const newColor = existingColor.map(
     *    (val:number) => (1 - val),      // Called on RGB
     *    (alpha:number) => (1 - alpha),  // Called on ALPHA only
     * );
     * ```
     *
     * @immutable
     * @param {Function} chanCB Callback following the signature
     * `(chan:number, index:number, color:ColorRGB) => number` which is called on
     * each color channel (excluding alpha) to map a new value given the current
     * value.
     * @param {Function} alphaCB Callback following the signature
     * `(alpha:number, color:ColorRGB) => number` which is called on the alpha
     * component to map a new value using the current value. By default, this is
     * a non-op that leaves the alpha un-touched.
     * @returns {ColorRGB} new ColorRGB object
     */
    map(chanCB: ChannelMapCallback, alphaCB?: AlphaMapCallback): ColorRGB;
    /**
     * Returns the minimum (smallest) value within the RGB channels. Optionally
     * supports returning the channel index as well.
     *
     * @param {boolean} [withIndex = false] If true, returns a tuple of `[value,
     * index ]` where the value is the smallest channel, and the index is the
     * index of the channel that was smallest. Otherwise false (default) only
     * returns the value. If all channels are the same, red is returned.
     * @returns {number|Array} Either a unit float (0..1) or a tuple depending on
     * the `withIndex` parameter.
     */
    minChannel(withIndex?: boolean): (number | [number, number]);
    /**
     * Returns the maximum (largest) value within the RGB channels. Optionally
     * supports returning the channel index as well.
     *
     * @param {boolean} [withIndex = false] If true, returns a tuple of `[value,
     * index ]` where the value is the largest channel, and the index is the
     * index of the channel that was largest. Otherwise false (default) only
     * returns the value. If all channels are the same, red is returned.
     * @returns {number|Array} Either a unit float (0..1) or a tuple depending on
     * the `withIndex` parameter.
     */
    maxChannel(withIndex?: boolean): (number | [number, number]);
    /**
     * Returns a new `ColorRGB` object with each of the RGB channels multiplied
     * with the alpha component of this color. The alpha channel returned is not
     * modified and is passed-through.
     *
     * @immutable
     * @returns {ColorRGB} new ColorRGB object
     */
    premultiplyAlpha(): ColorRGB;
    /**
     * Calculates the YIQ-color encoding value for this color
     *
     * @see https://24ways.org/2010/calculating-color-contrast
     * @returns YIQ value
     */
    toYIQValue(): number;
    /**
     * Calculates the WCAG 2.0 Luminosity value of this color.
     *
     * @see https://www.w3.org/TR/WCAG20/#relativeluminancedef
     * @returns Floating-point unit luminosity value
     */
    luminosity(): number;
    /**
     * Calculates the WCAG 2.0 Contrast value between this color and another.
     *
     * @see http://www.w3.org/TR/WCAG20/#contrast-ratiodef
     * @param other The other color to compare this with
     * @returns Numerical contrast value
     */
    contrast(other: IColor): number;
    /**
     * Calculates the WCAG 2.0 Contrast level between this color and another.
     * Returned as a string to represent the "grade" the contrast ratio
     * represents.
     *
     * Returned values:
     * - `"AAA"`: Ratios over-or-equal to 7.1
     * - `"AA"`: Ratios over-or-equal to 4.5
     * - `""`: Ratios under 4.5
     *
     * @param other The other color to compare this with
     * @returns String value of either 'AAA', 'AA', or ''
     */
    contrastLevel(other: IColor): string;
    /**
     * Selects a color from the given array of colors that has the highest
     * contrast ratio with `this` color.
     *
     * Inspired by the CSS Color Module 5 `color-contrast()` function. Consider
     * `this` to be the background color, and the supplied `options` to be options
     * for foreground.
     *
     * If no argument is provided, or is an empty array, it will default to using
     * opaque black and white.
     *
     * @note alpha is not considered during contrast calculation
     *
     * @param {Array} options Array of IColor color-space objects, each object
     * will be converted to this color-space for comparison. If the array is not
     * provided, or is empty, the colors black and white will be used instead
     * @returns {ColorRGB} new ColorRGB object
     */
    pickUsingContrast(options?: Array<IColor>): ColorRGB;
    /**
     * Performs a YIQ conversion using {@link ColorRGB.toYIQValue} and then
     * compares the output to a "half-way" point to decide if the color is
     * considered "dark".
     *
     * @returns Boolean true if this color is considered "dark"
     */
    isDark(): boolean;
    /**
     * Performs a YIQ conversion using {@link ColorRGB.toYIQValue} and then
     * compares the output to a "half-way" point to decide if the color is
     * considered "light".
     *
     * @returns Boolean true if this color is considered "light"
     */
    isLight(): boolean;
    /**
     * Linearly interpolates this RGB color, and an other IColor that can be
     * converted to RGB, given a `delta` weight.
     *
     * @immutable
     * @param {IColor} other Other color to interpolate to
     * @param {number} delta Unit float (0..1) weight between this and the other
     * @returns {ColorRGB} new ColorRGB object
     */
    lerp(other: IColor, delta: number): ColorRGB;
    /**
     * Shade, or darken.
     *
     * Creates a "shade" of this color by interpolating it with black by the given
     * fraction `delta`.
     *
     * @param {number} frac Unit float (0..1) fraction for how much to shade the
     * color. 0 results in none, 1 results in full black.
     */
    shade(frac: number): ColorRGB;
    /**
     * Darken this color and return a new color.
     *
     * Alias for {@link ColorRGB.shade}
     *
     * @param amount fractional unit float (0..1) for how much to darken.
     * @returns {ColorRGB} new ColorRGB object
     */
    readonly darken: (amount: number) => ColorRGB;
    /**
     * Tint, or lighten.
     *
     * Creates a "tint" of this color by interpolating it with white by the given
     * fraction `delta`.
     *
     * @param {number} frac Unit float (0..1) fraction for how much to shade the
     * color. 0 results in none, 1 results in full white.
     */
    tint(frac: number): ColorRGB;
    /**
     * Lighten this color and return a new color.
     *
     * Alias for {@link ColorRGB.tint}
     *
     * @param amount fractional unit float (0..1) for how much to lighten.
     * @returns {ColorRGB} new ColorRGB object
     */
    readonly lighten: (amount: number) => ColorRGB;
    /**
     * Tone, or saturate.
     *
     * Creates a "tone" of this color by interpolating it with gray by the given
     * fraction `delta`. The gray is 50% gray, and not the grayscale calculation
     * of this color. For that, see {@link ColorRGB.desaturate}
     *
     * @param {number} frac Unit float (0..1) fraction for how much to shade the
     * color. 0 results in completely gray, 1 results in original color.
     */
    tone(frac: number): ColorRGB;
    /**
     * Inverts this RGB colors values and returns a new color. Optionally will
     * invert the alpha as well.
     *
     * @immutable
     * @param alpha (default false) If true, the alpha will be inverted as well
     * @returns {ColorRGB} new ColorRGB object
     */
    invert(alpha?: boolean): ColorRGB;
    /**
     * Converts this RGB color into a grayscale color using the "weighted" method.
     *
     * @see https://www.dynamsoft.com/blog/insights/image-processing/image-processing-101-color-space-conversion/
     *
     * @immutable
     * @param {number} [frac = 1.0] Percentage of desaturation as a unit float
     * (0..1), 0 resulting in no desaturation, and 1 resulting in completely gray.
     * Default is 1.0 or completely desaturated.
     * @returns {ColorRGB} new ColorRGB object
     */
    desaturate(frac?: number): ColorRGB;
    /**
     * Converts this RGB color into a grascale color using an "averaging" method
     * in which an average of each color is calculated and then applied for each
     * channel of a new color.
     *
     * Alpha/opacity remains intact and is based on `this` colors alpha.
     *
     * @see {@link ColorRGB.desaturate} for a weighted method.
     * @returns {ColorRGB} new ColorRGB object
     */
    grayscale(): ColorRGB;
    /**
     * Calculates the median, or "middle" value between the lowest channel, and
     * the highest channel. This is the mid-point between where the minimum and
     * maximum values across the RGB channels is.
     *
     * @returns {number} Median, or mid-point, between RGB channels.
     */
    median(): number;
    /**
     * Performs a median-based thresholding of this color. Calculates the median
     * value using {@link ColorRGB.median} and based on the results is compared
     * against the given `level` argument to return one of the provided colors.
     *
     * If the median is <= `level` then the `lowColor` is returned.
     * If the median is > `level` then the `highColor` is returned.
     *
     * @param {number} level Threshold level, as a unit float (0..1)
     * @param {ColorRGB} lowColor Color to return if the value is equal-to or
     * below the given level. Defaults to black.
     * @param highColor Color to return if the value is over the given level.
     * Defaults to white.
     * @returns {ColorRGB} new ColorRGB object
     */
    threshold(level: number, lowColor?: ColorRGB, highColor?: ColorRGB): ColorRGB;
}
export default ColorRGB;
