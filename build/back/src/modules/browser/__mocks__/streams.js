"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockClaimPendingEntriesReply = exports.mockPendingMessageReply = exports.mockConsumerReply = exports.mockConsumerGroupsReply = exports.mockEmptyStreamEntriesReply = exports.mockStreamEntriesReply = exports.mockEmptyStreamInfoReply = exports.mockStreamInfoReply = exports.mockAdditionalClaimPendingEntriesDto = exports.mockClaimPendingEntriesDto = exports.mockAckPendingMessagesDto = exports.mockGetPendingMessagesDto = exports.mockPendingMessage = exports.mockConsumer = exports.mockCreateConsumerGroupDto = exports.mockConsumerGroup = exports.mockStreamInfo = exports.mockEmptyStreamInfo = exports.mockGetStreamEntriesDto = exports.mockAddStreamEntriesDto = exports.mockStreamEntries = exports.mockStreamEntry = exports.mockEntryField2 = exports.mockEntryField = exports.mockEntryId2 = exports.mockEntryId = void 0;
const constants_1 = require("../../../constants");
const keys_1 = require("./keys");
exports.mockEntryId = '1651130346487-0';
exports.mockEntryId2 = '1651130346487-1';
exports.mockEntryField = {
    name: Buffer.from('field1'),
    value: Buffer.from('value1'),
};
exports.mockEntryField2 = {
    name: Buffer.from('field2'),
    value: Buffer.from('value2'),
};
exports.mockStreamEntry = {
    id: exports.mockEntryId,
    fields: [exports.mockEntryField],
};
exports.mockStreamEntries = [
    { id: exports.mockEntryId2, fields: [exports.mockEntryField, exports.mockEntryField2] },
    { id: exports.mockEntryId, fields: [exports.mockEntryField, exports.mockEntryField2] },
];
exports.mockAddStreamEntriesDto = {
    keyName: Buffer.from('testList'),
    entries: [exports.mockStreamEntry],
};
exports.mockGetStreamEntriesDto = {
    keyName: exports.mockAddStreamEntriesDto.keyName,
    start: '-',
    end: '+',
    sortOrder: constants_1.SortOrder.Desc,
};
exports.mockEmptyStreamInfo = {
    keyName: exports.mockAddStreamEntriesDto.keyName,
    total: 0,
    lastGeneratedId: exports.mockEntryId2,
    firstEntry: null,
    lastEntry: null,
};
exports.mockStreamInfo = {
    keyName: exports.mockAddStreamEntriesDto.keyName,
    total: 2,
    lastGeneratedId: exports.mockEntryId2,
    firstEntry: {
        id: exports.mockEntryId,
        fields: [exports.mockEntryField, exports.mockEntryField2],
    },
    lastEntry: {
        id: exports.mockEntryId2,
        fields: [exports.mockEntryField, exports.mockEntryField2],
    },
};
exports.mockConsumerGroup = {
    name: Buffer.from('consumer-1'),
    consumers: 0,
    pending: 0,
    lastDeliveredId: exports.mockEntryId2,
    smallestPendingId: exports.mockEntryId,
    greatestPendingId: exports.mockEntryId2,
};
exports.mockCreateConsumerGroupDto = {
    name: exports.mockConsumerGroup.name,
    lastDeliveredId: exports.mockConsumerGroup.lastDeliveredId,
};
exports.mockConsumer = {
    name: Buffer.from('consumer-1'),
    pending: 0,
    idle: 10,
};
exports.mockPendingMessage = {
    id: exports.mockEntryId,
    consumerName: exports.mockConsumer.name,
    idle: exports.mockConsumer.idle,
    delivered: 1,
};
exports.mockGetPendingMessagesDto = {
    ...keys_1.mockKeyDto,
    groupName: exports.mockConsumerGroup.name,
    start: '-',
    end: '+',
    count: 10,
    consumerName: exports.mockConsumer.name,
};
exports.mockAckPendingMessagesDto = {
    ...keys_1.mockKeyDto,
    groupName: exports.mockConsumerGroup.name,
    entries: [exports.mockPendingMessage.id, exports.mockPendingMessage.id],
};
exports.mockClaimPendingEntriesDto = {
    ...keys_1.mockKeyDto,
    groupName: exports.mockConsumerGroup.name,
    consumerName: exports.mockConsumer.name,
    entries: [exports.mockPendingMessage.id, exports.mockPendingMessage.id],
    minIdleTime: 0,
};
exports.mockAdditionalClaimPendingEntriesDto = {
    time: 0,
    retryCount: 1,
    force: true,
};
exports.mockStreamInfoReply = [
    Buffer.from('length'),
    2,
    Buffer.from('radix-tree-keys'),
    1,
    Buffer.from('radix-tree-nodes'),
    2,
    Buffer.from('last-generated-id'),
    Buffer.from(exports.mockEntryId2),
    Buffer.from('groups'),
    0,
    Buffer.from('first-entry'),
    [Buffer.from(exports.mockEntryId), [
            exports.mockEntryField.name, exports.mockEntryField.value,
            exports.mockEntryField2.name, exports.mockEntryField2.value,
        ]],
    Buffer.from('last-entry'),
    [Buffer.from(exports.mockEntryId2), [
            exports.mockEntryField.name, exports.mockEntryField.value,
            exports.mockEntryField2.name, exports.mockEntryField2.value,
        ]],
];
exports.mockEmptyStreamInfoReply = [
    Buffer.from('length'),
    0,
    Buffer.from('radix-tree-keys'),
    1,
    Buffer.from('radix-tree-nodes'),
    2,
    Buffer.from('last-generated-id'),
    Buffer.from(exports.mockEntryId2),
    Buffer.from('groups'),
    0,
    Buffer.from('first-entry'),
    null,
    Buffer.from('last-entry'),
    null,
];
exports.mockStreamEntriesReply = [
    [exports.mockEntryId2, [
            exports.mockEntryField.name, exports.mockEntryField.value,
            exports.mockEntryField2.name, exports.mockEntryField2.value,
        ]],
    [exports.mockEntryId, [
            exports.mockEntryField.name, exports.mockEntryField.value,
            exports.mockEntryField2.name, exports.mockEntryField2.value,
        ]],
];
exports.mockEmptyStreamEntriesReply = [];
exports.mockConsumerGroupsReply = [
    'name', exports.mockConsumerGroup.name,
    'consumers', exports.mockConsumerGroup.consumers,
    'pending', exports.mockConsumerGroup.pending,
    'last-delivered-id', exports.mockConsumerGroup.lastDeliveredId,
];
exports.mockConsumerReply = [
    'name', exports.mockConsumer.name,
    'pending', exports.mockConsumer.pending,
    'idle', exports.mockConsumer.idle,
];
exports.mockPendingMessageReply = Object.values(exports.mockPendingMessage);
exports.mockClaimPendingEntriesReply = [
    exports.mockPendingMessage.id, exports.mockPendingMessage.id,
];
