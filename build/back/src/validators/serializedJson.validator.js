"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SerializedJsonValidator = void 0;
const class_validator_1 = require("class-validator");
let SerializedJsonValidator = class SerializedJsonValidator {
    validate(data) {
        try {
            JSON.parse(data);
        }
        catch {
            return false;
        }
        return true;
    }
    defaultMessage(data) {
        return `${data.property} should be a correct serialized json string`;
    }
};
SerializedJsonValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'serialized-json', async: false })
], SerializedJsonValidator);
exports.SerializedJsonValidator = SerializedJsonValidator;
