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
exports.RedisClientProvider = void 0;
const common_1 = require("@nestjs/common");
const promise_with_timeout_1 = require("../../../utils/promise-with-timeout");
const error_messages_1 = require("../../../constants/error-messages");
const config_1 = require("../../../utils/config");
const redis_client_1 = require("../model/redis-client");
const database_connection_service_1 = require("../../database/database-connection.service");
const serverConfig = config_1.default.get('server');
let RedisClientProvider = class RedisClientProvider {
    constructor(databaseConnectionService) {
        this.databaseConnectionService = databaseConnectionService;
    }
    createClient(clientMetadata) {
        return new redis_client_1.RedisClient(clientMetadata.databaseId, this.getConnectFn(clientMetadata));
    }
    getConnectFn(clientMetadata) {
        return () => (0, promise_with_timeout_1.withTimeout)(this.databaseConnectionService.createClient(clientMetadata), serverConfig.requestTimeout, new common_1.ServiceUnavailableException(error_messages_1.default.NO_CONNECTION_TO_REDIS_DB));
    }
};
RedisClientProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_connection_service_1.DatabaseConnectionService])
], RedisClientProvider);
exports.RedisClientProvider = RedisClientProvider;
