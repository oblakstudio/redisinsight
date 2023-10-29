"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ObjectAsMap = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
function ObjectAsMap(targetClass) {
    return (0, common_1.applyDecorators)((0, class_transformer_1.Transform)((object = {}) => {
        const result = new Map();
        try {
            (0, lodash_1.forEach)(object, (value, key) => {
                result.set(key, (0, class_transformer_1.plainToClass)(targetClass, value));
            });
            return result;
        }
        catch (e) {
            return result;
        }
    }, { toClassOnly: true }), (0, class_transformer_1.Transform)((map) => {
        try {
            const result = {};
            (0, lodash_1.forEach)(Array.from(map), ([key, value]) => {
                result[key] = (0, class_transformer_1.classToPlain)(value);
            });
            return result;
        }
        catch (e) {
            return undefined;
        }
    }, { toPlainOnly: true }));
}
exports.ObjectAsMap = ObjectAsMap;
