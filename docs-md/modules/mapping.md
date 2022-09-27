[coloroo](../README.md) / [Exports](../modules.md) / mapping

# Module: mapping

## Table of contents

### Type Aliases

- [AlphaMapCallback](mapping.md#alphamapcallback)
- [ChannelMapCallback](mapping.md#channelmapcallback)
- [ValueMapCallback](mapping.md#valuemapcallback)

### Functions

- [NoOpMapCallback](mapping.md#noopmapcallback)

## Type Aliases

### AlphaMapCallback

Ƭ **AlphaMapCallback**<`T`\>: (`alpha`: `number`, `clr`: `T`) => `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`IColor`](../interfaces/RGB.IColor.md) = [`IColor`](../interfaces/RGB.IColor.md) |

#### Type declaration

▸ (`alpha`, `clr`): `number`

Callback used when mapping the alpha of a color. This is separated from
ChannelMapCallback to ease confusion on which index is the alpha, and
because generally channel mapping happens independantly of the opacity.

It is provided the current alpha value as a unit float (0..1), and the
original color object.

##### Parameters

| Name | Type |
| :------ | :------ |
| `alpha` | `number` |
| `clr` | `T` |

##### Returns

`number`

#### Defined in

[mapping.ts:34](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/mapping.ts#L34)

___

### ChannelMapCallback

Ƭ **ChannelMapCallback**<`T`\>: (`chan`: `number`, `index`: `number`, `clr`: `T`) => `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`IColor`](../interfaces/RGB.IColor.md) = [`IColor`](../interfaces/RGB.IColor.md) |

#### Type declaration

▸ (`chan`, `index`, `clr`): `number`

Callback used when mapping channels of a color.

This callback is provided the current channel value, the index of the
channel, and the original color object specifying the channels.

##### Parameters

| Name | Type |
| :------ | :------ |
| `chan` | `number` |
| `index` | `number` |
| `clr` | `T` |

##### Returns

`number`

#### Defined in

[mapping.ts:24](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/mapping.ts#L24)

___

### ValueMapCallback

Ƭ **ValueMapCallback**: (`value`: `number`) => `number`

#### Type declaration

▸ (`value`): `number`

Any callback that takes a numerical value and is expected to return a new
value.

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

##### Returns

`number`

#### Defined in

[mapping.ts:16](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/mapping.ts#L16)

## Functions

### NoOpMapCallback

▸ **NoOpMapCallback**(`value`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

`number`

#### Defined in

[mapping.ts:36](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/mapping.ts#L36)
