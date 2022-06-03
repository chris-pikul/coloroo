/**
 * Copyright © 2021 Chris Pikul.
 *
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 *
 * Provides an interface for color-space based classes, allowing for easier
 * interopability between the different spaces.
 *
 * Each color-space class should implement this interface
 *
 */
/**
 * Interface for a generic color-space based class
 */
export interface IColorClass {
    toString(): string;
    toArray(): number[];
    set(): IColorClass;
    fromInteger(value: number): IColorClass;
    fromString(str: string): IColorClass;
    fromArray(arr: number[]): IColorClass;
    fromObject(obj: Record<any, any>): IColorClass;
    parse(arg: any): IColorClass;
}
