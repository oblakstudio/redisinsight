"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsMultiNumber = void 0;
const class_validator_1 = require("class-validator");
const validators_1 = require("../validators");
function IsMultiNumber(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'IsMultiNumber',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: validators_1.MultiNumberValidator,
        });
    };
}
exports.IsMultiNumber = IsMultiNumber;
