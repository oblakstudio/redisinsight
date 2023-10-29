"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockGetSetMembersResponse = exports.mockGetSetMembersDto = exports.mockDeleteMembersFromSetDto = exports.mockAddMembersToSetDto = exports.mockSetMembers = exports.mockSetMember = void 0;
exports.mockSetMember = Buffer.from('Lorem ipsum dolor sit amet.');
exports.mockSetMembers = [exports.mockSetMember];
exports.mockAddMembersToSetDto = {
    keyName: Buffer.from('testSet'),
    members: [exports.mockSetMember],
};
exports.mockDeleteMembersFromSetDto = {
    keyName: exports.mockAddMembersToSetDto.keyName,
    members: exports.mockAddMembersToSetDto.members,
};
exports.mockGetSetMembersDto = {
    keyName: exports.mockAddMembersToSetDto.keyName,
    cursor: 0,
    count: 15,
    match: '*',
};
exports.mockGetSetMembersResponse = {
    keyName: exports.mockGetSetMembersDto.keyName,
    nextCursor: 0,
    total: exports.mockSetMembers.length,
    members: exports.mockSetMembers,
};
