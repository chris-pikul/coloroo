import type { IColorClass } from './IColorClass';
import type { StringEnum } from './utils/types';
export declare type RGBTuple = [number, number, number];
/**
 * Valid string enumerations for formating `ColorRGB` into either a string, or
 * an integer number.
 *
 * @enum
 */
export declare const RGBFormat: StringEnum;
export declare type ERGBStringFormat = typeof RGBFormat[string];
/**
 * RGB with Alpha color-space. The red, green, and blue channels are 8-bit
 * bytes (0..255) and will round/truncate on manipulation.
 */
export declare class ColorRGB implements IColorClass {
    #private;
    /**
     * The accepted string formats for generating strings.
     *
     * @enum
     */
    static readonly Formats: StringEnum;
    /**
     * Creates a new Color in the RGB color-space.
     *
     * Accepts variable amounts of arguments, and depending on the number,
     * dictates how the color will be created.
     *
     * If only a single argument is supplied it is ran through the
     * {@link ColorRGB.parse} method. If an error occurs during parsing, this
     * constructor will throw an `Error`. The following value types are accepted:
     *
     * - `number`: Will be treated as a 32-bit integer.
     * - `string`: Can be either a hexidecimal string (ex. "#FFAA88"), a
     * functional-notation string such that CSS4 accepts (ex.
     * `rgba(255, 127, 64)`), an X11 named color (ex. "gold"), or the keyword
     * "transparent" for a fully-transparent black color.
     * - `array`: An array of RGB(A) component values, either as numbers, or as
     * strings that can be parsed into numbers (such as percentages, or the
     * "none" keyword). It does not need to contain all the channels, any missing
     * will be skipped and remain at their defaults.
     * - `object`: Any object that has any of the following properties available:
     *   - `r` or `red`: Byte value for red channel
     *   - `g` or `green`: Byte value for green channel
     *   - `b` or `blue`: Byte value for blue channel
     *   - `a` or `alpha` or `opacity`: Unit number (0..1) for alpha channel
     *
     * If multiple arguments are supplied they are treated as R, G, B, and A;
     * exactly as the {@link ColorRGB.set} method does (as they are passed
     * directly to it). Since `set()` does not throw errors, any issues in
     * parsing are quietly ignored and will default to 0.
     *
     * Examples of usage:
     * ```
     * new ColorRGB() // Default black color
     * new ColorRGB(255, 127, 64, 0.5) // Color from channels
     * new ColorRGB(0xFFAA88)   // Color from integer
     * new ColorRGB('gold')     // Color from X11 named color
     * new ColorRGB('#FFAA88')  // Color from hexidecimal string
     * new ColorRGB('rgb(255, 127, 64)')  // Color from functional-notation
     * new ColorRGB([255, 127, 64, 0.5])  // Color from array of numbers
     * new ColorRGB(['100%', '50%', 'none', '50%']) // Color from array of strings
     * new ColorRGB({ r: 255, g: 127, b: 64}) // Color from object
     * ```
     */
    constructor(_arg1?: (number | string | Array<number | string> | Record<any, any> | ColorRGB), _argG?: (number | string), _argB?: (number | string), _argA?: (number | string));
    /**
     * The red component as a byte (0..255) integer
     */
    get red(): number;
    set red(byteValue: number);
    /**
     * The green component as a byte (0..255) integer
     */
    get green(): number;
    set green(byteValue: number);
    /**
     * The blue component as a byte (0..255) integer
     */
    get blue(): number;
    set blue(byteValue: number);
    /**
     * The alpha, or opacity, of the color as a unit (0..1) float
     */
    get alpha(): number;
    set alpha(value: number);
    /**
     * Gets the red component as a unit
     *
     * @returns Unit value (0..1)
     */
    redUnit: () => number;
    /**
     * Gets the green component as a unit
     *
     * @returns Unit value (0..1)
     */
    greenUnit: () => number;
    /**
     * Gets the blue component as a unit
     *
     * @returns Unit value (0..1)
     */
    blueUnit: () => number;
    /**
     * Returns the string representation of this color, with an optional formating
     * parameter.
     *
     * The following enums are accepted for formats:
     * - `INTEGER`: Integer representation including alpha as the LSB if it is not
     * the default 1.0.
     * - `INTEGER_ALPHA`: Integer representation with alpha included as the LSB.
     * - `HEX`: Hexidecimal string representation, only includes alpha as the LSB
     * if it is not the default opaque (1.0).
     * - `HEX_ALPHA`: Hexidecimal string with the alpha as the LSB.
     * - `FUNCTIONAL` (default): CSS-style functional notation. Only includes the
     * alpha channel if it is not opaque (1.0).
     * - `FUNCTIONAL_ALPHA`: CSS-style functional notation with the alpha
     * channel. Uses the "rgba()" function style.
     *
     * @param format Optional enum for the output format. Defaults to functional.
     * @returns String representation
     */
    toString(format?: ERGBStringFormat): string;
    /**
     * Converts this RGB Color into it's integer representation.
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
     * Converts this RGB Color into it's hexidecimal string representation.
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
    toHexString(forceAlpha?: boolean, alphaMSB?: boolean): string;
    /**
     * Converts this RGB Color into it's functional-notation string, as if it was
     * being used with CSS.
     *
     * By default the alpha information is only included if the alpha value is
     * not 1.0, or the `forceAlpha` flag is true (defaults to false). Additionally
     * it is truncated to 4 points of precision.
     *
     * The output follows this format:
     * ```
     * rgb(255, 180, 127)
     * rgba(255, 180, 127, 180)
     * ```
     *
     * @param {boolean} [forceAlpha = false] If this flag is true, then
     * regardless of whether or not the alpha channel is opaque (1), than the
     * alpha information will be included in the results. This defaults to false
     * which will only use the alpha information if it is not completely opaque.
     * @returns {string} Functional-notation string
     */
    toFuncString(forceAlpha?: boolean): string;
    /**
     * Returns this color as an Array of numbers. The first 3 components are the
     * RGB channels as byte integers (0..255). The last component is the alpha
     * channel as it's unit-float (0..1).
     *
     * @returns {Array} Array of component values
     */
    toArray(): number[];
    /**
     * Returns this color as an Array of unit numbers (0..1). The first 3 indices
     * are the R, G, and B channels. The last indice is the alpha channel.
     *
     * @returns Array of component values as units (0..1)
     */
    toUnitArray(): number[];
    /**
     * Calculates the YIQ-color encoding value for this color
     *
     * @see https://24ways.org/2010/calculating-color-contrast
     * @returns YIQ value
     */
    toYIQValue(): number;
    /**
     * Sets the components of this RGB Color using variable arguments. The order
     * of the variables is taken as `set(R, G, B, A)`. Any missing components are
     * skipped.
     *
     * This will parse string values to the best of it's ability. This includes
     * parameter detection, and then treatment depending on the type.
     *
     * For the RGB components the following formats are accepted
     * - Integer 0..255 = mapped directly to the component
     * - Float 0..255 = truncates the decimal point and applied
     * - Percentage 0..100% = applies to the range 0..255 and set.
     *
     * For the alpha component, any value given is clamped to a unit 0..1. For
     * floats and percentages this is straight forward, for integers it just
     * becomes an on/off of 0 or 1. In other words, no byte conversion is made.
     *
     * @returns `this` for method-chaining
     */
    set(...components: (number | string)[]): IColorClass;
    /**
     * Sets the components of this RGB Color using variable arguments. The order
     * of the variables is taken as `set(R, G, B, A)`. Any missing components are
     * skipped.
     *
     * Each value should be a unit (0..1).
     *
     * @returns `this` for method-chaining
     */
    setUnits(...components: number[]): IColorClass;
    /**
     * Sets the red component of this RGB color with a byte value (0..255)
     *
     * @param byte Byte value (0..255)
     * @returns `this` for method-chaining
     */
    setRed(byte: number): ColorRGB;
    /**
     * Sets the red component of this RGB color with a unit value (0..1)
     *
     * @param unit Unit value (0..1)
     * @returns `this` for method-chaining
     */
    setRedUnit(unit: number): ColorRGB;
    /**
     * Sets the green component of this RGB color with a byte value (0..255)
     *
     * @param byte Byte value (0..255)
     * @returns `this` for method-chaining
     */
    setGreen(byte: number): ColorRGB;
    /**
     * Sets the green component of this RGB color with a unit value (0..1)
     *
     * @param unit Unit value (0..1)
     * @returns `this` for method-chaining
     */
    setGreenUnit(unit: number): ColorRGB;
    /**
     * Sets the green component of this RGB color with a byte value (0..255)
     *
     * @param byte Byte value (0..255)
     * @returns `this` for method-chaining
     */
    setBlue(byte: number): ColorRGB;
    /**
     * Sets the blue component of this RGB color with a unit value (0..1)
     *
     * @param unit Unit value (0..1)
     * @returns `this` for method-chaining
     */
    setBlueUnit(unit: number): ColorRGB;
    /**
     * Sets the alpha component of this RGB color with a unit value (0..1)
     *
     * @param unit Unit value (0..1)
     * @returns `this` for method-chaining
     */
    setAlpha(unit: number): ColorRGB;
    /**
     * Converts an incoming integer number into it's RGB(A) channel values and
     * sets this `ColorRGB` components appropriately.
     *
     * @param value Incoming integer number to convert
     * @param useAlpha If true, then an alpha component is present on this value,
     * and will be parsed appropriately. Default is `false`.
     * @param alphaMSB When `useAlpha` is true, this flag sets whether the alpha
     * component is in the Most-Significant-Byte, or the Least-Significant-Byte.
     * Default is to treat alpha as the LSB.
     * @returns `this` for method-chaining
     */
    fromInteger(value: number, useAlpha?: boolean, alphaMSB?: boolean): IColorClass;
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
     * @returns `this` for method-chaining
     *
     * @throws {TypeError} If the string is not parsable as a hex value
     * @throws {TypeError} If the string has too many or too little
     */
    fromHexString(str: string): ColorRGB;
    /**
     * Parses the input string as a CSS4 functional-notation color value. Only
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
     * @returns `this` for method-chaining
     *
     * @throws {TypeError} if the string cannot be parsed
     * @throws {TypeError} if the number of components is invalid
     */
    fromFuncString(str: string): ColorRGB;
    /**
     * Converts an incoming string to acceptable components and sets the channels
     * of this ColorRGB object. Will attempt to parse as each format in order
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
     * Uses the {@link ColorRGB.fromHexString} method to parse as a hexidecimal
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
     * Uses the {@link ColorRGB.fromFuncString} method to parse as a
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
     * @returns `this` for method-chaining
     */
    fromString(str: string): IColorClass;
    /**
     * Sets the components of this `ColorRGB` given an array. This is supplied
     * for clarity of API, but really just shortcuts to spread operating the
     * array into the `ColorRGB.set()` function.
     *
     * Accepts both strings and numbers. Strings will attempt to be converted
     * based on whatever type the value can be detected as.
     *
     * @see {@link ColorRGB.set} for the underlying functionality.
     * @param arr Input array
     * @returns `this` for method-chaining
     */
    fromArray(arr: (number | string)[]): IColorClass;
    /**
     * Attempts to set the components of this `ColorRGB` given potential
     * properties of the supplied object. Any missing components will default to
     * 0, except for alpha which defaults to 1 (opaque).
     *
     * Each color searches for a single-letter property, or the full-word name.
     * - Red: `obj.r` OR `obj.red` OR 0
     * - Green: `obj.g` OR `obj.green` OR 0
     * - Blue: `obj.b` OR `obj.blue` OR 0
     * - Alpha: `obj.a` OR `obj.alpha` OR obj.opacity OR 1
     *
     * @param obj Plain JS object
     * @returns `this` for method-chaining
     */
    fromObject(obj: Record<any, any>): IColorClass;
    /**
     * Attempts to parse the incoming parameter as a ColorRGB object and sets the
     * appropriate channels when found. Any missing components will use their
     * defaults, which for RGB is 0.0, and for Alpha is 1.0.
     *
     * Any failure to parse the object will throw an `Error` object. If a null,
     * or undefined object is supplied it will be quietly skipped.
     *
     * @param arg The argument to attempt to parse.
     * @returns `this` for method-chaining
     */
    parse(arg: any): IColorClass;
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
    contrast(other: ColorRGB): number;
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
    contrastLevel(other: ColorRGB): string;
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
     * __Immutable__
     *
     * Inverts this RGB colors values and returns a new color. Optionally will
     * invert the alpha as well.
     *
     * @param alpha (default false) If true, the alpha will be inverted as well
     * @returns New ColorRGB object
     */
    invert(alpha?: boolean): ColorRGB;
    /**
     * __Immutable__
     *
     * Converts this RGB color into a grayscale color using the "Weighted" method.
     *
     * @see https://www.dynamsoft.com/blog/insights/image-processing/image-processing-101-color-space-conversion/
     * @param perc Percentage of desaturation as a unit 0..1
     * @returns New ColorRGB object
     */
    desaturate(): ColorRGB;
    /**
     * __Immutable__
     *
     * Linearly interpolates this RGB color, and an other RGB color, given a
     * delta weight.
     *
     * @param other Other color to interpolate to
     * @param delta Unit (0..1) weight between this and the other
     * @returns New ColorRGB object
     */
    lerp(other: ColorRGB, delta: number): ColorRGB;
}
export default ColorRGB;
