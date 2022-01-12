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
  
  public toString():string {
    return '';
  }

  public toArray():number[] {
    return [];
  }
}
export default Color;
