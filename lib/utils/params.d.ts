/**
 * Copyright © 2021 Chris Pikul.
 *
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 *
 * Provides common parameter methods for use with functional-notation values.
 *
 * @module Utilities
 */
import type { StringEnum } from './types';
export declare const ParameterType: StringEnum;
/**
 * TS type information for ColorSpace enum.
 */
export declare type EParameterType = typeof ParameterType[string];
/**
 * Attempts to guess the type the given parameter is.
 *
 * @param param Input parameter string
 * @returns ParameterType enum
 */
export declare function detectParamType(param: string): EParameterType;
export interface ParamConvertResults {
    original: (number | string);
    type: EParameterType;
    value: number;
}
export declare function convertParam(param: (number | string)): ParamConvertResults;
