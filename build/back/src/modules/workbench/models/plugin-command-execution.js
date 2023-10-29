"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginCommandExecution = void 0;
const command_execution_1 = require("./command-execution");
const swagger_1 = require("@nestjs/swagger");
class PluginCommandExecution extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(command_execution_1.CommandExecution, ['createdAt', 'id'])) {
    constructor(partial) {
        super();
        Object.assign(this, partial);
    }
}
exports.PluginCommandExecution = PluginCommandExecution;
