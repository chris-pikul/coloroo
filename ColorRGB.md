# ColorRGB - RGB Color Space

The RGB color space is provided by the `ColorRGB` class. Internally, the `ColorRGB` class maintains each channel (Red, Green, and Blue) in bytes
(integers 0..255). As most all color spaces, an alpha channel is provided with the class in the form of a unit float (0..1).

## Constructor

The constructor of `ColorRGB` accepts a wide variety of forms to help produce RGB colors. If a single value is provided, it is ran through the `ColorRGB.parse`
method. If multiple values are provided, they are treated as channels and passed through the `ColorRGB.set` method. Providing no arguments creates an opaque
black color by default.

### Single Value Instantiation

- `number`: `16711935 || 0xFF00FF` -- The value is treated as a 32-bit integer and will be parsed as such using bit-masking. Alpha information is not considered in the constructor, to use alpha check the `ColorRGB.fromInteger` method which has parameters to specify the alpha format.
- `string`: String values can be hexidecimal, [CSS Named Colors](NamedColors.md), CSS4 functional notation, or the keyword "transparent". This uses `ColorRGB.fromString` to parse the intent of the string.
  - Hexidecimal (`#FF00FF`): Parsing of hexidecimal strings uses `ColorRGB.fromHexString` internally. The "#" prefix is optional and casing is ignored. It accepts short-form (`#FA0`), long-form (`#FFAA00`), and alpha channels for both as the least-significant-byte (`#FA08` or `#FFAA0088`).
  - Named Color (`gold`): If the input string matches a known named color as based on the keys provided in [NamedColors](NamedColors.md) then the value matching that key will be used and then parsed.
  - Functional Notation (`rgba(255 0 255 / 50%`): Using the CSS4 spec, a functional notation string can be supplied. Multiple formats are supported to maintain compatibility and as such the syntax is not strictly enforced.
  - Keyword (`transparent`): The only keyword accepted at the moment is "transparent", which produces a transparent black color.
- `Array<number | string>`: An array is interpreted as RGBA channels. The length of the array does not need to be 4 items, and the types can be mismatched. This is equivelent to the destructoring of `const [red, green, blue, alpha ] = input`. Any missing components will use their default values of 0 for color components, and 1 (full) for alpha. Numbers are clamped to their components respective bounds (0..255 for color components, 0..1 for alpha). String values are parsed before being clamped and accepts numerical notation ("128.5"), percentages ("25%"), and the keyword "none".
- `object || Record`: If an object (or record) is provided, it is searched for matching channel names in both abbreviated and full form. The abbreviated form is preferred. Any missing channels with use their respective defaults (0 for color, 1 for alpha). The accepted channels are as follows:
  - "r", or "red": Red channel byte.
  - "g", or "green": Green channel byte.
  - "b", or "blue": Blue channel byte.
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
new ColorRGB({ r: 255, g: 127, b: 64}) // Color from object
```

### Multiple Values Instantiation

If muliple values are supplied (more than 1), then the constructor arguments are interpreted as channel components. The arguments match the signature `new ColorRGB(red, green, blue, alpha)`. The alpha argument is optional, and if not provided it will default to opaque (1).

Each channel can be either a number, or a string. For the color components (R, G, B) the value must be parsable to a byte integer in the range of 0..255. For the alpha, it should be parsable to a unit float in the range of 0..1.

When a string value is provided, it will be parsed into it's numerical value as it applies to the target channel. You can provide mathmatical/numerical notations such as "3.14", or "1e2+1", any value that `parseFloat` can understand. Additionally, percentages can be provided such as "50%". Lastly, a special keyword of "none" is accepted for a zero value.
