"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiNumberValidator = void 0;
const lodash_1 = require("lodash");
const class_validator_1 = require("class-validator");
let MultiNumberValidator = class MultiNumberValidator {
    async validate(value) {
        if (!(0, lodash_1.isArray)(value)) {
            return false;
        }
        return value.every((numbersArray) => {
            if (!(0, lodash_1.isArray)(numbersArray)) {
                return false;
            }
            return numbersArray.every(lodash_1.isNumber);
        });
    }
    defaultMessage(args) {
        return `${args.property || 'field'} must be a multidimensional array of numbers`;
    }
};
MultiNumberValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'MultiNumberValidator', async: true })
], MultiNumberValidator);
exports.MultiNumberValidator = MultiNumberValidator;
