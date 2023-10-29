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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseController = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const api_endpoint_decorator_1 = require("../../decorators/api-endpoint.decorator");
const database_1 = require("./models/database");
const database_service_1 = require("./database.service");
const database_connection_service_1 = require("./database-connection.service");
const timeout_interceptor_1 = require("../../common/interceptors/timeout.interceptor");
const error_messages_1 = require("../../constants/error-messages");
const create_database_dto_1 = require("./dto/create.database.dto");
const update_database_dto_1 = require("./dto/update.database.dto");
const server_1 = require("../server/models/server");
const delete_databases_dto_1 = require("./dto/delete.databases.dto");
const decorators_1 = require("../../common/decorators");
const models_1 = require("../../common/models");
const export_databases_dto_1 = require("./dto/export.databases.dto");
const export_database_1 = require("./models/export-database");
const database_response_1 = require("./dto/database.response");
const utils_1 = require("../../utils");
let DatabaseController = class DatabaseController {
    constructor(service, connectionService) {
        this.service = service;
        this.connectionService = connectionService;
    }
    async list() {
        return this.service.list();
    }
    async get(id) {
        return (0, utils_1.classToClass)(database_response_1.DatabaseResponse, await this.service.get(id));
    }
    async create(dto) {
        return (0, utils_1.classToClass)(database_response_1.DatabaseResponse, await this.service.create(dto, true));
    }
    async update(id, database) {
        return (0, utils_1.classToClass)(database_response_1.DatabaseResponse, await this.service.update(id, database, true));
    }
    async clone(id, database) {
        return (0, utils_1.classToClass)(database_response_1.DatabaseResponse, await this.service.clone(id, database));
    }
    async testConnection(dto) {
        return await this.service.testConnection(dto);
    }
    async testExistConnection(id, dto) {
        return this.service.testConnection(dto, id);
    }
    async deleteDatabaseInstance(id) {
        await this.service.delete(id);
    }
    async bulkDeleteDatabaseInstance(dto) {
        return await this.service.bulkDelete(dto.ids);
    }
    async connect(clientMetadata) {
        await this.connectionService.connect(clientMetadata);
    }
    async exportConnections(dto) {
        return await this.service.export(dto.ids, dto.withSecrets);
    }
};
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Get databases list',
        responses: [
            {
                status: 200,
                isArray: true,
                type: database_1.Database,
            },
        ],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "list", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Get)('/:id'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Get database instance by id',
        responses: [
            {
                status: 200,
                description: 'Database instance',
                type: database_response_1.DatabaseResponse,
            },
        ],
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "get", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Add database instance',
        statusCode: 201,
        excludeFor: [server_1.BuildType.RedisStack],
        responses: [
            {
                status: 201,
                description: 'Created database instance',
                type: database_response_1.DatabaseResponse,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_database_dto_1.CreateDatabaseDto]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "create", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(new timeout_interceptor_1.TimeoutInterceptor(error_messages_1.default.CONNECTION_TIMEOUT)),
    (0, common_1.Patch)(':id'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Update database instance by id',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Updated database instance\' response',
                type: database_response_1.DatabaseResponse,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_database_dto_1.UpdateDatabaseDto]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "update", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(new timeout_interceptor_1.TimeoutInterceptor(error_messages_1.default.CONNECTION_TIMEOUT)),
    (0, common_1.Post)('clone/:id'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Update database instance by id',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Updated database instance\' response',
                type: database_response_1.DatabaseResponse,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_database_dto_1.UpdateDatabaseDto]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "clone", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)('/test'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Test connection',
        statusCode: 200,
        responses: [
            {
                status: 200,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
    })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_database_dto_1.CreateDatabaseDto]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "testConnection", null);
__decorate([
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.Post)('/test/:id'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Test connection',
        statusCode: 200,
        responses: [
            {
                status: 200,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_database_dto_1.UpdateDatabaseDto]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "testExistConnection", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Delete database instance by id',
        excludeFor: [server_1.BuildType.RedisStack],
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "deleteDatabaseInstance", null);
__decorate([
    (0, common_1.Delete)(''),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 200,
        description: 'Delete many databases by ids',
        excludeFor: [server_1.BuildType.RedisStack],
        responses: [
            {
                status: 200,
                description: 'Delete many databases by ids response',
                type: delete_databases_dto_1.DeleteDatabasesDto,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_databases_dto_1.DeleteDatabasesDto]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "bulkDeleteDatabaseInstance", null);
__decorate([
    (0, common_1.Get)(':id/connect'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        description: 'Connect to database instance by id',
        statusCode: 200,
        responses: [
            {
                status: 200,
                description: 'Successfully connected to database instance',
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, decorators_1.ClientMetadataParam)({
        databaseIdParam: 'id',
        ignoreDbIndex: true,
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [models_1.ClientMetadata]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "connect", null);
__decorate([
    (0, common_1.Post)('export'),
    (0, api_endpoint_decorator_1.ApiEndpoint)({
        statusCode: 201,
        excludeFor: [server_1.BuildType.RedisStack],
        description: 'Export many databases by ids. With or without passwords and certificates bodies.',
        responses: [
            {
                status: 201,
                description: 'Export many databases by ids response',
                type: export_database_1.ExportDatabase,
            },
        ],
    }),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [export_databases_dto_1.ExportDatabasesDto]),
    __metadata("design:returntype", Promise)
], DatabaseController.prototype, "exportConnections", null);
DatabaseController = __decorate([
    (0, swagger_1.ApiTags)('Database'),
    (0, common_1.Controller)('databases'),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        database_connection_service_1.DatabaseConnectionService])
], DatabaseController);
exports.DatabaseController = DatabaseController;
