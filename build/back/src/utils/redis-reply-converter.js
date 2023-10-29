"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseClusterNodes = exports.convertRedisInfoReplyToObject = exports.convertBulkStringsToObject = void 0;
const convertBulkStringsToObject = (info, entitiesSeparator = '\r\n', KVSeparator = ':') => {
    const entities = info.split(entitiesSeparator);
    try {
        const obj = {};
        entities.forEach((line) => {
            if (line && line.split) {
                const keyValuePair = line.split(KVSeparator);
                if (keyValuePair.length > 1) {
                    const key = keyValuePair.shift();
                    obj[key] = keyValuePair.join(KVSeparator);
                }
            }
        });
        return obj;
    }
    catch (e) {
        return {};
    }
};
exports.convertBulkStringsToObject = convertBulkStringsToObject;
const convertRedisInfoReplyToObject = (info) => {
    try {
        const result = {};
        const sections = info.match(/(?<=#\s+).*?(?=[\n,\r])/g);
        const values = info.split(/#.*?[\n,\r]/g);
        values.shift();
        sections.forEach((section, index) => {
            result[section.toLowerCase()] = (0, exports.convertBulkStringsToObject)(values[index].trim());
        });
        return result;
    }
    catch (e) {
        return {};
    }
};
exports.convertRedisInfoReplyToObject = convertRedisInfoReplyToObject;
const parseClusterNodes = (info) => {
    const lines = info.split('\n');
    try {
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
exports.parseClusterNodes = parseClusterNodes;
