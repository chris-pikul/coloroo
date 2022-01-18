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

import { StringEnum } from './types';

export const ParameterType:StringEnum = {
  INTEGER: 'INTEGER',
  FLOAT: 'FLOAT',
  PERCENTAGE: 'PERCENTAGE',
} as const;

/**
 * TS type information for ColorSpace enum.
 */
export type EParameterType = typeof ParameterType[string];

/**
 * Attempts to guess the type the given parameter is.
 * 
 * @param param Input parameter string
 * @returns ParameterType enum
 */
export function detectParamType(param:string):EParameterType {
  if(param.endsWith('%'))
    return ParameterType.PERCENTAGE;
  else if(param.includes('.') || param.toLowerCase().includes('e'))
    return ParameterType.FLOAT;
  return ParameterType.INTEGER;
}

export interface ParamConvertResults {
  original:(number|string),
  type:EParameterType,
  value:number,
};

export function convertParam(param:(number|string)):ParamConvertResults {
  const paramStr = param.toString();
  const detect:EParameterType = detectParamType(paramStr);
  let value:number;
  switch(detect) {
    case ParameterType.INTEGER:
      value = parseInt(paramStr);
      break;
    case ParameterType.FLOAT:
      value = parseFloat(paramStr);
      break;
    case ParameterType.PERCENTAGE:
      value = parseFloat(paramStr.substring(0, paramStr.indexOf('%'))) / 100;
      break;
    default:
      value = 0;
  }

  return {
    original: param,
    type: detect,
    value,
  };
}
