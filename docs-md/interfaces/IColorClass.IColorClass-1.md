[coloroo](../README.md) / [Exports](../modules.md) / [IColorClass](../modules/IColorClass.md) / IColorClass

# Interface: IColorClass

[IColorClass](../modules/IColorClass.md).IColorClass

Interface for a generic color-space based class

## Implemented by

- [`ColorRGB`](../classes/RGB.ColorRGB.md)

## Table of contents

### Methods

- [fromArray](IColorClass.IColorClass-1.md#fromarray)
- [fromInteger](IColorClass.IColorClass-1.md#frominteger)
- [fromObject](IColorClass.IColorClass-1.md#fromobject)
- [fromString](IColorClass.IColorClass-1.md#fromstring)
- [parse](IColorClass.IColorClass-1.md#parse)
- [set](IColorClass.IColorClass-1.md#set)
- [toArray](IColorClass.IColorClass-1.md#toarray)
- [toString](IColorClass.IColorClass-1.md#tostring)

## Methods

### fromArray

▸ **fromArray**(`arr`): [`IColorClass`](IColorClass.IColorClass-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arr` | `number`[] |

#### Returns

[`IColorClass`](IColorClass.IColorClass-1.md)

#### Defined in

[IColorClass.ts:25](https://github.com/chris-pikul/coloroo/blob/14d633e/src/IColorClass.ts#L25)

___

### fromInteger

▸ **fromInteger**(`value`): [`IColorClass`](IColorClass.IColorClass-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `number` |

#### Returns

[`IColorClass`](IColorClass.IColorClass-1.md)

#### Defined in

[IColorClass.ts:23](https://github.com/chris-pikul/coloroo/blob/14d633e/src/IColorClass.ts#L23)

___

### fromObject

▸ **fromObject**(`obj`): [`IColorClass`](IColorClass.IColorClass-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `Record`<`any`, `any`\> |

#### Returns

[`IColorClass`](IColorClass.IColorClass-1.md)

#### Defined in

[IColorClass.ts:26](https://github.com/chris-pikul/coloroo/blob/14d633e/src/IColorClass.ts#L26)

___

### fromString

▸ **fromString**(`str`): [`IColorClass`](IColorClass.IColorClass-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `str` | `string` |

#### Returns

[`IColorClass`](IColorClass.IColorClass-1.md)

#### Defined in

[IColorClass.ts:24](https://github.com/chris-pikul/coloroo/blob/14d633e/src/IColorClass.ts#L24)

___

### parse

▸ **parse**(`arg`): [`IColorClass`](IColorClass.IColorClass-1.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `arg` | `any` |

#### Returns

[`IColorClass`](IColorClass.IColorClass-1.md)

#### Defined in

[IColorClass.ts:27](https://github.com/chris-pikul/coloroo/blob/14d633e/src/IColorClass.ts#L27)

___

### set

▸ **set**(): [`IColorClass`](IColorClass.IColorClass-1.md)

#### Returns

[`IColorClass`](IColorClass.IColorClass-1.md)

#### Defined in

[IColorClass.ts:22](https://github.com/chris-pikul/coloroo/blob/14d633e/src/IColorClass.ts#L22)

___

### toArray

▸ **toArray**(): `number`[]

#### Returns

`number`[]

#### Defined in

[IColorClass.ts:20](https://github.com/chris-pikul/coloroo/blob/14d633e/src/IColorClass.ts#L20)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[IColorClass.ts:19](https://github.com/chris-pikul/coloroo/blob/14d633e/src/IColorClass.ts#L19)
