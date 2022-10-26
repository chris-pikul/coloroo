/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 * 
 * Defines the implementation for the HSL color spectrum. The component hue is
 * stored as a degree float (0..360), while components saturation, and lightness
 * are stored as unit floats (0..1).
 * 
 * @module HSL
 */
import IColor from './IColor';
import ColorRGB from './RGB';

import {
  clamp,
  toPercent,
  wrap,
} from './utils/math';
import { objectMatchesPattern } from './utils/objects';
import { convertParam, ParameterType } from './utils/params';
import { captureFirst, regexpHSLFunc } from './utils/regexp';

/**
 * Tuple array holding the hue, saturation, lightness, and optionally alpha
 * components. The hue component is a degree float (0..360), while the remaining
 * are unit floats (0..1).
 */
export type HSLTuple = [number, number, number, number?];

/**
 * Interface defining a shorthand HSL(A) object capable of JSON serialization.
 */
export interface HSLObject extends Record<string, number> {

  /**
   * Hue component, as a degree float (0..360)
   */
  h:number;

  /**
   * Saturation component, as a unit float (0..1)
   */
  s:number;

  /**
   * Lightness component, as a unit float (0..1)
   */
  l:number;

  /**
   * Optional alpha component, as a unit float (0..1)
   */
  a?:number;
};

const hslPattern:Record<string, any> = {
  h: 1,
  hue: 1,
  s: 1,
  saturation: 1,
  l: 1,
  lightness: 1,
};

/**
 * HSL color-space. Uses the components hue, saturation, lightness, and features
 * the alpha/opacity.
 * 
 * The hue component is held as a degree float (0..360), while the remaining
 * components are unit floats (0..1).
 * 
 * @immutable
 */
export class ColorHSL implements IColor {
  private static ensureHSL(color:any):ColorHSL {
    if(color instanceof ColorHSL) {
      return color;
    } else if(color instanceof ColorRGB) {
      return ColorHSL.fromRGB(color);
    } else if(typeof color === 'object') {
      if(typeof color.toHSL === 'function') {
        return new ColorHSL(color.toHSL());
      } else if(objectMatchesPattern(color, hslPattern, true)) {
        const obj = color as any;
        const hue = obj.h ?? obj.hue ?? 0.0;
        const sat = obj.s ?? obj.saturation ?? 0.0;
        const lit = obj.l ?? obj.lightness ?? 0.0;
        const alpha = obj.a ?? obj.alpha ?? 0.0;
        return new ColorHSL(hue, sat, lit, alpha);
      } else if(typeof color.toRGB === 'function') {
        return ColorHSL.fromRGB(color.toRGB());
      }
    }

    throw new TypeError(`given color cannot be implied or converted to ColorHSL.`);
  }

  /**
   * Converts an input RGB color object into a new ColorHSL object.
   * 
   * @param rgb Object that either is a ColorRGB, or can construct a ColorRGB
   * object for use during conversion.
   * @returns {ColorHSL} new ColorHSL object
   */
  public static fromRGB(rgb:ColorRGB):ColorHSL {
    const min = rgb.minChannel() as number;
    const [ max, maxInd ] = rgb.maxChannel(true) as [number, number];
    const chroma = max - min;

    // Calculate hue
    let hue = 0.0;
    if(chroma !== 0) {
      switch(maxInd) {
        case ColorRGB.Channels.RED:
          hue = ((rgb.green - rgb.blue) / chroma) % 6;
          break;
        case ColorRGB.Channels.GREEN:
          hue = ((rgb.blue - rgb.red) / chroma) % 6;
          break;
        case ColorRGB.Channels.BLUE:
          hue = ((rgb.red - rgb.green) / chroma) % 6;
          break;
        default:
          throw new Error(`ColorHSL.fromRGB expected a valid maximum channel within range`);
      }
    }
    hue *= 60;

    // Calculate lightness
    const lit = (max + min) / 2.0;

    // Calculate saturation
    const sat = chroma === 0 ? 0 : (chroma / (1 - Math.abs((2 * lit) - 1)));

    return new ColorHSL(hue, sat, lit, rgb.alpha);
  }

  /**
   * Parses the input string as a CSS3+ functional-notation color value. Only
   * accepts the `hsl()` and `hsla()` functions.
   * 
   * @note Only handles HSL creation, and will not perform RGB pre-conversion or
   * parsing of any kind.
   * 
   * @param str Input string to parse
   * @returns {ColorHSL} new ColorHSL object
   * 
   * @throws {TypeError} if the string cannot be parsed
   * @throws {TypeError} if the number of components is invalid
   */
  public static fromFunctional(str:string):ColorHSL {
    const clnStr = str.trim().toLowerCase();
    
    // Use the regular expression to match against functional notation for RGB
    const matches = captureFirst(regexpHSLFunc, clnStr);
    if(matches === null)
      throw new TypeError(`ColorHSL.fromFunctional() failed to parse the string "${str}".`);

    // Pass the remaining values off to constructor since it converts strings
    return ColorHSL.apply(...matches);
  }

  /**
   * Attempts to parse an incoming string as an HSL color-space object.
   * 
   * Accepts the keyword "transparent", but otherwise internally uses the 
   * {@link ColorHSL.fromFunctional} method.
   * 
   * @note Only handles HSL creation, and will not perform RGB pre-conversion or
   * parsing of any kind.
   * 
   * @param _str Input string to parse
   * @returns {ColorHSL} new ColorHSL object
   * 
   * @throws {TypeError} if the string cannot be parsed
   */
  public static fromString(str:string):ColorHSL {
    const clnStr = str.trim().toLowerCase();

    if(clnStr === 'transparent')
      return new ColorHSL(0, 0, 0, 0);

    return ColorHSL.fromFunctional(clnStr);
  }

  /**
   * Sets the components of a new ColorHSL using variable arguments. The order
   * of the arguments is taken as `apply(H, S, L, A)`. Any missing components
   * are skipped and will take their default values.
   * 
   * Will parse string values to the best of it's ability. This includes
   * parameter detection, and treatment depending on the type. For example:
   * given a percentage string such as "50%", it will be converted and scaled to
   * the appropriate value for that component. Numberic values (no featuing the
   * percentage sign), are treated as they are an are clamped to the components
   * range.
   * 
   * Does NOT throw errors if the value is out-of-range, and instead will
   * quietly wrap the value. This wrapping means that inputing `520deg` as a hue
   * value will have the value circle around until in-range `160deg`. Same with
   * negative values. This applies only to the hue component. Remaining unit
   * float values are clamped to 0 and 1.
   * 
   * @returns {ColorHSL} new ColorHSL object
   * 
   * @throws {TypeError} if any component cannot be parsed.
   */
  public static apply(...components:Array<number | string>):ColorHSL {
    // Prepare components
    const hsl:HSLTuple = [
      0,
      0,
      0,
      1.0,
    ];

    for(let ind = 0; ind < components.length; ind++) {
      const comp = components[ind];
      if(comp === null || typeof comp === 'undefined')
        continue;

      const { type, value } = convertParam(comp);

      switch(ind) {
        case ColorHSL.Components.HUE:
          // Hue is degrees if only a number is input
          if(type === ParameterType.FLOAT || type === ParameterType.INTEGER)
            hsl[0] = wrap(value);
          else if(type === ParameterType.ANGLE)
            hsl[0] = value;
          else if(type === ParameterType.NONE)
            hsl[0] = 0;
          else
            throw new TypeError(`ColorHSL.apply() received invalid hue component "${comp}", expected either a number, angle, or "none".`);
          break;
        case ColorHSL.Components.SATURATION:
        case ColorHSL.Components.LIGHTNESS:
          if(type === ParameterType.FLOAT || type === ParameterType.INTEGER || type === ParameterType.PERCENTAGE)
            hsl[ind] = clamp(value);
          else if(type === ParameterType.NONE)
            hsl[ind] = 0;
          else
            throw new TypeError(`ColorHSL.apply() received invalid ${ind === 1 ? 'saturation' : 'lightness'} component "${comp}", expected either a number, percentage, or "none".`);
          break;
        case ColorHSL.Components.ALPHA:
          if(type === ParameterType.FLOAT || type === ParameterType.INTEGER)
            hsl[3] = clamp(value);
          else if(type === ParameterType.PERCENTAGE)
            hsl[3] = value;
          else if(type === ParameterType.NONE)
            hsl[3] = 0;
          else
            throw new TypeError(`ColorHSL.apply() received invalid alpha component "${comp}", expected either a number, percentage, or none.`);
          break;
        default:
          break;
      }
    }

    return new ColorHSL(...hsl);
  }

  /**
   * Enumeration mapping the named components to their index within this HSL
   * color, as if this object was an array.
   * 
   * @readonly
   */
  public static readonly Components:Record<string, number> = {
    HUE: 0,
    SATURATION: 1,
    LIGHTNESS: 2,
    ALPHA: 3,
  } as const;

  /**
   * The hue component, expressed as a degree float (0..360).
   * 
   * Follows the standard color wheel in which both 0 and 360 are "red hues"
   * and traverses the colors approriately.
   * 
   * @readonly
   * @immutable
   */
  readonly hue:number = 0.0;

  /**
   * The saturation component, expressed as a unit float (0..1).
   * 
   * A value of 0 results in a tonaly completely gray result, with 1 being of
   * complete saturation.
   * 
   * @readonly
   * @immutable
   */
  readonly saturation:number = 0.0;

  /**
   * The lightness component, expressed as a unit float (0..1).
   * 
   * A value of 0 results in a black color regardless of any other components.
   * Like-wise, a value of 1 results in a white color. The value of 0.5 results
   * in the most tonaly saturated result.
   * 
   * @readonly
   * @immutable
   */
  readonly lightness:number = 0.0;

  /**
   * The alpha component, or "opacity", expressed as a unit float (0..1).
   * 
   * A value of 0 results in completely transparent color. The default value is
   * 1 and results in a completely opaque (solid) color.
   * 
   * @readonly
   * @immutable
   */
  readonly alpha:number = 1.0;

  constructor(
    _arg0 ?: (ColorHSL | HSLObject | IColor | Array<number|string> | string | number),
    _sat ?: (string | number),
    _lit ?: (string | number),
    _alpha ?: (string | number),
  ) {
    // Bind methods
    this.toString = this.toString.bind(this);
    this.toArray = this.toArray.bind(this);
    this.toObject = this.toObject.bind(this);
    this.toRecord = this.toRecord.bind(this);
    this.toRGB = this.toRGB.bind(this);
    this.toFunctional = this.toFunctional.bind(this);

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.setAlpha = this.setAlpha.bind(this);
  }

  toString():string {
    return this.toFunctional();
  }

  toArray(forceAlpha = false):HSLTuple {
    const arr:HSLTuple = [
      this.hue,
      this.saturation,
      this.lightness,
    ];

    if(forceAlpha || this.alpha !== 1.0)
      arr.push(this.alpha);

    return arr;
  }

  toObject(forceAlpha = false):HSLObject {
    const obj:HSLObject = {
      h: this.hue,
      s: this.saturation,
      l: this.lightness,
    };

    if(forceAlpha || this.alpha !== 1.0)
      obj.a = this.alpha;

    return obj;
  }

  toRecord(forceAlpha = false):HSLObject {
    return this.toObject(forceAlpha);
  }

  /**
   * Converts this HSL color-space object into a new RGB color-space object.
   * 
   * Alpha is maintained and passed through to the new ColorRGB object.
   * 
   * @returns {ColorRGB} new ColorRGB object
   */
  toRGB(): ColorRGB {
    const chroma = (1 - Math.abs((this.lightness * 2.0) - 1)) * this.saturation;
    
    // X is the second largest channel
    const x = chroma * (1 - Math.abs(((this.hue / 60.0) % 2) - 1));
    
    let red = 0;
    let green = 0;
    let blue = 0;

    if(this.hue >= 0 && this.hue < 60) {
      red = chroma;
      green = x;
    } else if(this.hue >= 60 && this.hue < 120) {
      red = x;
      green = chroma;
    } else if(this.hue >= 120 && this.hue < 180) {
      green = chroma;
      blue = x;
    } else if(this.hue >= 180 && this.hue < 240) {
      green = x;
      blue = chroma;
    } else if(this.hue >= 240 && this.hue < 300) {
      red = x;
      blue = chroma;
    } else {
      red = chroma;
      blue = x;
    }
    
    // Calculate the offset that lightness provides us for a minimum channel
    const offset = this.lightness - (chroma / 2.0);

    return new ColorRGB(red + offset, green + offset, blue + offset, this.alpha);
  }

  toFunctional(forceAlpha = false, whole = false):string {
    const hue = this.hue + 0.0;
    const sat = toPercent(this.saturation, whole);
    const lit = toPercent(this.lightness, whole);

    if(forceAlpha || this.alpha !== 1.0)
      return `rgba(${hue}, ${sat}, ${lit}, ${this.alpha})`;
    return `rgb(${hue}, ${sat}, ${lit})`;
  }

  get(index:number):number {
    switch(index) {
      case ColorHSL.Components.HUE: return this.hue;
      case ColorHSL.Components.SATURATION: return this.saturation;
      case ColorHSL.Components.LIGHTNESS: return this.lightness;
      case ColorHSL.Components.ALPHA: return this.alpha;
      default: return 0;
    }
  }

  set(...components:Array<undefined|null|number|string>):ColorHSL {
    // Trim the components and fill in the missing parts.
    const cleanComps:Array<number|string> = components.slice(0, 4)
      .map((val, ind):(number|string) => (val ?? this.get(ind)));

    // Use the apply static functions to make a new color
    return ColorHSL.apply(...cleanComps);
  }

  setAlpha(alpha = 1.0):ColorHSL {
    return new ColorHSL(this.hue, this.saturation, this.lightness, alpha);
  }

  toYIQValue = ():number => (this.toRGB().toYIQValue());

  luminosity = ():number => (this.toRGB().luminosity());

  contrast = (other:IColor):number => (this.toRGB().contrast(other));

  contrastLevel = (other:IColor):string => (this.toRGB().contrastLevel(other));

  pickUsingContrast = (options?:Array<IColor>):ColorHSL => {
    const rgb:ColorRGB = this.toRGB().pickUsingContrast(options);
    return ColorHSL.fromRGB(rgb);
  };

  isDark = ():boolean => (this.toRGB().isDark());

  isLight = ():boolean => (this.toRGB().isLight());
}
export default ColorHSL;
