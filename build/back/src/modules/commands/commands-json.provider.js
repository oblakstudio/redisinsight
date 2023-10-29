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
exports.CommandsJsonProvider = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const fs = require("fs-extra");
const path = require("path");
const config_1 = require("../../utils/config");
const PATH_CONFIG = config_1.default.get('dir_path');
let CommandsJsonProvider = class CommandsJsonProvider {
    constructor(name, url) {
        this.name = name;
        this.url = url;
        this.logger = new common_1.Logger(`CommandsJsonProvider:${this.name}`);
    }
    async updateLatestJson() {
        try {
            this.logger.log(`Trying to update ${this.name} commands...`);
            const { data } = await axios_1.default.get(this.url, {
                responseType: 'text',
                transformResponse: [(raw) => raw],
            });
            await fs.ensureDir(PATH_CONFIG.commands);
            await fs.writeFile(path.join(PATH_CONFIG.commands, `${this.name}.json`), JSON.stringify(JSON.parse(data)));
            this.logger.log(`Successfully updated ${this.name} commands`);
        }
        catch (error) {
            this.logger.error(`Unable to update ${this.name} commands`, error);
        }
    }
    async getCommands() {
        try {
            return ({
                [this.name]: JSON.parse(await fs.readFile(path.join(PATH_CONFIG.commands, `${this.name}.json`), 'utf8'))
            });
        }
        catch (error) {
            this.logger.warn(`Unable to get latest ${this.name} commands. Return default.`, error);
            return this.getDefaultCommands();
        }
    }
    async getDefaultCommands() {
        try {
            return ({
                [this.name]: JSON.parse(await fs.readFile(path.join(PATH_CONFIG.defaultCommandsDir, `${this.name}.json`), 'utf8'))
            });
        }
        catch (error) {
            this.logger.error(`Unable to get default ${this.name} commands.`, error);
            return {};
        }
    }
};
CommandsJsonProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object])
], CommandsJsonProvider);
exports.CommandsJsonProvider = CommandsJsonProvider;
