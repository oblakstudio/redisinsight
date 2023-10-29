"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockSearchZSetMembersResponse = exports.getZSetMembersInDescResponse = exports.getZSetMembersInAscResponse = exports.mockDeleteMembersDto = exports.mockMembersForZAddCommand = exports.mockUpdateMemberDto = exports.mockAddMembersDto = exports.mockSearchMembersDto = exports.mockGetMembersDto = exports.mockZSetMemberDto4 = exports.mockZSetMemberDto3 = exports.mockZSetMemberDto2 = exports.mockZSetMemberDto = void 0;
const constants_1 = require("../../../constants");
exports.mockZSetMemberDto = {
    name: Buffer.from('member1'),
    score: '-inf',
};
exports.mockZSetMemberDto2 = {
    name: Buffer.from('member2'),
    score: 0,
};
exports.mockZSetMemberDto3 = {
    name: Buffer.from('member3'),
    score: 2,
};
exports.mockZSetMemberDto4 = {
    name: Buffer.from('member4'),
    score: 'inf',
};
exports.mockGetMembersDto = {
    keyName: Buffer.from('zSet'),
    offset: 0,
    count: 15,
    sortOrder: constants_1.SortOrder.Asc,
};
exports.mockSearchMembersDto = {
    keyName: Buffer.from('zSet'),
    cursor: 0,
    count: 15,
    match: '*',
};
exports.mockAddMembersDto = {
    keyName: exports.mockGetMembersDto.keyName,
    members: [exports.mockZSetMemberDto, exports.mockZSetMemberDto2, exports.mockZSetMemberDto3, exports.mockZSetMemberDto4],
};
exports.mockUpdateMemberDto = {
    keyName: exports.mockGetMembersDto.keyName,
    member: exports.mockAddMembersDto.members[0],
};
exports.mockMembersForZAddCommand = [
    exports.mockZSetMemberDto.score,
    exports.mockZSetMemberDto.name,
    exports.mockZSetMemberDto2.score,
    exports.mockZSetMemberDto2.name,
    exports.mockZSetMemberDto3.score,
    exports.mockZSetMemberDto3.name,
    exports.mockZSetMemberDto4.score,
    exports.mockZSetMemberDto4.name,
];
exports.mockDeleteMembersDto = {
    keyName: exports.mockAddMembersDto.keyName,
    members: [exports.mockZSetMemberDto.name, exports.mockZSetMemberDto2.name, exports.mockZSetMemberDto3.name, exports.mockZSetMemberDto4.name],
};
exports.getZSetMembersInAscResponse = {
    keyName: exports.mockGetMembersDto.keyName,
    total: exports.mockAddMembersDto.members.length,
    members: [...exports.mockAddMembersDto.members],
};
exports.getZSetMembersInDescResponse = {
    keyName: exports.mockGetMembersDto.keyName,
    total: exports.mockAddMembersDto.members.length,
    members: exports.mockAddMembersDto.members.slice().reverse(),
};
exports.mockSearchZSetMembersResponse = {
    keyName: exports.mockGetMembersDto.keyName,
    total: exports.mockAddMembersDto.members.length,
    nextCursor: 0,
    members: [...exports.mockAddMembersDto.members],
};
