"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseClusterCursor = exports.isClusterCursorValid = void 0;
const error_messages_1 = require("../../../constants/error-messages");
const NODES_SEPARATOR = '||';
const CURSOR_SEPARATOR = '@';
const CLUSTER_CURSOR_REGEX = /^(([a-z0-9.:-])+:[0-9]+(@-?\d+)(?:\|{2}(?!$)|$))+$/;
const isClusterCursorValid = (cursor) => CLUSTER_CURSOR_REGEX.test(cursor);
exports.isClusterCursorValid = isClusterCursorValid;
const parseClusterCursor = (cursor) => {
    if (!(0, exports.isClusterCursorValid)(cursor)) {
        throw new Error(error_messages_1.default.INCORRECT_CLUSTER_CURSOR_FORMAT);
    }
    const nodeStrings = cursor.split(NODES_SEPARATOR);
    const nodes = [];
    nodeStrings.forEach((item) => {
        const [address, nextCursor] = item.split(CURSOR_SEPARATOR);
        const [, host, port] = address.match(/(.+):(\d+)$/);
        if (parseInt(nextCursor, 10) >= 0) {
            nodes.push({
                total: 0,
                scanned: 0,
                host,
                port: parseInt(port, 10),
                cursor: parseInt(nextCursor, 10),
                keys: [],
            });
        }
    });
    return nodes;
};
exports.parseClusterCursor = parseClusterCursor;
