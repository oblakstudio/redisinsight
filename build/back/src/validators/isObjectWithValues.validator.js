"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsObjectWithValues = void 0;
const class_validator_1 = require("class-validator");
function IsObjectWithValues(valueValidators, validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'IsObjectWithValues',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(data) {
                    if (!(0, class_validator_1.isObject)(data))
                        return false;
                    for (const value of Object.values(data)) {
                        const isInvalidValue = valueValidators.some((validator) => !validator(value));
                        if (isInvalidValue) {
                            return false;
                        }
                    }
                    return true;
                },
                defaultMessage(validationArguments) {
                    return `${validationArguments.property} should be a valid object with proper values`;
                },
            },
        });
    };
}
exports.IsObjectWithValues = IsObjectWithValues;
