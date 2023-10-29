"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandTelemetryBaseService = void 0;
const constants_1 = require("../../constants");
const telemetry_base_service_1 = require("./telemetry.base.service");
const lodash_1 = require("lodash");
class CommandTelemetryBaseService extends telemetry_base_service_1.TelemetryBaseService {
    constructor(eventEmitter, commandsService) {
        super(eventEmitter);
        this.eventEmitter = eventEmitter;
        this.commandsService = commandsService;
    }
    async getCommandAdditionalInfo(command) {
        try {
            const result = {
                commandType: constants_1.CommandType.Module,
                moduleName: 'custom',
                capability: 'n/a',
            };
            if (!command) {
                return {};
            }
            const modules = await this.commandsService.getCommandsGroups();
            const commandToFind = command.toUpperCase();
            (0, lodash_1.forEach)(modules, (module, moduleName) => {
                var _a, _b;
                if (module[commandToFind]) {
                    result.commandType = moduleName === 'main' ? constants_1.CommandType.Core : constants_1.CommandType.Module;
                    result.moduleName = moduleName === 'main' ? 'n/a' : moduleName;
                    result.capability = ((_a = module[commandToFind]) === null || _a === void 0 ? void 0 : _a.group) ? (_b = module[commandToFind]) === null || _b === void 0 ? void 0 : _b.group : 'n/a';
                }
            });
            return result;
        }
        catch (e) {
            return {};
        }
    }
}
exports.CommandTelemetryBaseService = CommandTelemetryBaseService;
