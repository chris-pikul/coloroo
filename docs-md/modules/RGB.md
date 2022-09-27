[coloroo](../README.md) / [Exports](../modules.md) / RGB

# Module: RGB

Copyright © 2021 Chris Pikul.

This code base (coloroo) is under the MIT license. See the file at the
project root "LICENSE" for more information.
-----------------------------------------------------------------------------

Defines the implementation for the RGB color spectrum. The channels red,
green, and blue are presented as unit floats (0..1) with byte integer
interfaces.

## Table of contents

### References

- [default](RGB.md#default-2)

### Classes

- [ColorRGB](../classes/RGB.ColorRGB.md)

### Interfaces

- [RGBObject](../interfaces/RGB.RGBObject.md)

### Type Aliases

- [RGBTuple](RGB.md#rgbtuple)

## References

### default

Renames and re-exports [ColorRGB](../classes/RGB.ColorRGB.md)

## Type Aliases

### RGBTuple

Ƭ **RGBTuple**: [`number`, `number`, `number`, number?]

Tuple array holding the red, green, blue, and optionally alpha channels.
Each value is considered a unit float (0..1)

#### Defined in

[RGB.ts:41](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/RGB.ts#L41)
