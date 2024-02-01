"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptionResult = exports.EncryptionStrategy = void 0;
var EncryptionStrategy;
(function (EncryptionStrategy) {
    EncryptionStrategy["PLAIN"] = "PLAIN";
    EncryptionStrategy["KEYTAR"] = "KEYTAR";
    EncryptionStrategy["KEY"] = "KEY";
})(EncryptionStrategy = exports.EncryptionStrategy || (exports.EncryptionStrategy = {}));
class EncryptionResult {
}
exports.EncryptionResult = EncryptionResult;
