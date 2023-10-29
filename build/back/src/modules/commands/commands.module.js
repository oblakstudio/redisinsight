"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsModule = void 0;
const common_1 = require("@nestjs/common");
const commands_controller_1 = require("./commands.controller");
const commands_service_1 = require("./commands.service");
const commands_json_provider_1 = require("./commands-json.provider");
const config_1 = require("../../utils/config");
const COMMANDS_CONFIGS = config_1.default.get('commands');
let CommandsModule = class CommandsModule {
};
CommandsModule = __decorate([
    (0, common_1.Module)({
        controllers: [commands_controller_1.CommandsController],
        providers: [
            {
                provide: commands_service_1.CommandsService,
                useFactory: () => new commands_service_1.CommandsService(COMMANDS_CONFIGS.map(({ name, url }) => new commands_json_provider_1.CommandsJsonProvider(name, url))),
            },
        ],
        exports: [
            commands_service_1.CommandsService,
        ],
    })
], CommandsModule);
exports.CommandsModule = CommandsModule;
