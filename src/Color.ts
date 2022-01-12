/**
 * Copyright © 2021 Chris Pikul.
 * 
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 * 
 * @module Color
 */

import ColorSpace, { EColorSpace } from './ColorSpace';

import type { IColorClass } from './IColorClass';

/**
 * 
 */
export class Color implements IColorClass {
  /**
   * Declares the color-space that this Color object is represented by.
   *  
   * @private
   */
  readonly #space:EColorSpace = ColorSpace.RGB;

  /**
   * The object that actually implements the color-space.
   * 
   * @private
   */
  readonly #object:IColorClass;

  /**
   * The alpha (opacity) of the color, clamped to a unit number 0..1 by the
   * public getter/setters.
   */
  #alpha = 1.0;

  constructor() {
    // Bind methods
    this.toString = this.toString.bind(this);
    this.toArray = this.toArray.bind(this);

    // Attempt to parse the incoming arguments, if there are any
    if(arguments) {
      if(arguments.length === 1) {
        // If single argument, parse it as an incoming object
        const [ arg ] = arguments;
        
        if(typeof arg === 'string') {
          if(ColorSpace[arg])
            this.#space = arg;
        }
      }
    }
  }

  /**
   * The current color-space that this Color object is in.
   * 
   * @readonly
   */
  get space():EColorSpace {
    return this.#space;
  }

  /**
   * The underlying object that actually implements the color-space.
   * 
   * @readonly
   */
  get object():IColorClass {
    return this.#object;
  }

  /**
   * The alpha, or opacity, of the color.
   * 
   * This value is clamped to 0..1 when set.
   */
  get alpha():number {
    return this.#alpha;
  }

  /**
   * The alpha, or opacity, of the color.
   * 
   * This value is clamped to 0..1 when set.
   */
  set alpha(opacity:number) {
    this.#alpha = Math.min(Math.max(opacity, 0.0), 1.0);
  }

  public toString():string {
    return '';
  }

  public toArray():number[] {
    return [];
  }
}
export default Color;
