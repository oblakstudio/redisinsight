"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMerge = void 0;
const lodash_1 = require("lodash");
const deepMerge = (target, source) => (0, lodash_1.mergeWith)(target, source, (targetValue, sourceValue) => {
    if ((0, lodash_1.isUndefined)(sourceValue)) {
        return targetValue;
    }
    if ((0, lodash_1.isObjectLike)(sourceValue) && !(0, lodash_1.isArray)(sourceValue) && !(0, lodash_1.isArray)(targetValue)) {
        return (0, exports.deepMerge)(targetValue, sourceValue);
    }
    return sourceValue;
});
exports.deepMerge = deepMerge;
