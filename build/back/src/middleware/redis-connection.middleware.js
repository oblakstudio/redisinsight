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
var RedisConnectionMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisConnectionMiddleware = void 0;
const common_1 = require("@nestjs/common");
const error_messages_1 = require("../constants/error-messages");
const database_service_1 = require("../modules/database/database.service");
let RedisConnectionMiddleware = RedisConnectionMiddleware_1 = class RedisConnectionMiddleware {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.logger = new common_1.Logger('RedisConnectionMiddleware');
    }
    async use(req, res, next) {
        const { instanceIdFromReq } = RedisConnectionMiddleware_1.getConnectionConfigFromReq(req);
        if (!instanceIdFromReq) {
            this.throwError(req, error_messages_1.default.UNDEFINED_INSTANCE_ID);
        }
        const existDatabaseInstance = await this.databaseService.exists(instanceIdFromReq);
        if (!existDatabaseInstance) {
            throw new common_1.NotFoundException(error_messages_1.default.INVALID_DATABASE_INSTANCE_ID);
        }
        next();
    }
    static getConnectionConfigFromReq(req) {
        return { instanceIdFromReq: req.params.dbInstance };
    }
    throwError(req, message) {
        const { method, url } = req;
        this.logger.error(`${message} ${method} ${url}`);
        throw new common_1.BadRequestException(message);
    }
};
RedisConnectionMiddleware = RedisConnectionMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], RedisConnectionMiddleware);
exports.RedisConnectionMiddleware = RedisConnectionMiddleware;
