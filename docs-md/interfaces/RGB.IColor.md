[coloroo](../README.md) / [Exports](../modules.md) / [RGB](../modules/RGB.md) / IColor

# Interface: IColor

[RGB](../modules/RGB.md).IColor

Definition of any color-space class.

## Implemented by

- [`ColorRGB`](../classes/RGB.ColorRGB.md)

## Table of contents

### Properties

- [alpha](RGB.IColor.md#alpha)

### Methods

- [toArray](RGB.IColor.md#toarray)
- [toFunctional](RGB.IColor.md#tofunctional)
- [toObject](RGB.IColor.md#toobject)
- [toRGB](RGB.IColor.md#torgb)
- [toString](RGB.IColor.md#tostring)

## Properties

### alpha

• **alpha**: `number`

Opacity of the color, clamped as a unit float (0..1).

#### Defined in

[IColor.ts:23](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/IColor.ts#L23)

## Methods

### toArray

▸ **toArray**(): `number`[]

Get the channels of this color as an array of values

#### Returns

`number`[]

#### Defined in

[IColor.ts:34](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/IColor.ts#L34)

___

### toFunctional

▸ **toFunctional**(): `string`

Convert the color-space into a CSS3 compatible functional-notation string.

#### Returns

`string`

#### Defined in

[IColor.ts:44](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/IColor.ts#L44)

___

### toObject

▸ **toObject**(): `Record`<`string`, `number`\>

Get an object (JSON acceptable) representation of this color

#### Returns

`Record`<`string`, `number`\>

#### Defined in

[IColor.ts:39](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/IColor.ts#L39)

___

### toRGB

▸ **toRGB**(): [`ColorRGB`](../classes/RGB.ColorRGB.md)

Convert this color-space to RGB.

Used for inter-color conversion.

**`note`** May change this later to a higher fidelity format

#### Returns

[`ColorRGB`](../classes/RGB.ColorRGB.md)

#### Defined in

[IColor.ts:53](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/IColor.ts#L53)

___

### toString

▸ **toString**(): `string`

Convert the color to a string representation. In general this results in a
CSS3 compatible functional-notation string.

#### Returns

`string`

#### Defined in

[IColor.ts:29](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/IColor.ts#L29)
