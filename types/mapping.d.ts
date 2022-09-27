/**
 * Copyright © 2021 Chris Pikul.
 *
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 *
 * Provides TypeScript types and generic functions for mapping functionality.
 */
import type { IColor } from './IColor';
/**
 * Any callback that takes a numerical value and is expected to return a new
 * value.
 */
export declare type ValueMapCallback = (value: number) => number;
/**
 * Callback used when mapping channels of a color.
 *
 * This callback is provided the current channel value, the index of the
 * channel, and the original color object specifying the channels.
 */
export declare type ChannelMapCallback<T extends IColor = IColor> = (chan: number, index: number, clr: T) => number;
/**
 * Callback used when mapping the alpha of a color. This is separated from
 * ChannelMapCallback to ease confusion on which index is the alpha, and
 * because generally channel mapping happens independantly of the opacity.
 *
 * It is provided the current alpha value as a unit float (0..1), and the
 * original color object.
 */
export declare type AlphaMapCallback<T extends IColor = IColor> = (alpha: number, clr: T) => number;
export declare const NoOpMapCallback: ValueMapCallback;
