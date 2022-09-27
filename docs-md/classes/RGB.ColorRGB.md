[coloroo](../README.md) / [Exports](../modules.md) / [RGB](../modules/RGB.md) / ColorRGB

# Class: ColorRGB

[RGB](../modules/RGB.md).ColorRGB

RGB Color-space. Holds each channel (red, green, blue, and alpha) as unit
floats. Each channel is clamped to 0..1 regardless of manipulations.

**`immutable`**

## Implements

- [`IColor`](../interfaces/RGB.IColor.md)

## Table of contents

### Constructors

- [constructor](RGB.ColorRGB.md#constructor)

### Properties

- [alpha](RGB.ColorRGB.md#alpha)
- [blue](RGB.ColorRGB.md#blue)
- [green](RGB.ColorRGB.md#green)
- [red](RGB.ColorRGB.md#red)
- [BLACK](RGB.ColorRGB.md#black)
- [Channels](RGB.ColorRGB.md#channels)
- [GRAY](RGB.ColorRGB.md#gray)
- [WHITE](RGB.ColorRGB.md#white)

### Accessors

- [alphaByte](RGB.ColorRGB.md#alphabyte)
- [blueByte](RGB.ColorRGB.md#bluebyte)
- [greenByte](RGB.ColorRGB.md#greenbyte)
- [redByte](RGB.ColorRGB.md#redbyte)

### Methods

- [contrast](RGB.ColorRGB.md#contrast)
- [contrastLevel](RGB.ColorRGB.md#contrastlevel)
- [darken](RGB.ColorRGB.md#darken)
- [desaturate](RGB.ColorRGB.md#desaturate)
- [get](RGB.ColorRGB.md#get)
- [grayscale](RGB.ColorRGB.md#grayscale)
- [invert](RGB.ColorRGB.md#invert)
- [isDark](RGB.ColorRGB.md#isdark)
- [isLight](RGB.ColorRGB.md#islight)
- [lerp](RGB.ColorRGB.md#lerp)
- [lighten](RGB.ColorRGB.md#lighten)
- [luminosity](RGB.ColorRGB.md#luminosity)
- [map](RGB.ColorRGB.md#map)
- [maxChannel](RGB.ColorRGB.md#maxchannel)
- [median](RGB.ColorRGB.md#median)
- [minChannel](RGB.ColorRGB.md#minchannel)
- [pickUsingContrast](RGB.ColorRGB.md#pickusingcontrast)
- [premultiplyAlpha](RGB.ColorRGB.md#premultiplyalpha)
- [set](RGB.ColorRGB.md#set)
- [setAlpha](RGB.ColorRGB.md#setalpha)
- [shade](RGB.ColorRGB.md#shade)
- [threshold](RGB.ColorRGB.md#threshold)
- [tint](RGB.ColorRGB.md#tint)
- [toArray](RGB.ColorRGB.md#toarray)
- [toFunctional](RGB.ColorRGB.md#tofunctional)
- [toHex](RGB.ColorRGB.md#tohex)
- [toInteger](RGB.ColorRGB.md#tointeger)
- [toObject](RGB.ColorRGB.md#toobject)
- [toRGB](RGB.ColorRGB.md#torgb)
- [toString](RGB.ColorRGB.md#tostring)
- [toYIQValue](RGB.ColorRGB.md#toyiqvalue)
- [tone](RGB.ColorRGB.md#tone)
- [apply](RGB.ColorRGB.md#apply)
- [ensureRGB](RGB.ColorRGB.md#ensurergb)
- [fromFunctional](RGB.ColorRGB.md#fromfunctional)
- [fromHex](RGB.ColorRGB.md#fromhex)
- [fromInteger](RGB.ColorRGB.md#frominteger)
- [fromRGB](RGB.ColorRGB.md#fromrgb)
- [fromString](RGB.ColorRGB.md#fromstring)

## Constructors

### constructor

• **new ColorRGB**(`_arg1?`, `_arg2?`, `_arg3?`, `_arg4?`)

Creates a new color in the RGB color-space.

Accepts variable amounts of arguments, and depending on the number,
dictates how the color will be created.

If only a single argument is supplied it is ran through type-checking
assertions, and depending on the type will perform one of the following:
- `number`: Will be treated as a 32-bit integer and use
[ColorRGB.fromInteger](RGB.ColorRGB.md#frominteger).
- `string`: Can be either a hexidecimal string (ex. "#FFAA88"), a
functional-notation string such that CSS4 accepts (ex.
`rgba(255, 127, 64)`), an X11 named color (ex. "gold"), or the keyword
"transparent" for a fully-transparent black color. Internally uses the
[ColorRGB.fromString](RGB.ColorRGB.md#fromstring) function.
- `array`: An array of RGB(A) component values, either as numbers, or as
strings that can be parsed into numbers (such as percentages, or the
"none" keyword). It does not need to contain all the channels, any missing
will be skipped and remain at their defaults. Internally uses the
[ColorRGB.apply](RGB.ColorRGB.md#apply) function.
- `ColorRGB`: Each component will be copied as-is.
- `IColor` or an object having `toRGB()`: Will use the `toRGB()` function
and copy each channel component as-is.
- `object`: Any object that has any of the following properties available:
  - `r` or `red`: Byte value for red channel
  - `g` or `green`: Byte value for green channel
  - `b` or `blue`: Byte value for blue channel
  - `a` or `alpha` or `opacity`: Unit number (0..1) for alpha channel

If multiple arguments are supplied they are treated as R, G, B, and A. If
all the values are numbers they are clamped to 0..1 and applied as they
are. Otherwise, mixed values use the [ColorRGB.apply](RGB.ColorRGB.md#apply) function.

Examples of usage:
```
new ColorRGB() // Default black color
new ColorRGB(1.0, 0.5, 0.25, 0.5) // Color from channels
new ColorRGB(0xFFAA88)   // Color from integer
new ColorRGB('gold')     // Color from X11 named color
new ColorRGB('#FFAA88')  // Color from hexidecimal string
new ColorRGB('rgb(255, 127, 64)')  // Color from functional-notation
new ColorRGB([1.0, 0.5, 0.25, 0.5])  // Color from array of numbers
new ColorRGB(['100%', '50%', 'none', '50%']) // Color from array of strings
new ColorRGB({ r: 255, g: 127, b: 64}) // Color from object
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `_arg1?` | `string` \| `number` \| (`string` \| `number`)[] \| [`IColor`](../interfaces/RGB.IColor.md) \| [`RGBObject`](../interfaces/RGB.RGBObject.md) |
| `_arg2?` | `string` \| `number` |
| `_arg3?` | `string` \| `number` |
| `_arg4?` | `string` \| `number` |

#### Defined in

[RGB.ts:472](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L472)

## Properties

### alpha

• `Readonly` **alpha**: `number` = `1.0`

The alpha channel, expressed as a unit float (0..1)

#### Implementation of

[IColor](../interfaces/RGB.IColor.md).[alpha](../interfaces/RGB.IColor.md#alpha)

#### Defined in

[RGB.ts:424](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L424)

___

### blue

• `Readonly` **blue**: `number` = `0.0`

The blue channel, expressed as a unit float (0..1)

**`readonly`**

#### Defined in

[RGB.ts:419](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L419)

___

### green

• `Readonly` **green**: `number` = `0.0`

The green channel, expressed as a unit float (0..1)

**`readonly`**

#### Defined in

[RGB.ts:412](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L412)

___

### red

• `Readonly` **red**: `number` = `0.0`

The red channel, expressed as a unit float (0..1)

**`readonly`**

#### Defined in

[RGB.ts:405](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L405)

___

### BLACK

▪ `Static` `Readonly` **BLACK**: [`ColorRGB`](RGB.ColorRGB.md)

Static reference for a pure-black color.

#### Defined in

[RGB.ts:388](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L388)

___

### Channels

▪ `Static` `Readonly` **Channels**: `Record`<`string`, `number`\>

#### Defined in

[RGB.ts:378](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L378)

___

### GRAY

▪ `Static` `Readonly` **GRAY**: [`ColorRGB`](RGB.ColorRGB.md)

Static reference for a mid-gray (50%) color.

#### Defined in

[RGB.ts:393](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L393)

___

### WHITE

▪ `Static` `Readonly` **WHITE**: [`ColorRGB`](RGB.ColorRGB.md)

Static reference for a pure-white color.

#### Defined in

[RGB.ts:398](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L398)

## Accessors

### alphaByte

• `get` **alphaByte**(): `number`

#### Returns

`number`

#### Defined in

[RGB.ts:592](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L592)

___

### blueByte

• `get` **blueByte**(): `number`

#### Returns

`number`

#### Defined in

[RGB.ts:588](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L588)

___

### greenByte

• `get` **greenByte**(): `number`

#### Returns

`number`

#### Defined in

[RGB.ts:584](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L584)

___

### redByte

• `get` **redByte**(): `number`

#### Returns

`number`

#### Defined in

[RGB.ts:580](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L580)

## Methods

### contrast

▸ **contrast**(`other`): `number`

Calculates the WCAG 2.0 Contrast value between this color and another.

**`see`** http://www.w3.org/TR/WCAG20/#contrast-ratiodef

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IColor`](../interfaces/RGB.IColor.md) | The other color to compare this with |

#### Returns

`number`

Numerical contrast value

#### Defined in

[RGB.ts:950](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L950)

___

### contrastLevel

▸ **contrastLevel**(`other`): `string`

Calculates the WCAG 2.0 Contrast level between this color and another.
Returned as a string to represent the "grade" the contrast ratio
represents.

Returned values:
- `"AAA"`: Ratios over-or-equal to 7.1
- `"AA"`: Ratios over-or-equal to 4.5
- `""`: Ratios under 4.5

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IColor`](../interfaces/RGB.IColor.md) | The other color to compare this with |

#### Returns

`string`

String value of either 'AAA', 'AA', or ''

#### Defined in

[RGB.ts:974](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L974)

___

### darken

▸ `Readonly` **darken**(`amount`): [`ColorRGB`](RGB.ColorRGB.md)

Darken this color and return a new color.

Alias for [ColorRGB.shade](RGB.ColorRGB.md#shade)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | fractional unit float (0..1) for how much to darken. |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:1076](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1076)

___

### desaturate

▸ **desaturate**(`frac?`): [`ColorRGB`](RGB.ColorRGB.md)

Converts this RGB color into a grayscale color using the "weighted" method.

**`see`** https://www.dynamsoft.com/blog/insights/image-processing/image-processing-101-color-space-conversion/

**`immutable`**

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `frac` | `number` | `1.0` |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:1143](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1143)

___

### get

▸ **get**(`index`): `number`

Returns the channel at the given index. The channels are in order as:

- 0: red
- 1: green
- 2: blue
- 3: alpha

For convienience [ColorRGB.Channels](RGB.ColorRGB.md#channels) contains an enum that maps this
directly.

If the index is out-of-range, then 0 is returned

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `index` | `number` | channel index |

#### Returns

`number`

channel value as unit float (0..1)

#### Defined in

[RGB.ts:768](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L768)

___

### grayscale

▸ **grayscale**(): [`ColorRGB`](RGB.ColorRGB.md)

Converts this RGB color into a grascale color using an "averaging" method
in which an average of each color is calculated and then applied for each
channel of a new color.

Alpha/opacity remains intact and is based on `this` colors alpha.

**`see`** [ColorRGB.desaturate](RGB.ColorRGB.md#desaturate) for a weighted method.

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:1161](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1161)

___

### invert

▸ **invert**(`alpha?`): [`ColorRGB`](RGB.ColorRGB.md)

Inverts this RGB colors values and returns a new color. Optionally will
invert the alpha as well.

**`immutable`**

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `alpha` | `boolean` | `false` | (default false) If true, the alpha will be inverted as well |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:1123](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1123)

___

### isDark

▸ **isDark**(): `boolean`

Performs a YIQ conversion using [ColorRGB.toYIQValue](RGB.ColorRGB.md#toyiqvalue) and then
compares the output to a "half-way" point to decide if the color is
considered "dark".

#### Returns

`boolean`

Boolean true if this color is considered "dark"

#### Defined in

[RGB.ts:1024](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1024)

___

### isLight

▸ **isLight**(): `boolean`

Performs a YIQ conversion using [ColorRGB.toYIQValue](RGB.ColorRGB.md#toyiqvalue) and then
compares the output to a "half-way" point to decide if the color is
considered "light".

#### Returns

`boolean`

Boolean true if this color is considered "light"

#### Defined in

[RGB.ts:1035](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1035)

___

### lerp

▸ **lerp**(`other`, `delta`): [`ColorRGB`](RGB.ColorRGB.md)

Linearly interpolates this RGB color, and an other IColor that can be
converted to RGB, given a `delta` weight.

**`immutable`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`IColor`](../interfaces/RGB.IColor.md) | Other color to interpolate to |
| `delta` | `number` | Unit float (0..1) weight between this and the other |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:1048](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1048)

___

### lighten

▸ `Readonly` **lighten**(`amount`): [`ColorRGB`](RGB.ColorRGB.md)

Lighten this color and return a new color.

Alias for [ColorRGB.tint](RGB.ColorRGB.md#tint)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `amount` | `number` | fractional unit float (0..1) for how much to lighten. |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:1099](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1099)

___

### luminosity

▸ **luminosity**(): `number`

Calculates the WCAG 2.0 Luminosity value of this color.

**`see`** https://www.w3.org/TR/WCAG20/#relativeluminancedef

#### Returns

`number`

Floating-point unit luminosity value

#### Defined in

[RGB.ts:931](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L931)

___

### map

▸ **map**(`chanCB`, `alphaCB?`): [`ColorRGB`](RGB.ColorRGB.md)

Map the channels of this current color into a new color using the
provided mapping callbacks.

Example:
```TypeScript
// Invert all the channels
const newColor = existingColor.map(
   (val:number) => (1 - val),      // Called on RGB
   (alpha:number) => (1 - alpha),  // Called on ALPHA only
);
```

**`immutable`**

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `chanCB` | [`ChannelMapCallback`](../modules/mapping.md#channelmapcallback)<[`IColor`](../interfaces/RGB.IColor.md)\> | `undefined` | Callback following the signature `(chan:number, index:number, color:ColorRGB) => number` which is called on each color channel (excluding alpha) to map a new value given the current value. |
| `alphaCB` | [`AlphaMapCallback`](../modules/mapping.md#alphamapcallback)<[`IColor`](../interfaces/RGB.IColor.md)\> | `NoOpMapCallback` | Callback following the signature `(alpha:number, color:ColorRGB) => number` which is called on the alpha component to map a new value using the current value. By default, this is a non-op that leaves the alpha un-touched. |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:842](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L842)

___

### maxChannel

▸ **maxChannel**(`withIndex?`): `number` \| [`number`, `number`]

Returns the maximum (largest) value within the RGB channels. Optionally
supports returning the channel index as well.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `withIndex` | `boolean` | `false` |

#### Returns

`number` \| [`number`, `number`]

Either a unit float (0..1) or a tuple depending on
the `withIndex` parameter.

#### Defined in

[RGB.ts:888](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L888)

___

### median

▸ **median**(): `number`

Calculates the median, or "middle" value between the lowest channel, and
the highest channel. This is the mid-point between where the minimum and
maximum values across the RGB channels is.

#### Returns

`number`

Median, or mid-point, between RGB channels.

#### Defined in

[RGB.ts:1173](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1173)

___

### minChannel

▸ **minChannel**(`withIndex?`): `number` \| [`number`, `number`]

Returns the minimum (smallest) value within the RGB channels. Optionally
supports returning the channel index as well.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `withIndex` | `boolean` | `false` |

#### Returns

`number` \| [`number`, `number`]

Either a unit float (0..1) or a tuple depending on
the `withIndex` parameter.

#### Defined in

[RGB.ts:862](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L862)

___

### pickUsingContrast

▸ **pickUsingContrast**(`options?`): [`ColorRGB`](RGB.ColorRGB.md)

Selects a color from the given array of colors that has the highest
contrast ratio with `this` color.

Inspired by the CSS Color Module 5 `color-contrast()` function. Consider
`this` to be the background color, and the supplied `options` to be options
for foreground.

If no argument is provided, or is an empty array, it will default to using
opaque black and white.

**`note`** alpha is not considered during contrast calculation

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options?` | [`IColor`](../interfaces/RGB.IColor.md)[] | Array of IColor color-space objects, each object will be converted to this color-space for comparison. If the array is not provided, or is empty, the colors black and white will be used instead |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:1002](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1002)

___

### premultiplyAlpha

▸ **premultiplyAlpha**(): [`ColorRGB`](RGB.ColorRGB.md)

Returns a new `ColorRGB` object with each of the RGB channels multiplied
with the alpha component of this color. The alpha channel returned is not
modified and is passed-through.

**`immutable`**

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:911](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L911)

___

### set

▸ **set**(...`channels`): [`ColorRGB`](RGB.ColorRGB.md)

Sets each channel of this color and returns a new ColorRGB object. Each
channel is mapped in order to variadic arguments: red, green, blue, alpha.
In the event a channel is provided `null` or `undefined` it will use the
same value present in `this` color. Additionally, any missing channels are
also considered null/undefined.

Channels can be provided unit float numbers (0..1), or a percentage string
such as "50%", or the "none" keyword implying 0.

**`immutable`**

#### Parameters

| Name | Type |
| :------ | :------ |
| `...channels` | (`string` \| `number`)[] |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:795](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L795)

___

### setAlpha

▸ **setAlpha**(`alpha`): [`ColorRGB`](RGB.ColorRGB.md)

Adjust the opacity.

Creates a new RGB color using the channels from `this` and sets a new alpha
using the one provided.

**`immutable`**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `alpha` | `number` | New alpha opacity, as a unit float (0..1). |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:814](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L814)

___

### shade

▸ **shade**(`frac`): [`ColorRGB`](RGB.ColorRGB.md)

Shade, or darken.

Creates a "shade" of this color by interpolating it with black by the given
fraction `delta`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frac` | `number` | Unit float (0..1) fraction for how much to shade the color. 0 results in none, 1 results in full black. |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

#### Defined in

[RGB.ts:1064](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1064)

___

### threshold

▸ **threshold**(`level`, `lowColor?`, `highColor?`): [`ColorRGB`](RGB.ColorRGB.md)

Performs a median-based thresholding of this color. Calculates the median
value using [ColorRGB.median](RGB.ColorRGB.md#median) and based on the results is compared
against the given `level` argument to return one of the provided colors.

If the median is <= `level` then the `lowColor` is returned.
If the median is > `level` then the `highColor` is returned.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `level` | `number` | `undefined` | Threshold level, as a unit float (0..1) |
| `lowColor` | [`ColorRGB`](RGB.ColorRGB.md) | `ColorRGB.BLACK` | Color to return if the value is equal-to or below the given level. Defaults to black. |
| `highColor` | [`ColorRGB`](RGB.ColorRGB.md) | `ColorRGB.WHITE` | Color to return if the value is over the given level. Defaults to white. |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:1194](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1194)

___

### tint

▸ **tint**(`frac`): [`ColorRGB`](RGB.ColorRGB.md)

Tint, or lighten.

Creates a "tint" of this color by interpolating it with white by the given
fraction `delta`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frac` | `number` | Unit float (0..1) fraction for how much to shade the color. 0 results in none, 1 results in full white. |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

#### Defined in

[RGB.ts:1087](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1087)

___

### toArray

▸ **toArray**(): [`RGBTuple`](../modules/RGB.md#rgbtuple)

Get the channels of this color as an array of values

#### Returns

[`RGBTuple`](../modules/RGB.md#rgbtuple)

#### Implementation of

[IColor](../interfaces/RGB.IColor.md).[toArray](../interfaces/RGB.IColor.md#toarray)

#### Defined in

[RGB.ts:600](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L600)

___

### toFunctional

▸ **toFunctional**(`forceAlpha?`, `whole?`): `string`

Converts this RGB Color into it's functional-notation string, as if it was
being used with CSS. Because the channels are internally held as unit
floats, the resulting string will use percentages. It can optionally
truncate the channels to whole percentages using the `whole` flag.

By default the alpha information is only included if the alpha value is
not 1.0, or the `forceAlpha` flag is true (defaults to false). Additionally
it is truncated to 4 points of precision.

The output follows this format:
```
rgb(100%, 50%, 25%)
rgba(100%, 50%, 25%, 0.75)
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `forceAlpha` | `boolean` | `false` |
| `whole` | `boolean` | `false` |

#### Returns

`string`

Functional-notation string

#### Implementation of

[IColor](../interfaces/RGB.IColor.md).[toFunctional](../interfaces/RGB.IColor.md#tofunctional)

#### Defined in

[RGB.ts:741](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L741)

___

### toHex

▸ **toHex**(`forceAlpha?`, `alphaMSB?`): `string`

Converts this RGB Color into it's hexidecimal string representation. Note
that this is a lossy conversion considering the channels are internally
represented as unit floats (0..1), and this operation converts them into
byte integers.

By default the alpha information is only included if the alpha value is
not 1.0, or the `forceAlpha` flag is true (defaults to false). For
serialization of colors it may be best to have this flag as true and
manage the alpha channels byte position with the `alphaMSB` flag for more
consistant byte arrangement.

Additionally the `alphaMSB` switch can be used to move the alpha
information to the Most Significant Byte portion of the integer. Otherwise
(default) it remains as the Least Significant Byte.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `forceAlpha` | `boolean` | `false` |
| `alphaMSB` | `boolean` | `false` |

#### Returns

`string`

Hexidecimal string representation

#### Defined in

[RGB.ts:695](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L695)

___

### toInteger

▸ **toInteger**(`forceAlpha?`, `alphaMSB?`): `number`

Converts this RGB Color into it's integer representation. Note that this is
a lossy conversion considering the channels are internally represented as
unit floats (0..1), and this operation converts them into byte integers.

By default the alpha information is only included if the alpha value is
not 1.0, or the `forceAlpha` flag is true (defaults to false). For
serialization of colors it may be best to have this flag as true and
manage the alpha channels byte position with the `alphaMSB` flag for more
consistant byte arrangement.

Additionally the `alphaMSB` switch can be used to move the alpha
information to the Most Significant Byte portion of the integer. Otherwise
(default) it remains as the Least Significant Byte.

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `forceAlpha` | `boolean` | `false` |
| `alphaMSB` | `boolean` | `false` |

#### Returns

`number`

Integer number representation of the color.

#### Defined in

[RGB.ts:655](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L655)

___

### toObject

▸ **toObject**(): [`RGBObject`](../interfaces/RGB.RGBObject.md)

Get an object (JSON acceptable) representation of this color

#### Returns

[`RGBObject`](../interfaces/RGB.RGBObject.md)

#### Implementation of

[IColor](../interfaces/RGB.IColor.md).[toObject](../interfaces/RGB.IColor.md#toobject)

#### Defined in

[RGB.ts:609](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L609)

___

### toRGB

▸ **toRGB**(): [`ColorRGB`](RGB.ColorRGB.md)

Returns a copy of this color.

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

New ColorRGB object

#### Implementation of

[IColor](../interfaces/RGB.IColor.md).[toRGB](../interfaces/RGB.IColor.md#torgb)

#### Defined in

[RGB.ts:627](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L627)

___

### toString

▸ **toString**(): `string`

Convert the color to a string representation. In general this results in a
CSS3 compatible functional-notation string.

#### Returns

`string`

#### Implementation of

[IColor](../interfaces/RGB.IColor.md).[toString](../interfaces/RGB.IColor.md#tostring)

#### Defined in

[RGB.ts:596](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L596)

___

### toYIQValue

▸ **toYIQValue**(): `number`

Calculates the YIQ-color encoding value for this color

**`see`** https://24ways.org/2010/calculating-color-contrast

#### Returns

`number`

YIQ value

#### Defined in

[RGB.ts:921](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L921)

___

### tone

▸ **tone**(`frac`): [`ColorRGB`](RGB.ColorRGB.md)

Tone, or saturate.

Creates a "tone" of this color by interpolating it with gray by the given
fraction `delta`. The gray is 50% gray, and not the grayscale calculation
of this color. For that, see [ColorRGB.desaturate](RGB.ColorRGB.md#desaturate)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `frac` | `number` | Unit float (0..1) fraction for how much to shade the color. 0 results in completely gray, 1 results in original color. |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

#### Defined in

[RGB.ts:1111](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L1111)

___

### apply

▸ `Static` **apply**(...`components`): [`ColorRGB`](RGB.ColorRGB.md)

Sets the components of a new ColorRGB using variable arguments. The order
of the variables is taken as `apply(R, G, B, A)`. Any missing components
are skipped and will remain their defaults.

This will parse string values to the best of it's ability. This includes
parameter detection, and then treatment depending on the type.

If given a percentage string such as "50%", it will be converted into it's
unit representation. Numeric values are treaded as unit floats (0..1) and
will be clamped as such

#### Parameters

| Name | Type |
| :------ | :------ |
| `...components` | (`string` \| `number`)[] |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:343](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L343)

___

### ensureRGB

▸ `Static` `Private` **ensureRGB**(`clr`): [`ColorRGB`](RGB.ColorRGB.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `clr` | `any` |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

#### Defined in

[RGB.ts:86](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L86)

___

### fromFunctional

▸ `Static` **fromFunctional**(`str`): [`ColorRGB`](RGB.ColorRGB.md)

Parses the input string as a CSS3+ functional-notation color value. Only
accepts the `rgb()` and `rgba()` functions. Both the comma-separated and
space-separated formats are accepted. If the space-separated version is
used with an alpha channel, then a forward-slash delimiter is required
before the alpha channel. It will convert numeric formats in integer,
fractional, and scientific notation. As well as supporting percentages, and
the new "none" keyword for CSS4 (just implies 0). There is some forgiveness
on the formatting since it's regular-expression based. Things like mixed
formats between space/comma separated and such. Additionally, according to
the CSS4 spec, the `rgb()` version can still accept an alpha channel.
Either way, at least 3 components are required for at least RGB.

Example formats accepted.
```
rgb(255, 127, 64)
rgb(255 127 64)
rgb(255, 127, 64, 0.5)
rgb(255 127 64 / 0.5)
rgba(100%, 50%, 25%)
rgba(100% 50% 25% / 50%)
```

**`throws`** {TypeError} if the string cannot be parsed

**`throws`** {TypeError} if the number of components is invalid

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | Input string to parse |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:237](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L237)

___

### fromHex

▸ `Static` **fromHex**(`str`): [`ColorRGB`](RGB.ColorRGB.md)

Parses the incoming string as a hexidecimal notation RGB(A) color. This is
case-insensitive, and the prefix "#" is optional. Accepts the following
formats:

- `#FA0`: Short-form, half-byte values for each channel RGB. Will be
resized to the full-byte size 0..255.
- `#FA08`: Short-form, half-byte values for the RGB and Alpha channels.
Will be resized to the full-byte size 0..255.
- `#FFAA00`: Long-form, byte values for the RGB channels.
- `#FFAA0088`: Long-form, byte values for the RGB and Alpha channels.

**`throws`** {TypeError} If the string is not parsable as a hex value

**`throws`** {TypeError} If the string has too many or too little

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | Input string to parse |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:166](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L166)

___

### fromInteger

▸ `Static` **fromInteger**(`value`, `useAlpha?`, `alphaMSB?`): [`ColorRGB`](RGB.ColorRGB.md)

Converts an incoming integer number into it's RGB(A) channel values and
returns an appropriate ColorRGB object

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | Incoming integer number to convert |
| `useAlpha` | `boolean` | `false` | If true, then an alpha component is present on this value, and will be parsed appropriately. Default is `false`. |
| `alphaMSB` | `boolean` | `false` | When `useAlpha` is true, this flag sets whether the alpha component is in the Most-Significant-Byte, or the Least-Significant-Byte. Default is to treat alpha as the LSB. |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:120](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L120)

___

### fromRGB

▸ `Static` **fromRGB**(`rgb`): [`IColor`](../interfaces/RGB.IColor.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `rgb` | [`ColorRGB`](RGB.ColorRGB.md) |

#### Returns

[`IColor`](../interfaces/RGB.IColor.md)

#### Defined in

[RGB.ts:104](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L104)

___

### fromString

▸ `Static` **fromString**(`str`): [`ColorRGB`](RGB.ColorRGB.md)

Converts an incoming string to acceptable components and sets the channels
of a new ColorRGB object. Will attempt to parse as each format in order
until one does not give an error. If none of the processes work then a
`TypeError` is thrown specifying so.

Accepts the following formats with their specifications:

### Named Colors (X11)
Checks if the input string is a valid X11 color name as specified in the
CSS4 color module. If there is a match, it is converted to hexidecimal and
then processed.

The special named color "transparent" is accepted and will result in black
with an alpha of 0 (fully transparent).

### Hexidecimal
Uses the [ColorRGB.fromHex](RGB.ColorRGB.md#fromhex) method to parse as a hexidecimal
string. This is case insensitive and accepts shortform and longform hex
strings, with or without alpha channel. As with most hex strings if there
is an alpha component it is the least-significant byte. Additionally, the
prefix "#" is optional as well.

- `#FA0`: Short-form, half-byte values for each channel RGB. Will be
resized to the full-byte size 0..255.
- `#FA08`: Short-form, half-byte values for the RGB and Alpha channels.
Will be resized to the full-byte size 0..255.
- `#FFAA00`: Long-form, byte values for the RGB channels.
- `#FFAA0088`: Long-form, byte values for the RGB and Alpha channels.

### Functional-notation
Uses the [ColorRGB.fromFunctional](RGB.ColorRGB.md#fromfunctional) method to parse as a
functional notation string in the style of CSS4, with some forgiveness.
Will accept either 3-component for RGB, or 4-component for RGBA. Each
parameter can be either an integer, float, or percentage value which will
be converted as appropriate for the channel.

Example formats accepted.
```
rgb(255, 127, 64)
rgb(255 127 64)
rgb(255, 127, 64, 0.5)
rgb(255 127 64 / 0.5)
rgba(100%, 50%, 25%)
rgba(100% 50% 25% / 50%)

rgb(200.5, 1.27e2, +64 / .5)
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `str` | `string` | Input string |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

new ColorRGB object

#### Defined in

[RGB.ts:301](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L301)
