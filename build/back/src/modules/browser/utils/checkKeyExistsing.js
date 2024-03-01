"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfKeyExists = exports.checkIfKeyNotExists = void 0;
const common_1 = require("@nestjs/common");
const browser_tool_commands_1 = require("../constants/browser-tool-commands");
const error_messages_1 = require("../../../constants/error-messages");
const checkIfKeyNotExists = async (keyName, client) => {
    const isExist = await client.sendCommand([browser_tool_commands_1.BrowserToolKeysCommands.Exists, keyName]);
    if (!isExist) {
        throw new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST);
    }
};
exports.checkIfKeyNotExists = checkIfKeyNotExists;
const checkIfKeyExists = async (keyName, client) => {
    const isExist = await client.sendCommand([browser_tool_commands_1.BrowserToolKeysCommands.Exists, keyName]);
    if (isExist) {
        throw new common_1.ConflictException(error_messages_1.default.KEY_NAME_EXIST);
    }
};
exports.checkIfKeyExists = checkIfKeyExists;
