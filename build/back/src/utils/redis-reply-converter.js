"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertRedisInfoReplyToObject = void 0;
const utils_1 = require("../modules/redis/utils");
const convertRedisInfoReplyToObject = (info) => {
    try {
        const result = {};
        const sections = info.match(/(?<=#\s+).*?(?=[\n,\r])/g);
        const values = info.split(/#.*?[\n,\r]/g);
        values.shift();
        sections.forEach((section, index) => {
            result[section.toLowerCase()] = (0, utils_1.convertMultilineReplyToObject)(values[index].trim());
        });
        return result;
    }
    catch (e) {
        return {};
    }
};
exports.convertRedisInfoReplyToObject = convertRedisInfoReplyToObject;
