"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockGetListElementResponse = exports.mockGetListElementsResponse = exports.mockDeleteElementsDto = exports.mockSetListElementDto = exports.mockGetListElementsDto = exports.mockPushElementDto = exports.mockListElements = exports.mockListElement2 = exports.mockListElement = exports.mockIndex = void 0;
const dto_1 = require("../list/dto");
const keys_1 = require("./keys");
exports.mockIndex = 0;
exports.mockListElement = Buffer.from('Lorem ipsum dolor sit amet.');
exports.mockListElement2 = Buffer.from('Lorem ipsum dolor sit amet2.');
exports.mockListElements = [exports.mockListElement];
exports.mockPushElementDto = {
    keyName: keys_1.mockKeyDto.keyName,
    element: exports.mockListElement,
    destination: dto_1.ListElementDestination.Tail,
};
exports.mockGetListElementsDto = {
    keyName: keys_1.mockKeyDto.keyName,
    offset: 0,
    count: 10,
};
exports.mockSetListElementDto = {
    keyName: keys_1.mockKeyDto.keyName,
    element: exports.mockListElement,
    index: 0,
};
exports.mockDeleteElementsDto = {
    keyName: keys_1.mockKeyDto.keyName,
    destination: dto_1.ListElementDestination.Tail,
    count: 1,
};
exports.mockGetListElementsResponse = {
    keyName: exports.mockPushElementDto.keyName,
    total: exports.mockListElements.length,
    elements: exports.mockListElements,
};
exports.mockGetListElementResponse = {
    keyName: keys_1.mockKeyDto.keyName,
    value: exports.mockListElement,
};
