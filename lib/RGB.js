"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _ColorRGB_components, _ColorRGB_alpha;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorRGB = void 0;
/**
 * Copyright © 2021 Chris Pikul.
 *
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 *
 * Defines the implementation for the RGB color spectrum. This version of the
 * RGB color-space uses 8-bit channel values for R, G, and B. Alpha is present
 * as an optional unit float (0..1)
 *
 * @module RGB
 */
const NamedColors_1 = __importDefault(require("./NamedColors"));
const math_1 = require("./utils/math");
const regexp_1 = require("./utils/regexp");
const params_1 = require("./utils/params");
/**
 * Valid string enumerations for formating `ColorRGB` into either a string, or
 * an integer number.
 *
 * @enum
 */
const RGBFormat = {
    /**
     * Format the color into a single integer value, with automatic alpha
     * detection.
     */
    INTEGER: 'INTEGER',
    /**
     * Format the color into a single integer value, with FORCED alpha usage.
     */
    INTEGER_ALPHA: 'INTEGER_ALPHA',
    /**
     * Format the color into a hexidecimal string, with automatic alpha
     * detection.
     */
    HEX: 'HEX',
    /**
     * Format the color into a hexidecimal string, with FORCED alpha usage.
     */
    HEX_ALPHA: 'HEX_ALPHA',
    /**
     * Format the color into it's functional notation string, with automatic
     * alpha detection.
     */
    FUNCTIONAL: 'FUNCTIONAL',
    /**
     * Format the color into it's functional notation string, with FORCED alpha
     * usage.
     */
    FUNCTIONAL_ALPHA: 'FUNCTIONAL_ALPHA',
};
/**
 * RGB with Alpha color-space. The red, green, and blue channels are 8-bit
 * bytes (0..255) and will round/truncate on manipulation.
 */
class ColorRGB {
    constructor() {
        /**
         * Holds the RGB components as an tuple array
         */
        _ColorRGB_components.set(this, [
            0,
            0,
            0,
        ]);
        /**
         * The alpha (opacity) of the color, clamped to a unit number 0..1 by the
         * public getter/setters.
         */
        _ColorRGB_alpha.set(this, 1.0);
        // Bind methods
        this.toString = this.toString.bind(this);
        this.toInteger = this.toInteger.bind(this);
        this.toHexString = this.toHexString.bind(this);
        this.toFuncString = this.toFuncString.bind(this);
        this.toArray = this.toArray.bind(this);
        this.set = this.set.bind(this);
        this.fromInteger = this.fromInteger.bind(this);
        this.fromHexString = this.fromHexString.bind(this);
        this.fromFuncString = this.fromFuncString.bind(this);
        this.fromString = this.fromString.bind(this);
        this.fromArray = this.fromArray.bind(this);
        this.fromObject = this.fromObject.bind(this);
        this.parse = this.parse.bind(this);
    }
    /**
     * The red component as a byte (0..255) integer
     */
    get red() {
        return __classPrivateFieldGet(this, _ColorRGB_components, "f")[0];
    }
    set red(byteValue) {
        __classPrivateFieldGet(this, _ColorRGB_components, "f")[0] = (0, math_1.clampByte)(byteValue);
    }
    /**
     * The green component as a byte (0..255) integer
     */
    get green() {
        return __classPrivateFieldGet(this, _ColorRGB_components, "f")[1];
    }
    set green(byteValue) {
        __classPrivateFieldGet(this, _ColorRGB_components, "f")[1] = (0, math_1.clampByte)(byteValue);
    }
    /**
     * The blue component as a byte (0..255) integer
     */
    get blue() {
        return __classPrivateFieldGet(this, _ColorRGB_components, "f")[2];
    }
    set blue(byteValue) {
        __classPrivateFieldGet(this, _ColorRGB_components, "f")[2] = (0, math_1.clampByte)(byteValue);
    }
    /**
     * The alpha, or opacity, of the color as a unit (0..1) float
     */
    get alpha() {
        return __classPrivateFieldGet(this, _ColorRGB_alpha, "f");
    }
    set alpha(value) {
        __classPrivateFieldSet(this, _ColorRGB_alpha, (0, math_1.clamp)(value), "f");
    }
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
    toString(format = ColorRGB.Formats.FUNCTIONAL) {
        switch (format) {
            case 'INTEGER':
                return this.toInteger().toString();
            case 'INTEGER_ALPHA':
                return this.toInteger(true).toString();
            case 'HEX':
                return this.toHexString();
            case 'HEX_ALPHA':
                return this.toHexString(true);
            case 'FUNCTIONAL':
                return this.toFuncString();
            case 'FUNCTIONAL_ALPHA':
                return this.toFuncString(true);
            default:
                console.warn(`ColorRGB.toString() was supplied a format "${format}" which is invalid, defaulting to "HEX".`);
                return this.toHexString();
        }
    }
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
    toInteger(forceAlpha = false, alphaMSB = false) {
        let value = ((this.red & 0xFF) << 16) | ((this.green & 0xFF) << 8) | (this.blue & 0xFF);
        if (forceAlpha || this.alpha !== 1) {
            const alphaComp = Math.trunc(this.alpha * 255);
            if (alphaMSB)
                value |= (alphaComp & 0xFF) << 24;
            else
                value = (value << 8) | (alphaComp & 0xFF);
        }
        return value >>> 0;
    }
    ;
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
    toHexString(forceAlpha = false, alphaMSB = false) {
        // Helper function to convert the Hex with padding to make it 2-chars
        const enc = (val) => ((val & 0xFF).toString(16).padStart(2, '0'));
        // Build the RGB representation
        const str = `#${enc(this.red)}${enc(this.green)}${enc(this.blue)}`;
        // If we force the alpha, or if alpha is not fully-opaque (1) then add it
        if (forceAlpha || __classPrivateFieldGet(this, _ColorRGB_alpha, "f") !== 1) {
            // With alphaMSB, the alpha component is first in the string
            if (alphaMSB)
                return `#${enc(__classPrivateFieldGet(this, _ColorRGB_alpha, "f") * 255)}${str.substring(1)}`;
            // Without alphaMSB, the alpha component is last
            return str + enc(__classPrivateFieldGet(this, _ColorRGB_alpha, "f") * 255);
        }
        // Alpha was not needed, so return the original string
        return str;
    }
    ;
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
    toFuncString(forceAlpha = false) {
        if (forceAlpha || __classPrivateFieldGet(this, _ColorRGB_alpha, "f") !== 1)
            return `rgba(${this.red}, ${this.green}, ${this.blue}, ${(0, math_1.cleanFloatStr)(__classPrivateFieldGet(this, _ColorRGB_alpha, "f"))})`;
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
    /**
     * Returns this color as an Array of numbers. The first 3 components are the
     * RGB channels as byte integers (0..255). The last component is the alpha
     * channel as it's unit-float (0..1).
     *
     * @returns {Array} Array of component values
     */
    toArray() {
        return [...__classPrivateFieldGet(this, _ColorRGB_components, "f"), __classPrivateFieldGet(this, _ColorRGB_alpha, "f")];
    }
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
    set(...components) {
        // Iterate through the arguments
        for (let ind = 0; ind < components.length; ind++) {
            const comp = components[ind];
            if (comp === null || typeof comp === 'undefined')
                continue;
            const { type, value } = (0, params_1.convertParam)(comp);
            // Check if this is the first 3 arguments (R, G, B)
            if (ind <= 2) {
                // Each type gets a treatment on RGB
                if (type === params_1.ParameterType.INTEGER)
                    __classPrivateFieldGet(this, _ColorRGB_components, "f")[ind] = (0, math_1.clamp)(value, 0, 255);
                else if (type === params_1.ParameterType.FLOAT)
                    __classPrivateFieldGet(this, _ColorRGB_components, "f")[ind] = (0, math_1.clampByte)(value);
                else if (type === params_1.ParameterType.PERCENTAGE)
                    __classPrivateFieldGet(this, _ColorRGB_components, "f")[ind] = (0, math_1.clampByte)(value * 255);
                else
                    __classPrivateFieldGet(this, _ColorRGB_components, "f")[ind] = 0;
            }
            else if (ind === 3) {
                // For alpha, we don't care on the type, just clamp its number
                __classPrivateFieldSet(this, _ColorRGB_alpha, (0, math_1.clamp)(value), "f");
            }
            else {
                // Break here since it's over 4 components
                break;
            }
        }
        return this;
    }
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
    fromInteger(value, useAlpha = false, alphaMSB = false) {
        // Convert the number to an integer
        let int = (value >>> 0);
        if (useAlpha) {
            // Determine the alpha byte position and grab it
            const alphaByte = alphaMSB ? ((int >> 24) & 0xFF) : (int & 0xFF);
            __classPrivateFieldSet(this, _ColorRGB_alpha, alphaByte / 255.0, "f");
            // If the alpha was LSB then shift the remaining integer right by 8-bits
            if (alphaMSB)
                int = int & 0xFFFFFF;
            else
                int >>= 8;
        }
        // Red component
        __classPrivateFieldGet(this, _ColorRGB_components, "f")[0] = (int >> 16) & 0xFF;
        // Green component
        __classPrivateFieldGet(this, _ColorRGB_components, "f")[1] = (int >> 8) & 0xFF;
        // Blue component
        __classPrivateFieldGet(this, _ColorRGB_components, "f")[2] = int & 0xFF;
        return this;
    }
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
    fromHexString(str) {
        const hexMatch = str.match(regexp_1.regexpHex);
        if (hexMatch && hexMatch.length === 2) {
            const hex = hexMatch[1];
            const int = Number.parseInt(hex, 16) >>> 0;
            // Turns half-byte integers into full-byte
            const htf = (hb) => (hb | (hb << 4));
            if (hex.length === 3) {
                // 3 length hex implies shorthand 4-bit colors (RGB)
                __classPrivateFieldGet(this, _ColorRGB_components, "f")[2] = htf(int & 0xF);
                __classPrivateFieldGet(this, _ColorRGB_components, "f")[1] = htf((int & 0xF0) >>> 4);
                __classPrivateFieldGet(this, _ColorRGB_components, "f")[0] = htf((int & 0xF00) >>> 8);
            }
            else if (hex.length === 4) {
                // 4 length hex implies shorthand 4-bit colors (RGBA)
                __classPrivateFieldSet(this, _ColorRGB_alpha, htf(int & 0xF) / 255.0, "f");
                __classPrivateFieldGet(this, _ColorRGB_components, "f")[2] = htf((int & 0xF0) >>> 4);
                __classPrivateFieldGet(this, _ColorRGB_components, "f")[1] = htf((int & 0xF00) >>> 8);
                __classPrivateFieldGet(this, _ColorRGB_components, "f")[0] = htf((int & 0xF000) >>> 12);
            }
            else if (hex.length === 6) {
                // 6 length hex is opaque 8-bit colors (RRGGBB)
                this.fromInteger(int);
            }
            else if (hex.length === 8) {
                // 8 length hex is transparent 8-bit colors (RRGGBBAA)
                this.fromInteger(int, true);
            }
            else {
                throw new Error(`ColorRGB.fromHexString() received malformed hexidecimal string. Expected length of 3, 6, or 8, but instead got "${hex.length}".`);
            }
            return this;
        }
        throw new TypeError(`ColorRGB.fromHexString() received malformed hexidecimal string. The value "${str}" cannot be parsed.`);
    }
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
    fromFuncString(str) {
        const clnStr = str.trim().toLowerCase();
        // Use the regular expression to match against functional notation for RGB
        const matches = (0, regexp_1.captureFirst)(regexp_1.regexpRGBFunc, clnStr);
        if (matches === null)
            throw new TypeError(`ColorRGB.fromFuncString() failed to parse the string "${str}".`);
        // Pass the remaining values off to this.set() since it converts strings
        return this.set(...matches);
    }
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
    fromString(str) {
        let clnStr = str.trim().toLowerCase();
        // Check for the special keyword "transparent"
        if (clnStr === 'transparent') {
            __classPrivateFieldSet(this, _ColorRGB_components, [
                0,
                0,
                0,
            ], "f");
            __classPrivateFieldSet(this, _ColorRGB_alpha, 0.0, "f");
            return this;
        }
        // Check if it is a NamedColor and replace the string with it's hex
        if (NamedColors_1.default[clnStr])
            clnStr = NamedColors_1.default[clnStr];
        // Check if it counts as a valid Hex string (if it doesn't throw)
        try {
            const hexRtn = this.fromHexString(clnStr);
            return hexRtn;
            // eslint-disable-next-line no-empty
        }
        catch (_a) { }
        // Check if it is functional-notation (if it doesn't throw)
        try {
            const funcRtn = this.fromFuncString(clnStr);
            return funcRtn;
            // eslint-disable-next-line no-empty
        }
        catch (_b) { }
        throw new TypeError(`ColorRGB.fromString() failed to parse the input string "${str}".`);
    }
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
    fromArray(arr) {
        return this.set(...arr);
    }
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
    fromObject(obj) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.red = (_b = (_a = obj.r) !== null && _a !== void 0 ? _a : obj.red) !== null && _b !== void 0 ? _b : 0;
        this.green = (_d = (_c = obj.g) !== null && _c !== void 0 ? _c : obj.green) !== null && _d !== void 0 ? _d : 0;
        this.blue = (_f = (_e = obj.b) !== null && _e !== void 0 ? _e : obj.blue) !== null && _f !== void 0 ? _f : 0;
        this.alpha = (_j = (_h = (_g = obj.a) !== null && _g !== void 0 ? _g : obj.alpha) !== null && _h !== void 0 ? _h : obj.opacity) !== null && _j !== void 0 ? _j : 1;
        return this;
    }
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
    parse(arg) {
        // Check that we even have an argument first
        if (arg) {
            // Cache the typeof for the remaining if statements
            const to = typeof arg;
            if (to === 'number') {
                return this.fromInteger(arg);
            }
            else if (to === 'string') {
                return this.fromString(arg);
            }
            else if (to === 'object') {
                if (Array.isArray(arg))
                    return this.fromArray(arg);
                // Default to object parsing, this doesn't throw errors
                return this.fromObject(arg);
            }
            throw new TypeError(`ColorRGB.parse() only accepts numbers, strings, arrays, and objects. Instead found "${typeof arg}".`);
        }
        return this;
    }
}
exports.ColorRGB = ColorRGB;
_ColorRGB_components = new WeakMap(), _ColorRGB_alpha = new WeakMap();
/**
 * The accepted string formats for parsing and generation
 *
 * @enum
 */
ColorRGB.Formats = RGBFormat;
exports.default = ColorRGB;
//# sourceMappingURL=RGB.js.map