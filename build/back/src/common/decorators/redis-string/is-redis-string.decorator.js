"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsRedisString = void 0;
const class_validator_1 = require("class-validator");
const validators_1 = require("../../validators");
function IsRedisString(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'IsRedisString',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: validators_1.RedisStringValidator,
        });
    };
}
exports.IsRedisString = IsRedisString;
