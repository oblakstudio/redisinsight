"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisStringValidator = void 0;
const lodash_1 = require("lodash");
const class_validator_1 = require("class-validator");
let RedisStringValidator = class RedisStringValidator {
    async validate(value) {
        return (0, lodash_1.isString)(value) || value instanceof Buffer;
    }
    defaultMessage(args) {
        return `${args.property || 'field'} must be a string or a Buffer`;
    }
};
RedisStringValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'RedisStringValidator', async: true })
], RedisStringValidator);
exports.RedisStringValidator = RedisStringValidator;
