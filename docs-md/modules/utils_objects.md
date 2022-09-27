[coloroo](../README.md) / [Exports](../modules.md) / utils/objects

# Module: utils/objects

Copyright © 2021 Chris Pikul.

This code base (coloroo) is under the MIT license. See the file at the
project root "LICENSE" for more information.
-----------------------------------------------------------------------------

Provides utilities for objects

## Table of contents

### Functions

- [objectMatchesPattern](utils_objects.md#objectmatchespattern)

## Functions

### objectMatchesPattern

▸ **objectMatchesPattern**(`obj`, `pattern`, `loose?`, `ignoreType?`): `boolean`

Tests that all the given properties of a given object match against a pattern
object.

Each key is checked for equality, as well as the values being matched against
the same type as the pattern.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `obj` | `Record`<`any`, `any`\> | `undefined` | Object to test |
| `pattern` | `Record`<`any`, `any`\> | `undefined` | Object containing dummy data to match against |
| `loose` | `boolean` | `false` | - |
| `ignoreType` | `boolean` | `false` | - |

#### Returns

`boolean`

True if all the keys and value types match against the
given pattern.

#### Defined in

[utils/objects.ts:28](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/utils/objects.ts#L28)
