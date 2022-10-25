import IColor from './IColor';
import ColorRGB from './RGB';
import { StringEnum } from './utils/types';

/**
 * Enumerations for Porter-Duff compositing of two colors.
 */
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

/**
 * Enumeration for Porter-Duff compositing of two colors.
 */
export type ECompositeOperator = typeof CompositeOperators[keyof typeof CompositeOperators];

/**
 * Enumerations for blending of two colors. Sometimes refered to as
 * "alpha blending".
 */
export const BlendModes:StringEnum = {
  NORMAL: 'normal',
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

/**
 * Enumeration for blending of two colors. Sometimes refered to as
 * "alpha blending".
 */
export type EBlendMode = typeof BlendModes[keyof typeof BlendModes];

/**
 * Defines the operation for handling the alpha channel when blending or
 * compositing two colors.
 */
export const AlphaBlendOperation:StringEnum = {
  /**
   * Each channel of the colors is multiplied by the alpha component before
   * blending.
   */
  PREMULTIPLY: 'premultiply',

  /**
   * The alpha channels of the colors being blended are linearly-interpolated
   * to generate the output opacity.
   */
  LINEAR: 'linear',

  /**
   * The alpha of the source (or foreground) color is used for the output color
   */
  SOURCE: 'source',

  /**
   * The alpha of the destination (or background) color is used for the output
   * color.
   */
  DESTINATION: 'destination',

  /**
   * Alpha is excluded from the operation and a fully opaque color is output.
   */
  EXCLUDE: 'exclude',
} as const;

/**
 * Defines the operation for handling the alpha channel when blending or
 * compositing two colors.
 */
export type EAlphaBlendOperation = typeof AlphaBlendOperation[keyof typeof AlphaBlendOperation];

/**
 * 
 * @param source Source color, will be converted to sRGB if not already.
 * @param destination Destination color, will be converted to sRGB if not
 * already.
 * @param alphaOp The operation dictating how to handle the alpha channel.
 * @returns attempts to return a new color object in the same space as the
 * source and destination, or a {@link ColorRGB} object otherwise.
 */
export function composite(source:IColor, destination:IColor, alphaOp:EAlphaBlendOperation):IColor {

}

export function blendNormal(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  
}

export function blendMultiply(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => chan * bg.get(index));
}

export function blendScreen(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => (
    1.0 - ((1.0 - chan) * (1.0 - bg.get(index)))
  ));
}

export function blendOverlay(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => {
    if(bg.get(index) < 0.5)
      return (chan * bg.get(index)) * 2.0;
    return 1.0 - (2.0 * ((1.0 - chan) * (1.0 - bg.get(index))));
  });
}

export function blendDarken(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => Math.min(chan, bg.get(index)));
}

export function blendLighten(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => Math.max(chan, bg.get(index)));
}

export function blendColorDodge(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => (
    bg.get(index) / (1.0 - chan)
  ));
}

export function blendColorBurn(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => (
    1.0 - ((1.0 - bg.get(index)) / chan)
  ));
}

export function blendHardLight(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => {
    if(chan < 0.5)
      return (chan * bg.get(index)) * 2.0;
    return 1.0 - (2.0 * ((1.0 - chan) * (1.0 - bg.get(index))));
  });
}

export function blendSoftLight(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => {
    if(chan < 0.5) {
      return bg.get(index) - ((1.0 - (chan * 2.0)) * (bg.get(index) * (1.0 - bg.get(index))));
    } else if(bg.get(index) < 0.25) {
      // eslint-disable-next-line max-len
      return bg.get(index) + (((chan * 2) - 1.0) * (bg.get(index) * (((16.0 * bg.get(index)) + 3.0) * (bg.get(index) + 3.0))));
    }

    return bg.get(index) + (((chan * 2.0) - 1.0) * (Math.sqrt(bg.get(index)) - bg.get(index)));
  });
}

export function blendDifference(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => Math.abs(bg.get(index) - chan));
}

export function blendExclusion(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  const bg:ColorRGB = background.toRGB();
  const fg:ColorRGB = foreground.toRGB();
  return fg.map((chan, index) => (
    (chan + bg.get(index)) - (2.0 * (chan * bg.get(index)))
  ));
}

export function blendHue(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  
}

export function blendSaturation(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  
}

export function blendColor(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  
}

export function blendLuminosity(
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  
}

/**
 * Blends two colors together to produce a new color.
 * 
 * @param mode Desired blend-mode as an enumeration.
 * @param background Background color, will be converted to sRGB if the
 * blend-mode requires it, some blend-modes will use HSL instead.
 * @param foreground Foreground color, will be converted to sRGB if the
 * blend-mode requires it, some blend-modes will use HSL instead.
 * @param alphaOp Operation dictating how to handle the alpha channel.
 * By default this is "linear" in which the alpha channels are
 * linearly-interpolated.
 * @returns New color object. Will attempt to use the same color space if both
 * given colors match, otherwise a {@link ColorRGB} object is returned.
 */
 export function blend(
  mode:EBlendMode,
  background:IColor,
  foreground:IColor,
  alphaOp:EAlphaBlendOperation = AlphaBlendOperation.LINEAR,
):IColor {
  switch(mode) {
    case BlendModes.MULTIPLY:
      return blendMultiply(background, foreground, alphaOp);
    case BlendModes.SCREEN:
      return blendScreen(background, foreground, alphaOp);
    case BlendModes.OVERLAY:
      return blendMultiply(background, foreground, alphaOp);
    case BlendModes.DARKEN:
      return blendDarken(background, foreground, alphaOp);
    case BlendModes.LIGHTEN:
      return blendLighten(background, foreground, alphaOp);
    case BlendModes.COLOR_DODGE:
      return blendColorDodge(background, foreground, alphaOp);
    case BlendModes.COLOR_BURN:
      return blendColorBurn(background, foreground, alphaOp);
    case BlendModes.HARD_LIGHT:
      return blendHardLight(background, foreground, alphaOp);
    case BlendModes.SOFT_LIGHT:
      return blendSoftLight(background, foreground, alphaOp);
    case BlendModes.DIFFERENCE:
      return blendDifference(background, foreground, alphaOp);
    case BlendModes.EXCLUSION:
      return blendExclusion(background, foreground, alphaOp);
    case BlendModes.HUE:
      return blendHue(background, foreground, alphaOp);
    case BlendModes.SATURATION:
      return blendSaturation(background, foreground, alphaOp);
    case BlendModes.COLOR:
      return blendColor(background, foreground, alphaOp);
    case BlendModes.LUMINOSITY:
      return blendLuminosity(background, foreground, alphaOp);
    default:
      return blendNormal(background, foreground, alphaOp);
  }
}
