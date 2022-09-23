import { StringEnum } from './utils/types';

export const CompositeOperators:StringEnum = {
  CLEAR: 'clear',
  COPY: 'copy',
  DESTINATION: 'destination',

  SOURCE_OVER: 'source-over',
  DESTINATION_OVER: 'destination-over',

  SOURCE_IN: 'source-in',
  DESTINATION_IN: 'destination-in',

  SOURCE_OUT: 'source-out',
  DESTINATION_OUT: 'destination-out',

  SOURCE_ATOP: 'source-atop',
  DESTINATION_ATOP: 'destination-atop',
  
  XOR: 'xor',
  LIGHTER: 'lighter',
  PLUS_DARKER: 'plus-darker',
  PLUS_LIGHTER: 'plus-lighter',
} as const;

export type ECompositeOperator = typeof CompositeOperators[keyof typeof CompositeOperators];

export const BlendModes:StringEnum = {
  MULTIPLY: 'multiply',
  SCREEN: 'screen',
  OVERLAY: 'overlay',
  DARKEN: 'darken',
  LIGHTEN: 'lighten',
  COLOR_DODGE: 'color-dodge',
  COLOR_BURN: 'color-burn',
  HARD_LIGHT: 'hard-light',
  SOFT_LIGHT: 'soft-light',
  DIFFERENCE: 'difference',
  EXCLUSION: 'exclusion',
  HUE: 'hue',
  SATURATION: 'saturation',
  COLOR: 'color',
  LUMINOSITY: 'luminosity',
} as const;

export type EBlendModes = typeof BlendModes[keyof typeof BlendModes];

export default BlendModes;
