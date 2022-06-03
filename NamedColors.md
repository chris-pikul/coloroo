# Named Colors

The Named Colors (aka "X11 Color Set") are provided, as defined by the [CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/#named-colors). They are provided using a key-value object map (in the future this will be a Record when the TC39 proposal goes into effect). Each key in the map matches the lowercase
name of the color (without spaces), and the value is a hexidecimal RGB string.

```TypeScript
import { NamedColors } from 'coloroo`;
import NamedColors from 'coloroo/NamedColors';

const gold:string = NamedColors.gold; // "#FFD700"

// A utility type is provided to ensure the proper key names
import type { ENamedColor } from 'coloroo/NamedColors';

function myFunc(name:ENamedColor) {
  console.log( NamedColors[name] );
}
myFunc("gold");
myFunc("foo"); // TS Error, not a known color name
```

## Supported colors

| Key Name | Color Value |
| -------- | ----------- |
| darkslategrey | `#2F4F4F` ![#2F4F4F](https://via.placeholder.com/15/2F4F4F/000000?text=+)|
| darkturquoise | `#00CED1` ![#00CED1](https://via.placeholder.com/15/00CED1/000000?text=+)|
| darkviolet | `#9400D3` ![#9400D3](https://via.placeholder.com/15/9400D3/000000?text=+)|
| deeppink | `#FF1493` ![#FF1493](https://via.placeholder.com/15/FF1493/000000?text=+)|
| deepskyblue | `#00BFFF` ![#00BFFF](https://via.placeholder.com/15/00BFFF/000000?text=+)|
| dimgray | `#696969` ![#696969](https://via.placeholder.com/15/696969/000000?text=+)|
| dimgrey | `#696969` ![#696969](https://via.placeholder.com/15/696969/000000?text=+)|
| dodgerblue | `#1E90FF` ![#1E90FF](https://via.placeholder.com/15/1E90FF/000000?text=+)|
| firebrick | `#B22222` ![#B22222](https://via.placeholder.com/15/B22222/000000?text=+)|
| floralwhite | `#FFFAF0` ![#FFFAF0](https://via.placeholder.com/15/FFFAF0/000000?text=+)|
| forestgreen | `#228B22` ![#228B22](https://via.placeholder.com/15/228B22/000000?text=+)|
| fuchsia | `#FF00FF` ![#FF00FF](https://via.placeholder.com/15/FF00FF/000000?text=+)|
| gainsboro | `#DCDCDC` ![#DCDCDC](https://via.placeholder.com/15/DCDCDC/000000?text=+)|
| ghostwhite | `#F8F8FF` ![#F8F8FF](https://via.placeholder.com/15/F8F8FF/000000?text=+)|
| gold | `#FFD700` ![#FFD700](https://via.placeholder.com/15/FFD700/000000?text=+)|
| goldenrod | `#DAA520` ![#DAA520](https://via.placeholder.com/15/DAA520/000000?text=+)|
| gray | `#808080` ![#808080](https://via.placeholder.com/15/808080/000000?text=+)|
| green | `#008000` ![#008000](https://via.placeholder.com/15/008000/000000?text=+)|
| greenyellow | `#ADFF2F` ![#ADFF2F](https://via.placeholder.com/15/ADFF2F/000000?text=+)|
| grey | `#808080` ![#808080](https://via.placeholder.com/15/808080/000000?text=+)|
| honeydew | `#F0FFF0` ![#F0FFF0](https://via.placeholder.com/15/F0FFF0/000000?text=+)|
| hotpink | `#FF69B4` ![#FF69B4](https://via.placeholder.com/15/FF69B4/000000?text=+)|
| indianred | `#CD5C5C` ![#CD5C5C](https://via.placeholder.com/15/CD5C5C/000000?text=+)|
| indigo | `#4B0082` ![#4B0082](https://via.placeholder.com/15/4B0082/000000?text=+)|
| ivory | `#FFFFF0` ![#FFFFF0](https://via.placeholder.com/15/FFFFF0/000000?text=+)|
| khaki | `#F0E68C` ![#F0E68C](https://via.placeholder.com/15/F0E68C/000000?text=+)|
| lavender | `#E6E6FA` ![#E6E6FA](https://via.placeholder.com/15/E6E6FA/000000?text=+)|
| lavenderblush | `#FFF0F5` ![#FFF0F5](https://via.placeholder.com/15/FFF0F5/000000?text=+)|
| lawngreen | `#7CFC00` ![#7CFC00](https://via.placeholder.com/15/7CFC00/000000?text=+)|
| lemonchiffon | `#FFFACD` ![#FFFACD](https://via.placeholder.com/15/FFFACD/000000?text=+)|
| lightblue | `#ADD8E6` ![#ADD8E6](https://via.placeholder.com/15/ADD8E6/000000?text=+)|
| lightcoral | `#F08080` ![#F08080](https://via.placeholder.com/15/F08080/000000?text=+)|
| lightcyan | `#E0FFFF` ![#E0FFFF](https://via.placeholder.com/15/E0FFFF/000000?text=+)|
| lightgoldenrodyellow | `#FAFAD2` ![#FAFAD2](https://via.placeholder.com/15/FAFAD2/000000?text=+)|
| lightgray | `#D3D3D3` ![#D3D3D3](https://via.placeholder.com/15/D3D3D3/000000?text=+)|
| lightgreen | `#90EE90` ![#90EE90](https://via.placeholder.com/15/90EE90/000000?text=+)|
| lightgrey | `#D3D3D3` ![#D3D3D3](https://via.placeholder.com/15/D3D3D3/000000?text=+)|
| lightpink | `#FFB6C1` ![#FFB6C1](https://via.placeholder.com/15/FFB6C1/000000?text=+)|
| lightsalmon | `#FFA07A` ![#FFA07A](https://via.placeholder.com/15/FFA07A/000000?text=+)|
| lightseagreen | `#20B2AA` ![#20B2AA](https://via.placeholder.com/15/20B2AA/000000?text=+)|
| lightskyblue | `#87CEFA` ![#87CEFA](https://via.placeholder.com/15/87CEFA/000000?text=+)|
| lightslategray | `#778899` ![#778899](https://via.placeholder.com/15/778899/000000?text=+)|
| lightslategrey | `#778899` ![#778899](https://via.placeholder.com/15/778899/000000?text=+)|
| lightsteelblue | `#B0C4DE` ![#B0C4DE](https://via.placeholder.com/15/B0C4DE/000000?text=+)|
| lightyellow | `#FFFFE0` ![#FFFFE0](https://via.placeholder.com/15/FFFFE0/000000?text=+)|
| lime | `#00FF00` ![#00FF00](https://via.placeholder.com/15/00FF00/000000?text=+)|
| limegreen | `#32CD32` ![#32CD32](https://via.placeholder.com/15/32CD32/000000?text=+)|
| linen | `#FAF0E6` ![#FAF0E6](https://via.placeholder.com/15/FAF0E6/000000?text=+)|
| magenta | `#FF00FF` ![#FF00FF](https://via.placeholder.com/15/FF00FF/000000?text=+)|
| maroon | `#800000` ![#800000](https://via.placeholder.com/15/800000/000000?text=+)|
| mediumaquamarine | `#66CDAA` ![#66CDAA](https://via.placeholder.com/15/66CDAA/000000?text=+)|
| mediumblue | `#0000CD` ![#0000CD](https://via.placeholder.com/15/0000CD/000000?text=+)|
| mediumorchid | `#BA55D3` ![#BA55D3](https://via.placeholder.com/15/BA55D3/000000?text=+)|
| mediumpurple | `#9370DB` ![#9370DB](https://via.placeholder.com/15/9370DB/000000?text=+)|
| mediumseagreen | `#3CB371` ![#3CB371](https://via.placeholder.com/15/3CB371/000000?text=+)|
| mediumslateblue | `#7B68EE` ![#7B68EE](https://via.placeholder.com/15/7B68EE/000000?text=+)|
| mediumspringgreen | `#00FA9A` ![#00FA9A](https://via.placeholder.com/15/00FA9A/000000?text=+)|
| mediumturquoise | `#48D1CC` ![#48D1CC](https://via.placeholder.com/15/48D1CC/000000?text=+)|
| mediumvioletred | `#C71585` ![#C71585](https://via.placeholder.com/15/C71585/000000?text=+)|
| midnightblue | `#191970` ![#191970](https://via.placeholder.com/15/191970/000000?text=+)|
| mintcream | `#F5FFFA` ![#F5FFFA](https://via.placeholder.com/15/F5FFFA/000000?text=+)|
| mistyrose | `#FFE4E1` ![#FFE4E1](https://via.placeholder.com/15/FFE4E1/000000?text=+)|
| moccasin | `#FFE4B5` ![#FFE4B5](https://via.placeholder.com/15/FFE4B5/000000?text=+)|
| navajowhite | `#FFDEAD` ![#FFDEAD](https://via.placeholder.com/15/FFDEAD/000000?text=+)|
| navy | `#000080` ![#000080](https://via.placeholder.com/15/000080/000000?text=+)|
| oldlace | `#FDF5E6` ![#FDF5E6](https://via.placeholder.com/15/FDF5E6/000000?text=+)|
| olive | `#808000` ![#808000](https://via.placeholder.com/15/808000/000000?text=+)|
| olivedrab | `#6B8E23` ![#6B8E23](https://via.placeholder.com/15/6B8E23/000000?text=+)|
| orange | `#FFA500` ![#FFA500](https://via.placeholder.com/15/FFA500/000000?text=+)|
| orangered | `#FF4500` ![#FF4500](https://via.placeholder.com/15/FF4500/000000?text=+)|
| orchid | `#DA70D6` ![#DA70D6](https://via.placeholder.com/15/DA70D6/000000?text=+)|
| palegoldenrod | `#EEE8AA` ![#EEE8AA](https://via.placeholder.com/15/EEE8AA/000000?text=+)|
| palegreen | `#98FB98` ![#98FB98](https://via.placeholder.com/15/98FB98/000000?text=+)|
| paleturquoise | `#AFEEEE` ![#AFEEEE](https://via.placeholder.com/15/AFEEEE/000000?text=+)|
| palevioletred | `#DB7093` ![#DB7093](https://via.placeholder.com/15/DB7093/000000?text=+)|
| papayawhip | `#FFEFD5` ![#FFEFD5](https://via.placeholder.com/15/FFEFD5/000000?text=+)|
| peachpuff | `#FFDAB9` ![#FFDAB9](https://via.placeholder.com/15/FFDAB9/000000?text=+)|
| peru | `#CD853F` ![#CD853F](https://via.placeholder.com/15/CD853F/000000?text=+)|
| pink | `#FFC0CB` ![#FFC0CB](https://via.placeholder.com/15/FFC0CB/000000?text=+)|
| plum | `#DDA0DD` ![#DDA0DD](https://via.placeholder.com/15/DDA0DD/000000?text=+)|
| powderblue | `#B0E0E6` ![#B0E0E6](https://via.placeholder.com/15/B0E0E6/000000?text=+)|
| purple | `#800080` ![#800080](https://via.placeholder.com/15/800080/000000?text=+)|
| rebeccapurple | `#663399` ![#663399](https://via.placeholder.com/15/663399/000000?text=+)|
| red | `#FF0000` ![#FF0000](https://via.placeholder.com/15/FF0000/000000?text=+)|
| rosybrown | `#BC8F8F` ![#BC8F8F](https://via.placeholder.com/15/BC8F8F/000000?text=+)|
| royalblue | `#4169E1` ![#4169E1](https://via.placeholder.com/15/4169E1/000000?text=+)|
| saddlebrown | `#8B4513` ![#8B4513](https://via.placeholder.com/15/8B4513/000000?text=+)|
| salmon | `#FA8072` ![#FA8072](https://via.placeholder.com/15/FA8072/000000?text=+)|
| sandybrown | `#F4A460` ![#F4A460](https://via.placeholder.com/15/F4A460/000000?text=+)|
| seagreen | `#2E8B57` ![#2E8B57](https://via.placeholder.com/15/2E8B57/000000?text=+)|
| seashell | `#FFF5EE` ![#FFF5EE](https://via.placeholder.com/15/FFF5EE/000000?text=+)|
| sienna | `#A0522D` ![#A0522D](https://via.placeholder.com/15/A0522D/000000?text=+)|
| silver | `#C0C0C0` ![#C0C0C0](https://via.placeholder.com/15/C0C0C0/000000?text=+)|
| skyblue | `#87CEEB` ![#87CEEB](https://via.placeholder.com/15/87CEEB/000000?text=+)|
| slateblue | `#6A5ACD` ![#6A5ACD](https://via.placeholder.com/15/6A5ACD/000000?text=+)|
| slategray | `#708090` ![#708090](https://via.placeholder.com/15/708090/000000?text=+)|
| slategrey | `#708090` ![#708090](https://via.placeholder.com/15/708090/000000?text=+)|
| snow | `#FFFAFA` ![#FFFAFA](https://via.placeholder.com/15/FFFAFA/000000?text=+)|
| springgreen | `#00FF7F` ![#00FF7F](https://via.placeholder.com/15/00FF7F/000000?text=+)|
| steelblue | `#4682B4` ![#4682B4](https://via.placeholder.com/15/4682B4/000000?text=+)|
| tan | `#D2B48C` ![#D2B48C](https://via.placeholder.com/15/D2B48C/000000?text=+)|
| teal | `#008080` ![#008080](https://via.placeholder.com/15/008080/000000?text=+)|
| thistle | `#D8BFD8` ![#D8BFD8](https://via.placeholder.com/15/D8BFD8/000000?text=+)|
| tomato | `#FF6347` ![#FF6347](https://via.placeholder.com/15/FF6347/000000?text=+)|
| turquoise | `#40E0D0` ![#40E0D0](https://via.placeholder.com/15/40E0D0/000000?text=+)|
| violet | `#EE82EE` ![#EE82EE](https://via.placeholder.com/15/EE82EE/000000?text=+)|
| wheat | `#F5DEB3` ![#F5DEB3](https://via.placeholder.com/15/F5DEB3/000000?text=+)|
| white | `#FFFFFF` ![#FFFFFF](https://via.placeholder.com/15/FFFFFF/000000?text=+)|
| whitesmoke | `#F5F5F5` ![#F5F5F5](https://via.placeholder.com/15/F5F5F5/000000?text=+)|
| yellow | `#FFFF00` ![#FFFF00](https://via.placeholder.com/15/FFFF00/000000?text=+)|
| yellowgreen | `#9ACD32` ![#9ACD32](https://via.placeholder.com/15/9ACD32/000000?text=+)|
