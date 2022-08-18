/**
 * Copyright © 2021 Chris Pikul.
 *
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 *
 * An object-map of the named colors or "X11 Color Set" as defined currently
 * in the CSS4 spec.
 *
 * https://www.w3.org/TR/css-color-4/#typedef-named-color
 *
 * @module RGB
 */
/**
 * A key-value record of the known named colors (aka X11 Color Set) as defined
 * by the CSS4 spec.
 *
 * Each key is the string name given (ex. "gold"), matching to it's hexidecimal
 * color notation as a string (ex. "#FFD700").
 */
export declare const NamedColors: {
    readonly aliceblue: "#F0F8FF";
    readonly antiquewhite: "#FAEBD7";
    readonly aqua: "#00FFFF";
    readonly aquamarine: "#7FFFD4";
    readonly azure: "#F0FFFF";
    readonly beige: "#F5F5DC";
    readonly bisque: "#FFE4C4";
    readonly black: "#000000";
    readonly blanchedalmond: "#FFEBCD";
    readonly blue: "#0000FF";
    readonly blueviolet: "#8A2BE2";
    readonly brown: "#A52A2A";
    readonly burlywood: "#DEB887";
    readonly cadetblue: "#5F9EA0";
    readonly chartreuse: "#7FFF00";
    readonly chocolate: "#D2691E";
    readonly coral: "#FF7F50";
    readonly cornflowerblue: "#6495ED";
    readonly cornsilk: "#FFF8DC";
    readonly crimson: "#DC143C";
    readonly cyan: "#00FFFF";
    readonly darkblue: "#00008B";
    readonly darkcyan: "#008B8B";
    readonly darkgoldenrod: "#B8860B";
    readonly darkgray: "#A9A9A9";
    readonly darkgreen: "#006400";
    readonly darkgrey: "#A9A9A9";
    readonly darkkhaki: "#BDB76B";
    readonly darkmagenta: "#8B008B";
    readonly darkolivegreen: "#556B2F";
    readonly darkorange: "#FF8C00";
    readonly darkorchid: "#9932CC";
    readonly darkred: "#8B0000";
    readonly darksalmon: "#E9967A";
    readonly darkseagreen: "#8FBC8F";
    readonly darkslateblue: "#483D8B";
    readonly darkslategray: "#2F4F4F";
    readonly darkslategrey: "#2F4F4F";
    readonly darkturquoise: "#00CED1";
    readonly darkviolet: "#9400D3";
    readonly deeppink: "#FF1493";
    readonly deepskyblue: "#00BFFF";
    readonly dimgray: "#696969";
    readonly dimgrey: "#696969";
    readonly dodgerblue: "#1E90FF";
    readonly firebrick: "#B22222";
    readonly floralwhite: "#FFFAF0";
    readonly forestgreen: "#228B22";
    readonly fuchsia: "#FF00FF";
    readonly gainsboro: "#DCDCDC";
    readonly ghostwhite: "#F8F8FF";
    readonly gold: "#FFD700";
    readonly goldenrod: "#DAA520";
    readonly gray: "#808080";
    readonly green: "#008000";
    readonly greenyellow: "#ADFF2F";
    readonly grey: "#808080";
    readonly honeydew: "#F0FFF0";
    readonly hotpink: "#FF69B4";
    readonly indianred: "#CD5C5C";
    readonly indigo: "#4B0082";
    readonly ivory: "#FFFFF0";
    readonly khaki: "#F0E68C";
    readonly lavender: "#E6E6FA";
    readonly lavenderblush: "#FFF0F5";
    readonly lawngreen: "#7CFC00";
    readonly lemonchiffon: "#FFFACD";
    readonly lightblue: "#ADD8E6";
    readonly lightcoral: "#F08080";
    readonly lightcyan: "#E0FFFF";
    readonly lightgoldenrodyellow: "#FAFAD2";
    readonly lightgray: "#D3D3D3";
    readonly lightgreen: "#90EE90";
    readonly lightgrey: "#D3D3D3";
    readonly lightpink: "#FFB6C1";
    readonly lightsalmon: "#FFA07A";
    readonly lightseagreen: "#20B2AA";
    readonly lightskyblue: "#87CEFA";
    readonly lightslategray: "#778899";
    readonly lightslategrey: "#778899";
    readonly lightsteelblue: "#B0C4DE";
    readonly lightyellow: "#FFFFE0";
    readonly lime: "#00FF00";
    readonly limegreen: "#32CD32";
    readonly linen: "#FAF0E6";
    readonly magenta: "#FF00FF";
    readonly maroon: "#800000";
    readonly mediumaquamarine: "#66CDAA";
    readonly mediumblue: "#0000CD";
    readonly mediumorchid: "#BA55D3";
    readonly mediumpurple: "#9370DB";
    readonly mediumseagreen: "#3CB371";
    readonly mediumslateblue: "#7B68EE";
    readonly mediumspringgreen: "#00FA9A";
    readonly mediumturquoise: "#48D1CC";
    readonly mediumvioletred: "#C71585";
    readonly midnightblue: "#191970";
    readonly mintcream: "#F5FFFA";
    readonly mistyrose: "#FFE4E1";
    readonly moccasin: "#FFE4B5";
    readonly navajowhite: "#FFDEAD";
    readonly navy: "#000080";
    readonly oldlace: "#FDF5E6";
    readonly olive: "#808000";
    readonly olivedrab: "#6B8E23";
    readonly orange: "#FFA500";
    readonly orangered: "#FF4500";
    readonly orchid: "#DA70D6";
    readonly palegoldenrod: "#EEE8AA";
    readonly palegreen: "#98FB98";
    readonly paleturquoise: "#AFEEEE";
    readonly palevioletred: "#DB7093";
    readonly papayawhip: "#FFEFD5";
    readonly peachpuff: "#FFDAB9";
    readonly peru: "#CD853F";
    readonly pink: "#FFC0CB";
    readonly plum: "#DDA0DD";
    readonly powderblue: "#B0E0E6";
    readonly purple: "#800080";
    readonly rebeccapurple: "#663399";
    readonly red: "#FF0000";
    readonly rosybrown: "#BC8F8F";
    readonly royalblue: "#4169E1";
    readonly saddlebrown: "#8B4513";
    readonly salmon: "#FA8072";
    readonly sandybrown: "#F4A460";
    readonly seagreen: "#2E8B57";
    readonly seashell: "#FFF5EE";
    readonly sienna: "#A0522D";
    readonly silver: "#C0C0C0";
    readonly skyblue: "#87CEEB";
    readonly slateblue: "#6A5ACD";
    readonly slategray: "#708090";
    readonly slategrey: "#708090";
    readonly snow: "#FFFAFA";
    readonly springgreen: "#00FF7F";
    readonly steelblue: "#4682B4";
    readonly tan: "#D2B48C";
    readonly teal: "#008080";
    readonly thistle: "#D8BFD8";
    readonly tomato: "#FF6347";
    readonly turquoise: "#40E0D0";
    readonly violet: "#EE82EE";
    readonly wheat: "#F5DEB3";
    readonly white: "#FFFFFF";
    readonly whitesmoke: "#F5F5F5";
    readonly yellow: "#FFFF00";
    readonly yellowgreen: "#9ACD32";
};
export declare type ENamedColor = keyof typeof NamedColors;
export default NamedColors;
