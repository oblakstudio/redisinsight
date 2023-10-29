"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isJson = exports.numberWithSpaces = exports.sortByNumberField = void 0;
const lodash_1 = require("lodash");
const sortByNumberField = (items, field) => (0, lodash_1.sortBy)(items, (o) => (o && (0, lodash_1.isNumber)(o[field]) ? o[field] : -Infinity));
exports.sortByNumberField = sortByNumberField;
const numberWithSpaces = (number = 0) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
exports.numberWithSpaces = numberWithSpaces;
const isJson = (item) => {
    let value = typeof item !== "string" ? JSON.stringify(item) : item;
    try {
        value = JSON.parse(value);
    }
    catch (e) {
        return false;
    }
    return typeof value === "object" && value !== null;
};
exports.isJson = isJson;
