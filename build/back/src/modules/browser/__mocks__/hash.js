"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockRedisHScanResponse = exports.mockGetFieldsResponse = exports.mockGetFieldsDto = exports.mockDeleteFieldsDto = exports.mockAddFieldsDto = exports.mockHashField = void 0;
const keys_1 = require("./keys");
const lodash_1 = require("lodash");
exports.mockHashField = {
    field: Buffer.from('field1'),
    value: Buffer.from('value'),
};
exports.mockAddFieldsDto = {
    keyName: keys_1.mockKeyDto.keyName,
    fields: [exports.mockHashField],
};
exports.mockDeleteFieldsDto = {
    keyName: exports.mockAddFieldsDto.keyName,
    fields: exports.mockAddFieldsDto.fields.map((item) => item.field),
};
exports.mockGetFieldsDto = {
    keyName: exports.mockAddFieldsDto.keyName,
    cursor: 0,
    count: 15,
    match: '*',
};
exports.mockGetFieldsResponse = {
    keyName: exports.mockGetFieldsDto.keyName,
    nextCursor: 0,
    total: exports.mockAddFieldsDto.fields.length,
    fields: exports.mockAddFieldsDto.fields,
};
exports.mockRedisHScanResponse = [
    0,
    (0, lodash_1.flatMap)(exports.mockAddFieldsDto.fields, ({ field, value }) => [field, value]),
];
