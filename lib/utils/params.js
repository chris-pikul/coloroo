"use strict";
/**
 * Copyright © 2021 Chris Pikul.
 *
 * This code base (coloroo) is under the MIT license. See the file at the
 * project root "LICENSE" for more information.
 * -----------------------------------------------------------------------------
 *
 * Provides common parameter methods for use with functional-notation values.
 *
 * @module Utilities
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertParam = exports.detectParamType = exports.ParameterType = void 0;
const regexp_1 = require("./regexp");
exports.ParameterType = {
    UNKNOWN: 'UNKNOWN',
    NONE: 'NONE',
    INTEGER: 'INTEGER',
    FLOAT: 'FLOAT',
    PERCENTAGE: 'PERCENTAGE',
};
/**
 * Attempts to guess the type the given parameter is.
 *
 * @param param Input parameter string
 * @returns ParameterType enum
 */
function detectParamType(param) {
    const clnStr = param.trim().toLowerCase();
    if (clnStr === 'none')
        return exports.ParameterType.NONE;
    if (regexp_1.regexpInteger.test(clnStr))
        return exports.ParameterType.INTEGER;
    if (regexp_1.regexpPercent.test(clnStr))
        return exports.ParameterType.PERCENTAGE;
    if (regexp_1.regexpNumber.test(clnStr))
        return exports.ParameterType.FLOAT;
    return exports.ParameterType.UNKNOWN;
}
exports.detectParamType = detectParamType;
;
function convertParam(param) {
    const paramStr = param.toString();
    const detect = detectParamType(paramStr);
    let value;
    switch (detect) {
        case exports.ParameterType.INTEGER:
            value = parseInt(paramStr);
            break;
        case exports.ParameterType.FLOAT:
            value = parseFloat(paramStr);
            break;
        case exports.ParameterType.PERCENTAGE:
            value = parseFloat(paramStr.substring(0, paramStr.indexOf('%'))) / 100;
            break;
        default:
            value = 0;
    }
    return {
        original: param,
        type: detect,
        value,
    };
}
exports.convertParam = convertParam;
//# sourceMappingURL=params.js.map