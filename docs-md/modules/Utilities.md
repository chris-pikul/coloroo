[coloroo](../README.md) / [Exports](../modules.md) / Utilities

# Module: Utilities

Copyright © 2021 Chris Pikul.

This code base (coloroo) is under the MIT license. See the file at the
project root "LICENSE" for more information.
-----------------------------------------------------------------------------

Provides common regular expressions for parsing and validation.

## Table of contents

### Variables

- [regexpHex](Utilities.md#regexphex)
- [regexpInteger](Utilities.md#regexpinteger)
- [regexpNumber](Utilities.md#regexpnumber)
- [regexpPercent](Utilities.md#regexppercent)
- [regexpRGBFunc](Utilities.md#regexprgbfunc)

### Functions

- [captureAll](Utilities.md#captureall)
- [captureFirst](Utilities.md#capturefirst)

## Variables

### regexpHex

• `Const` **regexpHex**: `RegExp`

Regular expression matching (with capture groups) for hexidecimal color
codes.

#### Defined in

[utils/regexp.ts:45](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/utils/regexp.ts#L45)

___

### regexpInteger

• `Const` **regexpInteger**: `RegExp`

Regular expression matching integers for testing

#### Defined in

[utils/regexp.ts:50](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/utils/regexp.ts#L50)

___

### regexpNumber

• `Const` **regexpNumber**: `RegExp`

Regular expression matching a valid number as of CSS4 standards

#### Defined in

[utils/regexp.ts:55](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/utils/regexp.ts#L55)

___

### regexpPercent

• `Const` **regexpPercent**: `RegExp`

Regular expression matching a percentage value

#### Defined in

[utils/regexp.ts:60](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/utils/regexp.ts#L60)

___

### regexpRGBFunc

• `Const` **regexpRGBFunc**: `RegExp`

Regular expression matching the CSS4 definition of RGB(A) functional
notation. Features named capture groups for the components. As defined with
the spec, both the rgb() and rgba() variations accept 4 components. This
additionally accepts the new "none" keyword.

#### Defined in

[utils/regexp.ts:68](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/utils/regexp.ts#L68)

## Functions

### captureAll

▸ **captureAll**(`regexp`, `str`): (`string` \| `undefined`)[][]

Runs a regular expression against an input string, capturing all groups.
The return is an array of arrays, where the inner arrays are all the capture
groups.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `regexp` | `RegExp` | Regular Expression to use |
| `str` | `string` | Input string to match against |

#### Returns

(`string` \| `undefined`)[][]

Array of arrays containing strings or undefined objects

#### Defined in

[utils/regexp.ts:22](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/utils/regexp.ts#L22)

___

### captureFirst

▸ **captureFirst**(`regexp`, `str`): (`string` \| `undefined`)[] \| ``null``

Runs a regular expression against an input string, returning only the
capture groups within that first match. If no matches are made then null
is returned

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `regexp` | `RegExp` | Regular Expression to use |
| `str` | `string` | Input string to match against |

#### Returns

(`string` \| `undefined`)[] \| ``null``

Either null, or an array of the matches

#### Defined in

[utils/regexp.ts:36](https://github.com/chris-pikul/coloroo/blob/ffcd5a2/src/utils/regexp.ts#L36)
