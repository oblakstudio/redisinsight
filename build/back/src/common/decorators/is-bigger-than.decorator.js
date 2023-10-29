"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsBiggerThan = void 0;
const class_validator_1 = require("class-validator");
const bigger_than_validator_1 = require("../validators/bigger-than.validator");
function IsBiggerThan(property, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'IsBiggerThan',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: bigger_than_validator_1.BiggerThan,
        });
    };
}
exports.IsBiggerThan = IsBiggerThan;
