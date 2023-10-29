"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneClassInstance = exports.classToClass = void 0;
const class_transformer_1 = require("class-transformer");
function classToClass(targetClass, classInstance, options) {
    const defaultOptions = {
        excludeExtraneousValues: true,
        groups: ['security'],
    };
    const transformOptions = {
        ...defaultOptions,
        ...options,
    };
    return (0, class_transformer_1.plainToClass)(targetClass, (0, class_transformer_1.classToPlain)(classInstance, transformOptions), transformOptions);
}
exports.classToClass = classToClass;
const cloneClassInstance = (entity) => classToClass(entity.constructor, entity);
exports.cloneClassInstance = cloneClassInstance;
