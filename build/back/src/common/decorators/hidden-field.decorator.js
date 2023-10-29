"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HiddenField = void 0;
const class_transformer_1 = require("class-transformer");
function HiddenField(field) {
    return (0, class_transformer_1.Transform)((value) => (value ? field : undefined), {
        toPlainOnly: true,
    });
}
exports.HiddenField = HiddenField;
