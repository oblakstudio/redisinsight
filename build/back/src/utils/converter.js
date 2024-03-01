"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertStringToNumber = exports.convertIntToSemanticVersion = void 0;
const lodash_1 = require("lodash");
const convertIntToSemanticVersion = (input) => {
    const separator = '.';
    try {
        if ((0, lodash_1.isInteger)(input) && input > 0) {
            const version = String(input).padStart(6, '0');
            const patch = parseInt(version.slice(-2), 10);
            const minor = parseInt(version.slice(-4, -2), 10);
            const major = parseInt(version.slice(0, -4), 10);
            return [major, minor, patch].join(separator);
        }
        return undefined;
    }
    catch (e) {
        return undefined;
    }
};
exports.convertIntToSemanticVersion = convertIntToSemanticVersion;
const convertStringToNumber = (value, defaultValue) => {
    if ((0, lodash_1.isNumber)(value)) {
        return value;
    }
    if (!(0, lodash_1.isString)(value) || !value) {
        return defaultValue;
    }
    const num = parseFloat(value);
    if ((0, lodash_1.isNaN)(num)) {
        return defaultValue;
    }
    return num;
};
exports.convertStringToNumber = convertStringToNumber;
