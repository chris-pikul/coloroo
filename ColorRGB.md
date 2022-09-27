# ColorRGB - RGB Color Space

The RGB color space is provided by the `ColorRGB` class. Internally, the `ColorRGB` class maintains each channel (Red, Green, and Blue) in unit floats (0..1). As most all color spaces, an alpha channel is provided with the class in the form of a unit float (0..1).

## Table of Contents

- [Constructing](#constructor)
  - [Single Argument](#single-value-instantiation)
  - [Multiple Arguments](#multiple-values-instantiation)
- [Components / Channels](#components--channels)
- [Conversion from/to other data-types](#conversion)
  - [fromString](#fromstring) / [toString](#tostring)
  - [toArray](#toarray)
  - [fromObject (ensureRGB)](#ensurergb) / [toObject](#toobject)
  - [fromRGB](#fromrgb) / [toRGB](#torgb)
  - [fromInteger](#frominteger) / [toInteger](#tointeger)
  - [fromHex](#fromhex) / [toHex](#tohex)
  - [fromFunctional](#fromfunctional) / [toFunctional](#tofunctional)
  - [toYIQValue](#toyiqvalue)
- [Contrast and WCAG](#contrast-and-wcag)
  - [luminosity](#luminosity)
  - [contrast](#contrast)
  - [contrastLevel](#contrastlevel)
  - [pickUsingContrast](#pickusingcontrast)
  - [isDark](#isdark)
  - [isLight](#islight)
- [Manipulation](#manipulation)
  - [lerp or linear-interpolation](#lerp)
  - [shade, or darken](#shade-or-darken)
  - [tint, or lighten](#tint-or-lighten)
  - [tone](#tone)
  - [invert](#invert)
  - [desaturate](#desaturate)
  - [grayscale](#grayscale)
  - [median](#median)
  - [threshold](#threshold)

## Constructor

The constructor of `ColorRGB` accepts a wide variety of forms to help produce RGB colors. Refer to the following sub-chapters on which operations are used depending on the number, and types, of each argument:

### Single Value Instantiation

- `ColorRGB`: Used to copy an existing ColorRGB object one-to-one.
- `number`: `16711935 || 0xFF00FF` -- The value is treated as a 32-bit integer and will be parsed as such using bit-masking. Alpha information is not considered in the constructor, to use alpha check the `ColorRGB.fromInteger` method which has parameters to specify the alpha format.
- `string`: String values can be hexidecimal, [CSS Named Colors](NamedColors.md), CSS4 functional notation, or the keyword "transparent". This uses `ColorRGB.fromString` to parse the intent of the string.
  - Hexidecimal (`#FF00FF`): Parsing of hexidecimal strings uses `ColorRGB.fromHexS` internally. The "#" prefix is optional and casing is ignored. It accepts short-form (`#FA0`), long-form (`#FFAA00`), and alpha channels for both as the least-significant-byte (`#FA08` or `#FFAA0088`).
  - Named Color (`gold`): If the input string matches a known named color as based on the keys provided in [NamedColors](NamedColors.md) then the value matching that key (hexidecimal string) will be used and then parsed.
  - Functional Notation (`rgba(255 0 255 / 50%`): Using the CSS4 spec, a functional notation string can be supplied. Multiple formats are supported to maintain compatibility and as such the syntax is not strictly enforced.
  - Keyword (`transparent`): The only keyword accepted at the moment is "transparent", which produces a transparent black color.
- `Array<number | string>`: An array is interpreted as RGBA channels. The length of the array does not need to be 4 items, and the types can be mismatched. This is equivelent to the destructoring of `const [red, green, blue, alpha ] = input`. Any missing components will use their default values of 0 for color components, and 1 (full) for alpha. Numbers are clamped to their components respective bounds (unit floats 0..1). String values are parsed before being clamped and accepts numerical notation ("128.5"), percentages ("25%"), and the keyword "none".
- `object || Record`: If an object (or record) is provided, it will attempt to convert it using the `ColorRGB.ensureRGB()` static function. First, if the object is an instance of `ColorRGB` it is copied directly. Secondly, if the object contains a method `toRGB()` then that function is used and expects a `ColorRGB` object to be returned (TypeScript should enforce this). Finally, it is searched for matching channel names in both abbreviated and full form. The abbreviated form is preferred. Any missing channels will use their respective defaults (0 for color, 1 for alpha). The accepted channels are as follows:
  - "r", or "red": Red channel unit.
  - "g", or "green": Green channel unit.
  - "b", or "blue": Blue channel unit.
  - "a", or "alpha", or "opacity": Alpha channel unit.

```TypeScript
import ColorRGB from 'coloroo';

new ColorRGB() // Default black color\
new ColorRGB(0xFFAA88)   // Color from integer
new ColorRGB('gold')     // Color from X11 named color
new ColorRGB('#FFAA88')  // Color from hexidecimal string
new ColorRGB('rgb(255, 127, 64)')  // Color from functional-notation
new ColorRGB([255, 127, 64, 0.5])  // Color from array of numbers
new ColorRGB(['100%', '50%', 'none', '50%']) // Color from array of strings
new ColorRGB({ r: 1.0, g: 0.5, b: 0.25}) // Color from object
```

### Multiple Values Instantiation

If muliple values are supplied (more than 1), then the constructor arguments are interpreted as channel components. The arguments match the signature `new ColorRGB(red, green, blue, alpha)`. The alpha argument is optional, and if not provided it will default to opaque (1).

Each channel can be either a number, or a string. For the color components (R, G, B) the value must be parsable to a unit float in the range of 0..1. For the alpha, it should be parsable to a unit float in the range of 0..1.

When a string value is provided, it will be parsed into it's numerical value as it applies to the target channel. You can provide mathmatical/numerical notations such as "3.14", or "1e2+1", any value that `parseFloat` can understand. Additionally, percentages can be provided such as "50%". Lastly, a special keyword of "none" is accepted for a zero value.

## Components / Channels

Each component is provided as a getter/setting for easy property accessing. These mask the internal components (as private properties) to ensure safe bounds.

- `ColorRGB.red`: The red component, as a unit (0..1). Setting this property will perform clamping for you.
- `ColorRGB.green`: The green component, as a unit (0..1). Setting this property will perform clamping for you.
- `ColorRGB.blue`: The blue component, as a unit (0..1). Setting this property will perform clamping for you.
- `ColorRGB.alpha`: The alpha component, as a unit (0..1). Setting this property will perform clamping for you.

Additionally, there are methods to return the color components as byte integers (0..255) instead:

- `ColorRGB.redByte()`
- `ColorRGB.greenByte()`
- `ColorRGB.blueByte()`
- `ColorRGB.alphaByte()`

## Conversion

There are many ways to convert the RGB color-space to some other format other than the `ColorRGB` object. Including, string generation, integer compression, YIQ color value, and other color-spaces.

### fromString()

There is a convienience static function `ColorRGB.fromString()` which attempts to parse an incoming string into a `ColorRGB` object. It accepts the following:

- "transparent": Special keyword for black-transparent color.
- Named Color: Using the known named colors, will translate into a `ColorRGB` object.
- Hexidecimal: Will convert hexidecimal string into a color. Attempts to smartly consider alpha components in the hex string. Uses `ColorRGB.fromHex()`.
- Functional-notation: Given a CSS4 compatible string, will attempt to convert using `ColorRGB.fromFunctional`.

Note that each method is tried from top-to-bottom until something doesn't throw. If the format is known ahead of time, prefer using that specialized function instead.

### toString()

To generate a string from a `ColorRGB` object use the `ColorRGB.toString()` method. By default this will generate a CSS4 functional string, and as JS internally uses the `toString` method this will be the default.

### toArray()

Returns each channel into a new array following `[ red, green, blue, alpha ]`.

### ensureRGB()

The static method `ColorRGB.ensureRGB()` can be used to short-cut creating a `ColorRGB` object from another unknown object. Depending on the argument provided, the following methods will be used:

- Instance-of ColorRGB: The color is copied.
- Object with `toRGB` method: The method is called and used to copy the ColorRGB object that is expects as a return from that method.
- Object that matches a pattern: Will attempt to extract the channels using the following property keys "r, red, g, green, b, blue, a, alpha, opacity". It must contain one of the RGB channel options to be considered valid. Each property must map to a number value which will be type-checked on runtime.

If the object cannot be understood, a `TypeError` is thrown.

### toObject()

Returns a POJSO (Plain Ol' JavaScript Object), or "Record" of each channel. The alpha component is ignored if it is 1.0 (opaque). The returned object resembles:

`{ r: 1, g: 0.5, b: 0.25, a: 0.125}`

### fromRGB()

Maintained for complience with other color-space conversion methods. Makes a deep copy of the `ColorRGB` object provided.

### toRGB()

Maintained for complience with other color-space conversion methods. Makes a deep copy of the `ColorRGB` object.

### fromInteger()

The static method `ColorRGB.fromInteger()` can be used as a short-cut to create a new ColorRGB from a given integer. Provides parameters to define if there is an alpha channel present, and in which byte position it is.

### toInteger()

Returns the color as a packed integer value. In general, it will attempt to smartly use the alpha channel if the alpha component is not completely 1. The parameters available customize how the value is generated:

- `forceAlpha` (default: false): If true, the alpha component is forced into the calculation regardless of whether the value is 1 or not.
- `alphaMSB` (default: false): If true, the alpha component will occupy the most-significant byte. By default, this is false, and instead will be the least-significant byte.

### fromHex()

You can use the static method `ColorRGB.fromHex()` to directly convert a hexidecimal string into a `ColorRGB` object.

### toHex()

Returns the color as a hexidecimal string (prefixed with #). In general, it will attempt to smartly use the alpha channel if the alpha component is not completely 1. The parameters available customize how the value is generated:

- `forceAlpha` (default: false): If true, the alpha component is forced into the calculation regardless of whether the value is 1 or not.
- `alphaMSB` (default: false): If true, the alpha component will occupy the most-significant byte. By default, this is false, and instead will be the least-significant byte.

### fromFunctional()

The static method `ColorRGB.fromFunctional()` will attempt to parse an incoming CSS4 compatible functional-notation string and return a new `ColorRGB` object for you.

### toFunctional()

Returns the color as a CSS4 complient functional-notation string. The RGB channels will be converted to percentages, while alpha remains as a float. The channels are comma separated to maintain complience back to CSS2.

### toYIQValue()

Converts the color into a singular YIQ value for color-contrast comparisons.

## Contrast and WCAG

There are a few methods that can be used to calculate information related to the perceived "contrast" level of the color, and especially it's relation to WCAG 2.0 complience.

### luminosity()

Will return the singular floating-point value for the WCAG 2.0 luminosity. This method is used in other convienience functions.

### contrast()

Compare the luminosity of one color ("this") and another given color. The other given color can be any Coloroo color that implements the IColor interface (they all should). The returned value is a single number.

### contrastLevel()

Works just like `contrast()` does, but instead of a numeric value, it returns the ratio "grade" such that it is either "", "AA", or "AAA". Compares the current objects contrast ("this") with the given other color.

### pickUsingContrast()

Provided an array of `IColor` implementing colors, will calculate the contrast levels compared with "this" color. It then returns which ever color in the provided array scored the highest contrast level.

This is intended as a JS way to implement the CSS proposal "color-contrast" functionality.

### isDark()

Returns true if "this" color is considered dark.

### isLight()

Returns true if "this" color is considered light.

## Manipulation

The following methods are provided to manipulate a color object. As all methods in the `ColorRGB` class, they are immutable and return new values.

### lerp()

Linear-interpolate between this color, and a given secondary color, using the provided delta weight (unit float 0..1).

### shade() or darken()

Create a new shade (darker variant) of "this" by interpolating it with black.

### tint() or lighten()

Create a new tint (lighter variant) of "this" by interpolating it with white.

### tone()

Create a new tone (more gray) of "this" by interpolating it with gray.

### invert()

Inverts each channel in "this" color and returns a new one. Can optionally invert the alpha as well, but the default is to not.

### desaturate()

Performs a desaturation effect using the "Weighted Method" by a given amount.

### grayscale()

Convert "this" color into grayscale using the averaging, or median, method.

### median()

Finds the median, or "middle" value between all the RGB channels in this color. Returns the value as a single number.

### threshold()

Calculates the median value of "this" color, then depending on the value returned will select one of the two colors provided based on the threshold level provided.
