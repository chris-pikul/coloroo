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
| aliceblue | `#F0F8FF` <img valign='middle' alt='aliceblue' src='https://readme-swatches.vercel.app/F0F8FF'/> |
| antiquewhite | `#FAEBD7` <img valign='middle' alt='antiquewhite' src='https://readme-swatches.vercel.app/FAEBD7'/> |
| aqua | `#00FFFF` <img valign='middle' alt='aqua' src='https://readme-swatches.vercel.app/00FFFF'/> |
| aquamarine | `#7FFFD4` <img valign='middle' alt='aquamarine' src='https://readme-swatches.vercel.app/7FFFD4'/> |
| azure | `#F0FFFF` <img valign='middle' alt='azure' src='https://readme-swatches.vercel.app/F0FFFF'/> |
| beige | `#F5F5DC` <img valign='middle' alt='beige' src='https://readme-swatches.vercel.app/F5F5DC'/> |
| bisque | `#FFE4C4` <img valign='middle' alt='bisque' src='https://readme-swatches.vercel.app/FFE4C4'/> |
| black | `#000000` <img valign='middle' alt='black' src='https://readme-swatches.vercel.app/000000'/> |
| blanchedalmond | `#FFEBCD` <img valign='middle' alt='blanchedalmond' src='https://readme-swatches.vercel.app/FFEBCD'/> |
| blue | `#0000FF` <img valign='middle' alt='blue' src='https://readme-swatches.vercel.app/0000FF'/> |
| blueviolet | `#8A2BE2` <img valign='middle' alt='blueviolet' src='https://readme-swatches.vercel.app/8A2BE2'/> |
| brown | `#A52A2A` <img valign='middle' alt='brown' src='https://readme-swatches.vercel.app/A52A2A'/> |
| burlywood | `#DEB887` <img valign='middle' alt='burlywood' src='https://readme-swatches.vercel.app/DEB887'/> |
| cadetblue | `#5F9EA0` <img valign='middle' alt='cadetblue' src='https://readme-swatches.vercel.app/5F9EA0'/> |
| chartreuse | `#7FFF00` <img valign='middle' alt='chartreuse' src='https://readme-swatches.vercel.app/7FFF00'/> |
| chocolate | `#D2691E` <img valign='middle' alt='chocolate' src='https://readme-swatches.vercel.app/D2691E'/> |
| coral | `#FF7F50` <img valign='middle' alt='coral' src='https://readme-swatches.vercel.app/FF7F50'/> |
| cornflowerblue | `#6495ED` <img valign='middle' alt='cornflowerblue' src='https://readme-swatches.vercel.app/6495ED'/> |
| cornsilk | `#FFF8DC` <img valign='middle' alt='cornsilk' src='https://readme-swatches.vercel.app/FFF8DC'/> |
| crimson | `#DC143C` <img valign='middle' alt='crimson' src='https://readme-swatches.vercel.app/DC143C'/> |
| cyan | `#00FFFF` <img valign='middle' alt='cyan' src='https://readme-swatches.vercel.app/00FFFF'/> |
| darkblue | `#00008B` <img valign='middle' alt='darkblue' src='https://readme-swatches.vercel.app/00008B'/> |
| darkcyan | `#008B8B` <img valign='middle' alt='darkcyan' src='https://readme-swatches.vercel.app/008B8B'/> |
| darkgoldenrod | `#B8860B` <img valign='middle' alt='darkgoldenrod' src='https://readme-swatches.vercel.app/B8860B'/> |
| darkgray | `#A9A9A9` <img valign='middle' alt='darkgray' src='https://readme-swatches.vercel.app/A9A9A9'/> |
| darkgreen | `#006400` <img valign='middle' alt='darkgreen' src='https://readme-swatches.vercel.app/006400'/> |
| darkgrey | `#A9A9A9` <img valign='middle' alt='darkgrey' src='https://readme-swatches.vercel.app/A9A9A9'/> |
| darkkhaki | `#BDB76B` <img valign='middle' alt='darkkhaki' src='https://readme-swatches.vercel.app/BDB76B'/> |
| darkmagenta | `#8B008B` <img valign='middle' alt='darkmagenta' src='https://readme-swatches.vercel.app/8B008B'/> |
| darkolivegreen | `#556B2F` <img valign='middle' alt='darkolivegreen' src='https://readme-swatches.vercel.app/556B2F'/> |
| darkorange | `#FF8C00` <img valign='middle' alt='darkorange' src='https://readme-swatches.vercel.app/FF8C00'/> |
| darkorchid | `#9932CC` <img valign='middle' alt='darkorchid' src='https://readme-swatches.vercel.app/9932CC'/> |
| darkred | `#8B0000` <img valign='middle' alt='darkred' src='https://readme-swatches.vercel.app/8B0000'/> |
| darksalmon | `#E9967A` <img valign='middle' alt='darksalmon' src='https://readme-swatches.vercel.app/E9967A'/> |
| darkseagreen | `#8FBC8F` <img valign='middle' alt='darkseagreen' src='https://readme-swatches.vercel.app/8FBC8F'/> |
| darkslateblue | `#483D8B` <img valign='middle' alt='darkslateblue' src='https://readme-swatches.vercel.app/483D8B'/> |
| darkslategray | `#2F4F4F` <img valign='middle' alt='darkslategray' src='https://readme-swatches.vercel.app/2F4F4F'/> |
| darkslategrey | `#2F4F4F` <img valign='middle' alt='darkslategrey' src='https://readme-swatches.vercel.app/2F4F4F'/> |
| darkturquoise | `#00CED1` <img valign='middle' alt='darkturquoise' src='https://readme-swatches.vercel.app/00CED1'/> |
| darkviolet | `#9400D3` <img valign='middle' alt='darkviolet' src='https://readme-swatches.vercel.app/9400D3'/> |
| deeppink | `#FF1493` <img valign='middle' alt='deeppink' src='https://readme-swatches.vercel.app/FF1493'/> |
| deepskyblue | `#00BFFF` <img valign='middle' alt='deepskyblue' src='https://readme-swatches.vercel.app/00BFFF'/> |
| dimgray | `#696969` <img valign='middle' alt='dimgray' src='https://readme-swatches.vercel.app/696969'/> |
| dimgrey | `#696969` <img valign='middle' alt='dimgrey' src='https://readme-swatches.vercel.app/696969'/> |
| dodgerblue | `#1E90FF` <img valign='middle' alt='dodgerblue' src='https://readme-swatches.vercel.app/1E90FF'/> |
| firebrick | `#B22222` <img valign='middle' alt='firebrick' src='https://readme-swatches.vercel.app/B22222'/> |
| floralwhite | `#FFFAF0` <img valign='middle' alt='floralwhite' src='https://readme-swatches.vercel.app/FFFAF0'/> |
| forestgreen | `#228B22` <img valign='middle' alt='forestgreen' src='https://readme-swatches.vercel.app/228B22'/> |
| fuchsia | `#FF00FF` <img valign='middle' alt='fuchsia' src='https://readme-swatches.vercel.app/FF00FF'/> |
| gainsboro | `#DCDCDC` <img valign='middle' alt='gainsboro' src='https://readme-swatches.vercel.app/DCDCDC'/> |
| ghostwhite | `#F8F8FF` <img valign='middle' alt='ghostwhite' src='https://readme-swatches.vercel.app/F8F8FF'/> |
| gold | `#FFD700` <img valign='middle' alt='gold' src='https://readme-swatches.vercel.app/FFD700'/> |
| goldenrod | `#DAA520` <img valign='middle' alt='goldenrod' src='https://readme-swatches.vercel.app/DAA520'/> |
| gray | `#808080` <img valign='middle' alt='gray' src='https://readme-swatches.vercel.app/808080'/> |
| green | `#008000` <img valign='middle' alt='green' src='https://readme-swatches.vercel.app/008000'/> |
| greenyellow | `#ADFF2F` <img valign='middle' alt='greenyellow' src='https://readme-swatches.vercel.app/ADFF2F'/> |
| grey | `#808080` <img valign='middle' alt='grey' src='https://readme-swatches.vercel.app/808080'/> |
| honeydew | `#F0FFF0` <img valign='middle' alt='honeydew' src='https://readme-swatches.vercel.app/F0FFF0'/> |
| hotpink | `#FF69B4` <img valign='middle' alt='hotpink' src='https://readme-swatches.vercel.app/FF69B4'/> |
| indianred | `#CD5C5C` <img valign='middle' alt='indianred' src='https://readme-swatches.vercel.app/CD5C5C'/> |
| indigo | `#4B0082` <img valign='middle' alt='indigo' src='https://readme-swatches.vercel.app/4B0082'/> |
| ivory | `#FFFFF0` <img valign='middle' alt='ivory' src='https://readme-swatches.vercel.app/FFFFF0'/> |
| khaki | `#F0E68C` <img valign='middle' alt='khaki' src='https://readme-swatches.vercel.app/F0E68C'/> |
| lavender | `#E6E6FA` <img valign='middle' alt='lavender' src='https://readme-swatches.vercel.app/E6E6FA'/> |
| lavenderblush | `#FFF0F5` <img valign='middle' alt='lavenderblush' src='https://readme-swatches.vercel.app/FFF0F5'/> |
| lawngreen | `#7CFC00` <img valign='middle' alt='lawngreen' src='https://readme-swatches.vercel.app/7CFC00'/> |
| lemonchiffon | `#FFFACD` <img valign='middle' alt='lemonchiffon' src='https://readme-swatches.vercel.app/FFFACD'/> |
| lightblue | `#ADD8E6` <img valign='middle' alt='lightblue' src='https://readme-swatches.vercel.app/ADD8E6'/> |
| lightcoral | `#F08080` <img valign='middle' alt='lightcoral' src='https://readme-swatches.vercel.app/F08080'/> |
| lightcyan | `#E0FFFF` <img valign='middle' alt='lightcyan' src='https://readme-swatches.vercel.app/E0FFFF'/> |
| lightgoldenrodyellow | `#FAFAD2` <img valign='middle' alt='lightgoldenrodyellow' src='https://readme-swatches.vercel.app/FAFAD2'/> |
| lightgray | `#D3D3D3` <img valign='middle' alt='lightgray' src='https://readme-swatches.vercel.app/D3D3D3'/> |
| lightgreen | `#90EE90` <img valign='middle' alt='lightgreen' src='https://readme-swatches.vercel.app/90EE90'/> |
| lightgrey | `#D3D3D3` <img valign='middle' alt='lightgrey' src='https://readme-swatches.vercel.app/D3D3D3'/> |
| lightpink | `#FFB6C1` <img valign='middle' alt='lightpink' src='https://readme-swatches.vercel.app/FFB6C1'/> |
| lightsalmon | `#FFA07A` <img valign='middle' alt='lightsalmon' src='https://readme-swatches.vercel.app/FFA07A'/> |
| lightseagreen | `#20B2AA` <img valign='middle' alt='lightseagreen' src='https://readme-swatches.vercel.app/20B2AA'/> |
| lightskyblue | `#87CEFA` <img valign='middle' alt='lightskyblue' src='https://readme-swatches.vercel.app/87CEFA'/> |
| lightslategray | `#778899` <img valign='middle' alt='lightslategray' src='https://readme-swatches.vercel.app/778899'/> |
| lightslategrey | `#778899` <img valign='middle' alt='lightslategrey' src='https://readme-swatches.vercel.app/778899'/> |
| lightsteelblue | `#B0C4DE` <img valign='middle' alt='lightsteelblue' src='https://readme-swatches.vercel.app/B0C4DE'/> |
| lightyellow | `#FFFFE0` <img valign='middle' alt='lightyellow' src='https://readme-swatches.vercel.app/FFFFE0'/> |
| lime | `#00FF00` <img valign='middle' alt='lime' src='https://readme-swatches.vercel.app/00FF00'/> |
| limegreen | `#32CD32` <img valign='middle' alt='limegreen' src='https://readme-swatches.vercel.app/32CD32'/> |
| linen | `#FAF0E6` <img valign='middle' alt='linen' src='https://readme-swatches.vercel.app/FAF0E6'/> |
| magenta | `#FF00FF` <img valign='middle' alt='magenta' src='https://readme-swatches.vercel.app/FF00FF'/> |
| maroon | `#800000` <img valign='middle' alt='maroon' src='https://readme-swatches.vercel.app/800000'/> |
| mediumaquamarine | `#66CDAA` <img valign='middle' alt='mediumaquamarine' src='https://readme-swatches.vercel.app/66CDAA'/> |
| mediumblue | `#0000CD` <img valign='middle' alt='mediumblue' src='https://readme-swatches.vercel.app/0000CD'/> |
| mediumorchid | `#BA55D3` <img valign='middle' alt='mediumorchid' src='https://readme-swatches.vercel.app/BA55D3'/> |
| mediumpurple | `#9370DB` <img valign='middle' alt='mediumpurple' src='https://readme-swatches.vercel.app/9370DB'/> |
| mediumseagreen | `#3CB371` <img valign='middle' alt='mediumseagreen' src='https://readme-swatches.vercel.app/3CB371'/> |
| mediumslateblue | `#7B68EE` <img valign='middle' alt='mediumslateblue' src='https://readme-swatches.vercel.app/7B68EE'/> |
| mediumspringgreen | `#00FA9A` <img valign='middle' alt='mediumspringgreen' src='https://readme-swatches.vercel.app/00FA9A'/> |
| mediumturquoise | `#48D1CC` <img valign='middle' alt='mediumturquoise' src='https://readme-swatches.vercel.app/48D1CC'/> |
| mediumvioletred | `#C71585` <img valign='middle' alt='mediumvioletred' src='https://readme-swatches.vercel.app/C71585'/> |
| midnightblue | `#191970` <img valign='middle' alt='midnightblue' src='https://readme-swatches.vercel.app/191970'/> |
| mintcream | `#F5FFFA` <img valign='middle' alt='mintcream' src='https://readme-swatches.vercel.app/F5FFFA'/> |
| mistyrose | `#FFE4E1` <img valign='middle' alt='mistyrose' src='https://readme-swatches.vercel.app/FFE4E1'/> |
| moccasin | `#FFE4B5` <img valign='middle' alt='moccasin' src='https://readme-swatches.vercel.app/FFE4B5'/> |
| navajowhite | `#FFDEAD` <img valign='middle' alt='navajowhite' src='https://readme-swatches.vercel.app/FFDEAD'/> |
| navy | `#000080` <img valign='middle' alt='navy' src='https://readme-swatches.vercel.app/000080'/> |
| oldlace | `#FDF5E6` <img valign='middle' alt='oldlace' src='https://readme-swatches.vercel.app/FDF5E6'/> |
| olive | `#808000` <img valign='middle' alt='olive' src='https://readme-swatches.vercel.app/808000'/> |
| olivedrab | `#6B8E23` <img valign='middle' alt='olivedrab' src='https://readme-swatches.vercel.app/6B8E23'/> |
| orange | `#FFA500` <img valign='middle' alt='orange' src='https://readme-swatches.vercel.app/FFA500'/> |
| orangered | `#FF4500` <img valign='middle' alt='orangered' src='https://readme-swatches.vercel.app/FF4500'/> |
| orchid | `#DA70D6` <img valign='middle' alt='orchid' src='https://readme-swatches.vercel.app/DA70D6'/> |
| palegoldenrod | `#EEE8AA` <img valign='middle' alt='palegoldenrod' src='https://readme-swatches.vercel.app/EEE8AA'/> |
| palegreen | `#98FB98` <img valign='middle' alt='palegreen' src='https://readme-swatches.vercel.app/98FB98'/> |
| paleturquoise | `#AFEEEE` <img valign='middle' alt='paleturquoise' src='https://readme-swatches.vercel.app/AFEEEE'/> |
| palevioletred | `#DB7093` <img valign='middle' alt='palevioletred' src='https://readme-swatches.vercel.app/DB7093'/> |
| papayawhip | `#FFEFD5` <img valign='middle' alt='papayawhip' src='https://readme-swatches.vercel.app/FFEFD5'/> |
| peachpuff | `#FFDAB9` <img valign='middle' alt='peachpuff' src='https://readme-swatches.vercel.app/FFDAB9'/> |
| peru | `#CD853F` <img valign='middle' alt='peru' src='https://readme-swatches.vercel.app/CD853F'/> |
| pink | `#FFC0CB` <img valign='middle' alt='pink' src='https://readme-swatches.vercel.app/FFC0CB'/> |
| plum | `#DDA0DD` <img valign='middle' alt='plum' src='https://readme-swatches.vercel.app/DDA0DD'/> |
| powderblue | `#B0E0E6` <img valign='middle' alt='powderblue' src='https://readme-swatches.vercel.app/B0E0E6'/> |
| purple | `#800080` <img valign='middle' alt='purple' src='https://readme-swatches.vercel.app/800080'/> |
| rebeccapurple | `#663399` <img valign='middle' alt='rebeccapurple' src='https://readme-swatches.vercel.app/663399'/> |
| red | `#FF0000` <img valign='middle' alt='red' src='https://readme-swatches.vercel.app/FF0000'/> |
| rosybrown | `#BC8F8F` <img valign='middle' alt='rosybrown' src='https://readme-swatches.vercel.app/BC8F8F'/> |
| royalblue | `#4169E1` <img valign='middle' alt='royalblue' src='https://readme-swatches.vercel.app/4169E1'/> |
| saddlebrown | `#8B4513` <img valign='middle' alt='saddlebrown' src='https://readme-swatches.vercel.app/8B4513'/> |
| salmon | `#FA8072` <img valign='middle' alt='salmon' src='https://readme-swatches.vercel.app/FA8072'/> |
| sandybrown | `#F4A460` <img valign='middle' alt='sandybrown' src='https://readme-swatches.vercel.app/F4A460'/> |
| seagreen | `#2E8B57` <img valign='middle' alt='seagreen' src='https://readme-swatches.vercel.app/2E8B57'/> |
| seashell | `#FFF5EE` <img valign='middle' alt='seashell' src='https://readme-swatches.vercel.app/FFF5EE'/> |
| sienna | `#A0522D` <img valign='middle' alt='sienna' src='https://readme-swatches.vercel.app/A0522D'/> |
| silver | `#C0C0C0` <img valign='middle' alt='silver' src='https://readme-swatches.vercel.app/C0C0C0'/> |
| skyblue | `#87CEEB` <img valign='middle' alt='skyblue' src='https://readme-swatches.vercel.app/87CEEB'/> |
| slateblue | `#6A5ACD` <img valign='middle' alt='slateblue' src='https://readme-swatches.vercel.app/6A5ACD'/> |
| slategray | `#708090` <img valign='middle' alt='slategray' src='https://readme-swatches.vercel.app/708090'/> |
| slategrey | `#708090` <img valign='middle' alt='slategrey' src='https://readme-swatches.vercel.app/708090'/> |
| snow | `#FFFAFA` <img valign='middle' alt='snow' src='https://readme-swatches.vercel.app/FFFAFA'/> |
| springgreen | `#00FF7F` <img valign='middle' alt='springgreen' src='https://readme-swatches.vercel.app/00FF7F'/> |
| steelblue | `#4682B4` <img valign='middle' alt='steelblue' src='https://readme-swatches.vercel.app/4682B4'/> |
| tan | `#D2B48C` <img valign='middle' alt='tan' src='https://readme-swatches.vercel.app/D2B48C'/> |
| teal | `#008080` <img valign='middle' alt='teal' src='https://readme-swatches.vercel.app/008080'/> |
| thistle | `#D8BFD8` <img valign='middle' alt='thistle' src='https://readme-swatches.vercel.app/D8BFD8'/> |
| tomato | `#FF6347` <img valign='middle' alt='tomato' src='https://readme-swatches.vercel.app/FF6347'/> |
| turquoise | `#40E0D0` <img valign='middle' alt='turquoise' src='https://readme-swatches.vercel.app/40E0D0'/> |
| violet | `#EE82EE` <img valign='middle' alt='violet' src='https://readme-swatches.vercel.app/EE82EE'/> |
| wheat | `#F5DEB3` <img valign='middle' alt='wheat' src='https://readme-swatches.vercel.app/F5DEB3'/> |
| white | `#FFFFFF` <img valign='middle' alt='white' src='https://readme-swatches.vercel.app/FFFFFF'/> |
| whitesmoke | `#F5F5F5` <img valign='middle' alt='whitesmoke' src='https://readme-swatches.vercel.app/F5F5F5'/> |
| yellow | `#FFFF00` <img valign='middle' alt='yellow' src='https://readme-swatches.vercel.app/FFFF00'/> |
| yellowgreen | `#9ACD32` <img valign='middle' alt='yellowgreen' src='https://readme-swatches.vercel.app/9ACD32'/> |
