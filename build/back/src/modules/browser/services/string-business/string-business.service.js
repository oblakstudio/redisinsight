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
exports.StringBusinessService = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("../../../../constants");
const error_messages_1 = require("../../../../constants/error-messages");
const utils_1 = require("../../../../utils");
const string_dto_1 = require("../../dto/string.dto");
const browser_tool_service_1 = require("../browser-tool/browser-tool.service");
const browser_tool_commands_1 = require("../../constants/browser-tool-commands");
const class_transformer_1 = require("class-transformer");
const database_recommendation_service_1 = require("../../../database-recommendation/database-recommendation.service");
const stream_1 = require("stream");
let StringBusinessService = class StringBusinessService {
    constructor(browserTool, recommendationService) {
        this.browserTool = browserTool;
        this.recommendationService = recommendationService;
        this.logger = new common_1.Logger('StringBusinessService');
    }
    async setString(clientMetadata, dto) {
        this.logger.log('Setting string key type.');
        const { keyName, value, expire } = dto;
        let result;
        try {
            if (expire) {
                result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStringCommands.Set, [keyName, value, 'EX', `${expire}`, 'NX']);
            }
            else {
                result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStringCommands.Set, [keyName, value, 'NX']);
            }
        }
        catch (error) {
            this.logger.error('Failed to set string key type', error);
            (0, utils_1.catchAclError)(error);
        }
        if (!result) {
            this.logger.error(`Failed to set string key type. ${error_messages_1.default.KEY_NAME_EXIST} key: ${keyName}`);
            throw new common_1.ConflictException(error_messages_1.default.KEY_NAME_EXIST);
        }
        this.logger.log('Succeed to set string key type.');
    }
    async getStringValue(clientMetadata, dto) {
        this.logger.log('Getting string value.');
        const { keyName, start, end } = dto;
        let result;
        try {
            let value;
            if (end) {
                value = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStringCommands.Getrange, [keyName, `${start}`, `${end}`]);
            }
            else {
                value = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStringCommands.Get, [keyName]);
            }
            result = { value, keyName };
        }
        catch (error) {
            this.logger.error('Failed to get string value.', error);
            if (error.message.includes(constants_1.RedisErrorCodes.WrongType)) {
                throw new common_1.BadRequestException(error.message);
            }
            (0, utils_1.catchAclError)(error);
        }
        if (result.value === null) {
            this.logger.error(`Failed to get string value. Not Found key: ${keyName}.`);
            throw new common_1.NotFoundException();
        }
        this.recommendationService.check(clientMetadata, constants_1.RECOMMENDATION_NAMES.STRING_TO_JSON, { value: result.value, keyName: result.keyName });
        this.logger.log('Succeed to get string value.');
        return (0, class_transformer_1.plainToClass)(string_dto_1.GetStringValueResponse, result);
    }
    async downloadStringValue(clientMetadata, dto) {
        const result = await this.getStringValue(clientMetadata, dto);
        const stream = stream_1.Readable.from(result.value);
        return { stream };
    }
    async updateStringValue(clientMetadata, dto) {
        this.logger.log('Updating string value.');
        const { keyName, value } = dto;
        let result;
        try {
            const ttl = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Ttl, [keyName]);
            result = await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolStringCommands.Set, [keyName, value, 'XX']);
            if (result && ttl > 0) {
                await this.browserTool.execCommand(clientMetadata, browser_tool_commands_1.BrowserToolKeysCommands.Expire, [keyName, ttl]);
            }
        }
        catch (error) {
            this.logger.error('Failed to update string value.', error);
            (0, utils_1.catchAclError)(error);
        }
        if (!result) {
            this.logger.error(`Failed to update string value. ${error_messages_1.default.KEY_NOT_EXIST} key: ${keyName}`);
            throw new common_1.NotFoundException(error_messages_1.default.KEY_NOT_EXIST);
        }
        this.logger.log('Succeed to update string value.');
    }
};
StringBusinessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [browser_tool_service_1.BrowserToolService,
        database_recommendation_service_1.DatabaseRecommendationService])
], StringBusinessService);
exports.StringBusinessService = StringBusinessService;
