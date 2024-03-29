"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseNodesFromClusterInfoReply = exports.convertMultilineReplyToObject = exports.convertArrayReplyToObject = void 0;
const lodash_1 = require("lodash");
const convertArrayReplyToObject = (input, options = {}) => (0, lodash_1.chunk)(input, 2).reduce((prev, current) => {
    const [key, value] = current;
    return {
        ...prev,
        [key.toString().toLowerCase()]: options.utf && !(0, lodash_1.isArray)(value) ? value === null || value === void 0 ? void 0 : value.toString() : value,
    };
}, {});
exports.convertArrayReplyToObject = convertArrayReplyToObject;
const convertMultilineReplyToObject = (info, lineSeparator = '\r\n', valueSeparator = ':') => {
    try {
        const lines = info.split(lineSeparator);
        const obj = {};
        lines.forEach((line) => {
            if (line && line.split) {
                const keyValuePair = line.split(valueSeparator);
                if (keyValuePair.length > 1) {
                    const key = keyValuePair.shift();
                    obj[key] = keyValuePair.join(valueSeparator);
                }
            }
        });
        return obj;
    }
    catch (e) {
        return {};
    }
};
exports.convertMultilineReplyToObject = convertMultilineReplyToObject;
const parseNodesFromClusterInfoReply = (info) => {
    try {
        const lines = info.split('\n');
        const nodes = [];
        lines.forEach((line) => {
            if (line && line.split) {
                const fields = line.split(' ');
                const [id, endpoint, , master, , , , linkState, slot,] = fields;
                const host = endpoint.split(':')[0];
                const port = endpoint.split(':')[1].split('@')[0];
                nodes.push({
                    id,
                    host,
                    port: parseInt(port, 10),
                    replicaOf: master !== '-' ? master : undefined,
                    linkState,
                    slot,
                });
            }
        });
        return nodes;
    }
    catch (e) {
        return [];
    }
};
exports.parseNodesFromClusterInfoReply = parseNodesFromClusterInfoReply;
