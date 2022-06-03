[coloroo](../README.md) / [Exports](../modules.md) / [RGB](../modules/RGB.md) / ColorRGB

# Class: ColorRGB

[RGB](../modules/RGB.md).ColorRGB

RGB with Alpha color-space. The red, green, and blue channels are 8-bit
bytes (0..255) and will round/truncate on manipulation.

## Implements

- [`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

## Table of contents

### Constructors

- [constructor](RGB.ColorRGB.md#constructor)

### Properties

- [#alpha](RGB.ColorRGB.md##alpha)
- [#rgb](RGB.ColorRGB.md##rgb)
- [Formats](RGB.ColorRGB.md#formats)

### Accessors

- [alpha](RGB.ColorRGB.md#alpha)
- [blue](RGB.ColorRGB.md#blue)
- [green](RGB.ColorRGB.md#green)
- [red](RGB.ColorRGB.md#red)

### Methods

- [blueUnit](RGB.ColorRGB.md#blueunit)
- [contrast](RGB.ColorRGB.md#contrast)
- [contrastLevel](RGB.ColorRGB.md#contrastlevel)
- [desaturate](RGB.ColorRGB.md#desaturate)
- [fromArray](RGB.ColorRGB.md#fromarray)
- [fromFuncString](RGB.ColorRGB.md#fromfuncstring)
- [fromHexString](RGB.ColorRGB.md#fromhexstring)
- [fromInteger](RGB.ColorRGB.md#frominteger)
- [fromObject](RGB.ColorRGB.md#fromobject)
- [fromString](RGB.ColorRGB.md#fromstring)
- [greenUnit](RGB.ColorRGB.md#greenunit)
- [invert](RGB.ColorRGB.md#invert)
- [isDark](RGB.ColorRGB.md#isdark)
- [isLight](RGB.ColorRGB.md#islight)
- [lerp](RGB.ColorRGB.md#lerp)
- [luminosity](RGB.ColorRGB.md#luminosity)
- [parse](RGB.ColorRGB.md#parse)
- [redUnit](RGB.ColorRGB.md#redunit)
- [set](RGB.ColorRGB.md#set)
- [setAlpha](RGB.ColorRGB.md#setalpha)
- [setBlue](RGB.ColorRGB.md#setblue)
- [setBlueUnit](RGB.ColorRGB.md#setblueunit)
- [setGreen](RGB.ColorRGB.md#setgreen)
- [setGreenUnit](RGB.ColorRGB.md#setgreenunit)
- [setRed](RGB.ColorRGB.md#setred)
- [setRedUnit](RGB.ColorRGB.md#setredunit)
- [setUnits](RGB.ColorRGB.md#setunits)
- [toArray](RGB.ColorRGB.md#toarray)
- [toFuncString](RGB.ColorRGB.md#tofuncstring)
- [toHexString](RGB.ColorRGB.md#tohexstring)
- [toInteger](RGB.ColorRGB.md#tointeger)
- [toString](RGB.ColorRGB.md#tostring)
- [toUnitArray](RGB.ColorRGB.md#tounitarray)
- [toYIQValue](RGB.ColorRGB.md#toyiqvalue)

## Constructors

### constructor

• **new ColorRGB**(`_arg1?`, `_argG?`, `_argB?`, `_argA?`)

Creates a new Color in the RGB color-space.

Accepts variable amounts of arguments, and depending on the number,
dictates how the color will be created.

If only a single argument is supplied it is ran through the
[ColorRGB.parse](RGB.ColorRGB.md#parse) method. If an error occurs during parsing, this
constructor will throw an `Error`. The following value types are accepted:

- `number`: Will be treated as a 32-bit integer.
- `string`: Can be either a hexidecimal string (ex. "#FFAA88"), a
functional-notation string such that CSS4 accepts (ex.
`rgba(255, 127, 64)`), an X11 named color (ex. "gold"), or the keyword
"transparent" for a fully-transparent black color.
- `array`: An array of RGB(A) component values, either as numbers, or as
strings that can be parsed into numbers (such as percentages, or the
"none" keyword). It does not need to contain all the channels, any missing
will be skipped and remain at their defaults.
- `object`: Any object that has any of the following properties available:
  - `r` or `red`: Byte value for red channel
  - `g` or `green`: Byte value for green channel
  - `b` or `blue`: Byte value for blue channel
  - `a` or `alpha` or `opacity`: Unit number (0..1) for alpha channel

If multiple arguments are supplied they are treated as R, G, B, and A;
exactly as the [ColorRGB.set](RGB.ColorRGB.md#set) method does (as they are passed
directly to it). Since `set()` does not throw errors, any issues in
parsing are quietly ignored and will default to 0.

Examples of usage:
```
new ColorRGB() // Default black color
new ColorRGB(255, 127, 64, 0.5) // Color from channels
new ColorRGB(0xFFAA88)   // Color from integer
new ColorRGB('gold')     // Color from X11 named color
new ColorRGB('#FFAA88')  // Color from hexidecimal string
new ColorRGB('rgb(255, 127, 64)')  // Color from functional-notation
new ColorRGB([255, 127, 64, 0.5])  // Color from array of numbers
new ColorRGB(['100%', '50%', 'none', '50%']) // Color from array of strings
new ColorRGB({ r: 255, g: 127, b: 64}) // Color from object
```

#### Parameters

| Name | Type |
| :------ | :------ |
| `_arg1?` | `string` \| `number` \| `Record`<`any`, `any`\> \| [`ColorRGB`](RGB.ColorRGB.md) \| (`string` \| `number`)[] |
| `_argG?` | `string` \| `number` |
| `_argB?` | `string` \| `number` |
| `_argA?` | `string` \| `number` |

#### Defined in

[RGB.ts:148](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L148)

## Properties

### #alpha

• `Private` **#alpha**: `number` = `1.0`

The alpha (opacity) of the color, clamped to a unit number 0..1 by the
public getter/setters.

#### Defined in

[RGB.ts:103](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L103)

___

### #rgb

• `Private` **#rgb**: [`RGBTuple`](../modules/RGB.md#rgbtuple)

Holds the RGB components as an tuple array

#### Defined in

[RGB.ts:93](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L93)

___

### Formats

▪ `Static` `Readonly` **Formats**: [`StringEnum`](../interfaces/utils_types.StringEnum.md) = `RGBFormat`

The accepted string formats for generating strings.

#### Defined in

[RGB.ts:88](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L88)

## Accessors

### alpha

• `get` **alpha**(): `number`

The alpha, or opacity, of the color as a unit (0..1) float

#### Returns

`number`

#### Defined in

[RGB.ts:239](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L239)

• `set` **alpha**(`value`): `void`

The alpha, or opacity, of the color as a unit (0..1) float

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`void`

#### Defined in

[RGB.ts:243](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L243)

___

### blue

• `get` **blue**(): `number`

The blue component as a byte (0..255) integer

#### Returns

`number`

#### Defined in

[RGB.ts:228](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L228)

• `set` **blue**(`byteValue`): `void`

The blue component as a byte (0..255) integer

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteValue` | `number` |

#### Returns

`void`

#### Defined in

[RGB.ts:232](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L232)

___

### green

• `get` **green**(): `number`

The green component as a byte (0..255) integer

#### Returns

`number`

#### Defined in

[RGB.ts:217](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L217)

• `set` **green**(`byteValue`): `void`

The green component as a byte (0..255) integer

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteValue` | `number` |

#### Returns

`void`

#### Defined in

[RGB.ts:221](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L221)

___

### red

• `get` **red**(): `number`

The red component as a byte (0..255) integer

#### Returns

`number`

#### Defined in

[RGB.ts:206](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L206)

• `set` **red**(`byteValue`): `void`

The red component as a byte (0..255) integer

#### Parameters

| Name | Type |
| :------ | :------ |
| `byteValue` | `number` |

#### Returns

`void`

#### Defined in

[RGB.ts:210](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L210)

## Methods

### blueUnit

▸ **blueUnit**(): `number`

Gets the blue component as a unit

#### Returns

`number`

Unit value (0..1)

#### Defined in

[RGB.ts:266](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L266)

___

### contrast

▸ **contrast**(`other`): `number`

Calculates the WCAG 2.0 Contrast value between this color and another.

**`see`** http://www.w3.org/TR/WCAG20/#contrast-ratiodef

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`ColorRGB`](RGB.ColorRGB.md) | The other color to compare this with |

#### Returns

`number`

Numerical contrast value

#### Defined in

[RGB.ts:920](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L920)

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
| `other` | [`ColorRGB`](RGB.ColorRGB.md) | The other color to compare this with |

#### Returns

`string`

String value of either 'AAA', 'AA', or ''

#### Defined in

[RGB.ts:942](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L942)

___

### desaturate

▸ **desaturate**(): [`ColorRGB`](RGB.ColorRGB.md)

__Immutable__

Converts this RGB color into a grayscale color using the "Weighted" method.

**`see`** https://www.dynamsoft.com/blog/insights/image-processing/image-processing-101-color-space-conversion/

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

New ColorRGB object

#### Defined in

[RGB.ts:1001](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L1001)

___

### fromArray

▸ **fromArray**(`arr`): [`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

Sets the components of this `ColorRGB` given an array. This is supplied
for clarity of API, but really just shortcuts to spread operating the
array into the `ColorRGB.set()` function.

Accepts both strings and numbers. Strings will attempt to be converted
based on whatever type the value can be detected as.

**`see`** [ColorRGB.set](RGB.ColorRGB.md#set) for the underlying functionality.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arr` | (`string` \| `number`)[] | Input array |

#### Returns

[`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

`this` for method-chaining

#### Implementation of

[IColorClass](../interfaces/IColorClass.IColorClass-1.md).[fromArray](../interfaces/IColorClass.IColorClass-1.md#fromarray)

#### Defined in

[RGB.ts:834](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L834)

___

### fromFuncString

▸ **fromFuncString**(`str`): [`ColorRGB`](RGB.ColorRGB.md)

Parses the input string as a CSS4 functional-notation color value. Only
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

`this` for method-chaining

#### Defined in

[RGB.ts:722](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L722)

___

### fromHexString

▸ **fromHexString**(`str`): [`ColorRGB`](RGB.ColorRGB.md)

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

`this` for method-chaining

#### Defined in

[RGB.ts:657](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L657)

___

### fromInteger

▸ **fromInteger**(`value`, `useAlpha?`, `alphaMSB?`): [`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

Converts an incoming integer number into it's RGB(A) channel values and
sets this `ColorRGB` components appropriately.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `value` | `number` | `undefined` | Incoming integer number to convert |
| `useAlpha` | `boolean` | `false` | If true, then an alpha component is present on this value, and will be parsed appropriately. Default is `false`. |
| `alphaMSB` | `boolean` | `false` | When `useAlpha` is true, this flag sets whether the alpha component is in the Most-Significant-Byte, or the Least-Significant-Byte. Default is to treat alpha as the LSB. |

#### Returns

[`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

`this` for method-chaining

#### Implementation of

[IColorClass](../interfaces/IColorClass.IColorClass-1.md).[fromInteger](../interfaces/IColorClass.IColorClass-1.md#frominteger)

#### Defined in

[RGB.ts:611](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L611)

___

### fromObject

▸ **fromObject**(`obj`): [`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

Attempts to set the components of this `ColorRGB` given potential
properties of the supplied object. Any missing components will default to
0, except for alpha which defaults to 1 (opaque).

Each color searches for a single-letter property, or the full-word name.
- Red: `obj.r` OR `obj.red` OR 0
- Green: `obj.g` OR `obj.green` OR 0
- Blue: `obj.b` OR `obj.blue` OR 0
- Alpha: `obj.a` OR `obj.alpha` OR obj.opacity OR 1

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `obj` | `Record`<`any`, `any`\> | Plain JS object |

#### Returns

[`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

`this` for method-chaining

#### Implementation of

[IColorClass](../interfaces/IColorClass.IColorClass-1.md).[fromObject](../interfaces/IColorClass.IColorClass-1.md#fromobject)

#### Defined in

[RGB.ts:852](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L852)

___

### fromString

▸ **fromString**(`str`): [`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

Converts an incoming string to acceptable components and sets the channels
of this ColorRGB object. Will attempt to parse as each format in order
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
Uses the [ColorRGB.fromHexString](RGB.ColorRGB.md#fromhexstring) method to parse as a hexidecimal
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
Uses the [ColorRGB.fromFuncString](RGB.ColorRGB.md#fromfuncstring) method to parse as a
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

[`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

`this` for method-chaining

#### Implementation of

[IColorClass](../interfaces/IColorClass.IColorClass-1.md).[fromString](../interfaces/IColorClass.IColorClass-1.md#fromstring)

#### Defined in

[RGB.ts:786](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L786)

___

### greenUnit

▸ **greenUnit**(): `number`

Gets the green component as a unit

#### Returns

`number`

Unit value (0..1)

#### Defined in

[RGB.ts:259](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L259)

___

### invert

▸ **invert**(`alpha?`): [`ColorRGB`](RGB.ColorRGB.md)

__Immutable__

Inverts this RGB colors values and returns a new color. Optionally will
invert the alpha as well.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `alpha` | `boolean` | `false` | (default false) If true, the alpha will be inverted as well |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

New ColorRGB object

#### Defined in

[RGB.ts:983](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L983)

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

[RGB.ts:959](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L959)

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

[RGB.ts:970](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L970)

___

### lerp

▸ **lerp**(`other`, `delta`): [`ColorRGB`](RGB.ColorRGB.md)

__Immutable__

Linearly interpolates this RGB color, and an other RGB color, given a
delta weight.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `other` | [`ColorRGB`](RGB.ColorRGB.md) | Other color to interpolate to |
| `delta` | `number` | Unit (0..1) weight between this and the other |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

New ColorRGB object

#### Defined in

[RGB.ts:1018](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L1018)

___

### luminosity

▸ **luminosity**(): `number`

Calculates the WCAG 2.0 Luminosity value of this color.

**`see`** https://www.w3.org/TR/WCAG20/#relativeluminancedef

#### Returns

`number`

Floating-point unit luminosity value

#### Defined in

[RGB.ts:901](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L901)

___

### parse

▸ **parse**(`arg`): [`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

Attempts to parse the incoming parameter as a ColorRGB object and sets the
appropriate channels when found. Any missing components will use their
defaults, which for RGB is 0.0, and for Alpha is 1.0.

Any failure to parse the object will throw an `Error` object. If a null,
or undefined object is supplied it will be quietly skipped.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arg` | `any` | The argument to attempt to parse. |

#### Returns

[`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

`this` for method-chaining

#### Implementation of

[IColorClass](../interfaces/IColorClass.IColorClass-1.md).[parse](../interfaces/IColorClass.IColorClass-1.md#parse)

#### Defined in

[RGB.ts:872](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L872)

___

### redUnit

▸ **redUnit**(): `number`

Gets the red component as a unit

#### Returns

`number`

Unit value (0..1)

#### Defined in

[RGB.ts:252](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L252)

___

### set

▸ **set**(...`components`): [`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

Sets the components of this RGB Color using variable arguments. The order
of the variables is taken as `set(R, G, B, A)`. Any missing components are
skipped.

This will parse string values to the best of it's ability. This includes
parameter detection, and then treatment depending on the type.

For the RGB components the following formats are accepted
- Integer 0..255 = mapped directly to the component
- Float 0..255 = truncates the decimal point and applied
- Percentage 0..100% = applies to the range 0..255 and set.

For the alpha component, any value given is clamped to a unit 0..1. For
floats and percentages this is straight forward, for integers it just
becomes an on/off of 0 or 1. In other words, no byte conversion is made.

#### Parameters

| Name | Type |
| :------ | :------ |
| `...components` | (`string` \| `number`)[] |

#### Returns

[`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

`this` for method-chaining

#### Implementation of

[IColorClass](../interfaces/IColorClass.IColorClass-1.md).[set](../interfaces/IColorClass.IColorClass-1.md#set)

#### Defined in

[RGB.ts:468](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L468)

___

### setAlpha

▸ **setAlpha**(`unit`): [`ColorRGB`](RGB.ColorRGB.md)

Sets the alpha component of this RGB color with a unit value (0..1)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unit` | `number` | Unit value (0..1) |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

`this` for method-chaining

#### Defined in

[RGB.ts:594](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L594)

___

### setBlue

▸ **setBlue**(`byte`): [`ColorRGB`](RGB.ColorRGB.md)

Sets the green component of this RGB color with a byte value (0..255)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `byte` | `number` | Byte value (0..255) |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

`this` for method-chaining

#### Defined in

[RGB.ts:572](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L572)

___

### setBlueUnit

▸ **setBlueUnit**(`unit`): [`ColorRGB`](RGB.ColorRGB.md)

Sets the blue component of this RGB color with a unit value (0..1)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unit` | `number` | Unit value (0..1) |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

`this` for method-chaining

#### Defined in

[RGB.ts:583](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L583)

___

### setGreen

▸ **setGreen**(`byte`): [`ColorRGB`](RGB.ColorRGB.md)

Sets the green component of this RGB color with a byte value (0..255)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `byte` | `number` | Byte value (0..255) |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

`this` for method-chaining

#### Defined in

[RGB.ts:550](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L550)

___

### setGreenUnit

▸ **setGreenUnit**(`unit`): [`ColorRGB`](RGB.ColorRGB.md)

Sets the green component of this RGB color with a unit value (0..1)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unit` | `number` | Unit value (0..1) |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

`this` for method-chaining

#### Defined in

[RGB.ts:561](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L561)

___

### setRed

▸ **setRed**(`byte`): [`ColorRGB`](RGB.ColorRGB.md)

Sets the red component of this RGB color with a byte value (0..255)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `byte` | `number` | Byte value (0..255) |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

`this` for method-chaining

#### Defined in

[RGB.ts:528](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L528)

___

### setRedUnit

▸ **setRedUnit**(`unit`): [`ColorRGB`](RGB.ColorRGB.md)

Sets the red component of this RGB color with a unit value (0..1)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `unit` | `number` | Unit value (0..1) |

#### Returns

[`ColorRGB`](RGB.ColorRGB.md)

`this` for method-chaining

#### Defined in

[RGB.ts:539](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L539)

___

### setUnits

▸ **setUnits**(...`components`): [`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

Sets the components of this RGB Color using variable arguments. The order
of the variables is taken as `set(R, G, B, A)`. Any missing components are
skipped.

Each value should be a unit (0..1).

#### Parameters

| Name | Type |
| :------ | :------ |
| `...components` | `number`[] |

#### Returns

[`IColorClass`](../interfaces/IColorClass.IColorClass-1.md)

`this` for method-chaining

#### Defined in

[RGB.ts:509](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L509)

___

### toArray

▸ **toArray**(): `number`[]

Returns this color as an Array of numbers. The first 3 components are the
RGB channels as byte integers (0..255). The last component is the alpha
channel as it's unit-float (0..1).

#### Returns

`number`[]

Array of component values

#### Implementation of

[IColorClass](../interfaces/IColorClass.IColorClass-1.md).[toArray](../interfaces/IColorClass.IColorClass-1.md#toarray)

#### Defined in

[RGB.ts:420](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L420)

___

### toFuncString

▸ **toFuncString**(`forceAlpha?`): `string`

Converts this RGB Color into it's functional-notation string, as if it was
being used with CSS.

By default the alpha information is only included if the alpha value is
not 1.0, or the `forceAlpha` flag is true (defaults to false). Additionally
it is truncated to 4 points of precision.

The output follows this format:
```
rgb(255, 180, 127)
rgba(255, 180, 127, 180)
```

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `forceAlpha` | `boolean` | `false` |

#### Returns

`string`

Functional-notation string

#### Defined in

[RGB.ts:406](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L406)

___

### toHexString

▸ **toHexString**(`forceAlpha?`, `alphaMSB?`): `string`

Converts this RGB Color into it's hexidecimal string representation.

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

[RGB.ts:365](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L365)

___

### toInteger

▸ **toInteger**(`forceAlpha?`, `alphaMSB?`): `number`

Converts this RGB Color into it's integer representation.

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

[RGB.ts:329](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L329)

___

### toString

▸ **toString**(`format?`): `string`

Returns the string representation of this color, with an optional formating
parameter.

The following enums are accepted for formats:
- `INTEGER`: Integer representation including alpha as the LSB if it is not
the default 1.0.
- `INTEGER_ALPHA`: Integer representation with alpha included as the LSB.
- `HEX`: Hexidecimal string representation, only includes alpha as the LSB
if it is not the default opaque (1.0).
- `HEX_ALPHA`: Hexidecimal string with the alpha as the LSB.
- `FUNCTIONAL` (default): CSS-style functional notation. Only includes the
alpha channel if it is not opaque (1.0).
- `FUNCTIONAL_ALPHA`: CSS-style functional notation with the alpha
channel. Uses the "rgba()" function style.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `format` | `string` | `ColorRGB.Formats.FUNCTIONAL` | Optional enum for the output format. Defaults to functional. |

#### Returns

`string`

String representation

#### Implementation of

[IColorClass](../interfaces/IColorClass.IColorClass-1.md).[toString](../interfaces/IColorClass.IColorClass-1.md#tostring)

#### Defined in

[RGB.ts:287](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L287)

___

### toUnitArray

▸ **toUnitArray**(): `number`[]

Returns this color as an Array of unit numbers (0..1). The first 3 indices
are the R, G, and B channels. The last indice is the alpha channel.

#### Returns

`number`[]

Array of component values as units (0..1)

#### Defined in

[RGB.ts:430](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L430)

___

### toYIQValue

▸ **toYIQValue**(): `number`

Calculates the YIQ-color encoding value for this color

**`see`** https://24ways.org/2010/calculating-color-contrast

#### Returns

`number`

YIQ value

#### Defined in

[RGB.ts:445](https://github.com/chris-pikul/coloroo/blob/14d633e/src/RGB.ts#L445)
