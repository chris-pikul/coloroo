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

import { wrap } from './math';
import {
  captureFirst,
  regexpAngle,
  regexpInteger,
  regexpNumber,
  regexpPercent,
} from './regexp';

import type { StringEnum } from './types';

export const ParameterType:StringEnum = {
  UNKNOWN: 'UNKNOWN',
  NONE: 'NONE',
  INTEGER: 'INTEGER',
  FLOAT: 'FLOAT',
  PERCENTAGE: 'PERCENTAGE',
  ANGLE: 'ANGLE',
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
  const clnStr = param.trim().toLowerCase();

  if(clnStr === 'none')
    return ParameterType.NONE;
  
  if(regexpInteger.test(clnStr))
    return ParameterType.INTEGER;

  if(regexpPercent.test(clnStr))
    return ParameterType.PERCENTAGE;

  if(regexpNumber.test(clnStr))
    return ParameterType.FLOAT;

  if(regexpAngle.test(clnStr))
    return ParameterType.ANGLE;

  return ParameterType.UNKNOWN;
}

export interface ParamConvertResults {
  original:(number|string),
  type:EParameterType,
  value:number,
};

function convertAngleParam(param:string):number {
  const clnStr = param.trim().toLowerCase();
  const [ num, unit ] = captureFirst(regexpAngle, clnStr);
  switch(unit) {
    case 'grad':
      return wrap(parseFloat(num) * (180 / 200));
    case 'rad':
      return wrap(parseFloat(num) * (180 / Math.PI));
    case 'turn':
      return wrap(parseFloat(num) * 360);
    default:
      return wrap(parseFloat(num));
  }
}

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
    case ParameterType.ANGLE:
      value = convertAngleParam(paramStr);
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
