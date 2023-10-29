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
var ConnectionMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectionMiddleware = void 0;
const common_1 = require("@nestjs/common");
const connectTimeout = require("connect-timeout");
const error_messages_1 = require("../../../constants/error-messages");
const constants_1 = require("../../../constants");
const database_service_1 = require("../database.service");
const class_transformer_1 = require("class-transformer");
const database_1 = require("../models/database");
let ConnectionMiddleware = ConnectionMiddleware_1 = class ConnectionMiddleware {
    constructor(databaseService) {
        this.databaseService = databaseService;
        this.logger = new common_1.Logger('ConnectionMiddleware');
    }
    async use(req, res, next) {
        var _a, _b;
        let { timeout, instanceIdFromReq } = ConnectionMiddleware_1.getConnectionConfigFromReq(req);
        if (instanceIdFromReq) {
            timeout = (_a = (0, class_transformer_1.plainToClass)(database_1.Database, await this.databaseService.get(instanceIdFromReq))) === null || _a === void 0 ? void 0 : _a.timeout;
        }
        const cb = (err) => {
            var _a;
            if ((err === null || err === void 0 ? void 0 : err.code) === constants_1.RedisErrorCodes.Timeout
                || ((_a = err === null || err === void 0 ? void 0 : err.message) === null || _a === void 0 ? void 0 : _a.includes('timeout'))) {
                next(this.returnError(req, new common_1.BadGatewayException(error_messages_1.default.CONNECTION_TIMEOUT)));
            }
            else {
                next();
            }
        };
        (_b = connectTimeout === null || connectTimeout === void 0 ? void 0 : connectTimeout(timeout)) === null || _b === void 0 ? void 0 : _b(req, res, cb);
    }
    static getConnectionConfigFromReq(req) {
        var _a, _b;
        return {
            timeout: (_a = req.body) === null || _a === void 0 ? void 0 : _a.timeout,
            instanceIdFromReq: (_b = req.params) === null || _b === void 0 ? void 0 : _b.id,
        };
    }
    returnError(req, err) {
        const { method, url } = req;
        this.logger.error(`${err === null || err === void 0 ? void 0 : err.message} ${method} ${url}`);
        return new common_1.BadRequestException(err === null || err === void 0 ? void 0 : err.message);
    }
};
ConnectionMiddleware = ConnectionMiddleware_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], ConnectionMiddleware);
exports.ConnectionMiddleware = ConnectionMiddleware;
