"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsGitHubLink = void 0;
const class_validator_1 = require("class-validator");
const validators_1 = require("../validators");
function IsGitHubLink(validationOptions) {
    return (object, propertyName) => {
        (0, class_validator_1.registerDecorator)({
            name: 'IsGitHubLink',
            target: object.constructor,
            propertyName,
            constraints: [],
            options: validationOptions,
            validator: validators_1.GitHubLink,
        });
    };
}
exports.IsGitHubLink = IsGitHubLink;
