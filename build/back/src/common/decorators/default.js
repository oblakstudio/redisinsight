"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
const class_transformer_1 = require("class-transformer");
const lodash_1 = require("lodash");
function Default(defaultValue) {
    return (0, class_transformer_1.Transform)((value) => value !== null && value !== void 0 ? value : (0, lodash_1.cloneDeep)(defaultValue));
}
exports.Default = Default;
