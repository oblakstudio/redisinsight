"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockScanner = exports.mockTypeInfoStrategy = exports.mockScannerStrategy = exports.mockKeyDto = void 0;
exports.mockKeyDto = {
    keyName: Buffer.from('keyName'),
};
exports.mockScannerStrategy = {
    getKeys: jest.fn().mockResolvedValue([]),
    getKeyInfo: jest.fn().mockResolvedValue({}),
    getKeysInfo: jest.fn().mockResolvedValue([]),
    getKeysTtl: jest.fn().mockResolvedValue([]),
    getKeysType: jest.fn().mockResolvedValue([]),
    getKeysSize: jest.fn().mockResolvedValue([]),
};
exports.mockTypeInfoStrategy = {
    getInfo: jest.fn().mockResolvedValue([]),
};
exports.mockScanner = jest.fn(() => ({
    getStrategy: jest.fn().mockReturnValue(exports.mockScannerStrategy),
}));
