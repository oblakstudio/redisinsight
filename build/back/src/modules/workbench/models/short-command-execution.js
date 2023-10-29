"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortCommandExecution = void 0;
const command_execution_1 = require("./command-execution");
const swagger_1 = require("@nestjs/swagger");
class ShortCommandExecution extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(command_execution_1.CommandExecution, ['result'])) {
}
exports.ShortCommandExecution = ShortCommandExecution;
