"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandsService = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const COMMANDS_TTL = 300000;
let CommandsService = class CommandsService {
    constructor(commandsProviders = []) {
        this.commandsProviders = commandsProviders;
    }
    async onModuleInit() {
        Promise.all(this.commandsProviders.map((provider) => provider.updateLatestJson()));
    }
    async getAll() {
        const commands = {};
        Object.entries(await this.getCommandsGroups()).forEach(([provider, groupCommands]) => {
            return (0, lodash_1.forEach)(groupCommands, (value, command) => {
                commands[command] = { ...value, provider };
            });
        });
        return commands;
    }
    async getCommandsGroups() {
        if (!!this.timer && this.timer + COMMANDS_TTL > new Date().getTime()) {
            return this.commandsGroups;
        }
        this.commandsGroups = (0, lodash_1.assign)({}, ...(await Promise.all(this.commandsProviders.map((provider) => provider.getCommands()))));
        this.timer = new Date().getTime();
        return this.commandsGroups;
    }
};
CommandsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Array])
], CommandsService);
exports.CommandsService = CommandsService;
