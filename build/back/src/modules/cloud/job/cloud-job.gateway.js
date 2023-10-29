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
exports.CloudJobGateway = void 0;
const socket_io_1 = require("socket.io");
const websockets_1 = require("@nestjs/websockets");
const common_1 = require("@nestjs/common");
const config_1 = require("../../../utils/config");
const constants_1 = require("../common/constants");
const cloud_job_service_1 = require("./cloud-job.service");
const monitor_cloud_job_dto_1 = require("./dto/monitor.cloud-job.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const constants_2 = require("../../../common/constants");
const SOCKETS_CONFIG = config_1.default.get('sockets');
let CloudJobGateway = class CloudJobGateway {
    constructor(cloudJobService) {
        this.cloudJobService = cloudJobService;
        this.validator = new class_validator_1.Validator();
        this.exceptionFactory = (new common_1.ValidationPipe()).createExceptionFactory();
        this.logger = new common_1.Logger('CloudJobGateway');
    }
    async monitor(client, data) {
        try {
            const dto = (0, class_transformer_1.plainToClass)(monitor_cloud_job_dto_1.MonitorCloudJobDto, data);
            const errors = await this.validator.validate(dto, { whitelist: true });
            if (errors === null || errors === void 0 ? void 0 : errors.length) {
                throw this.exceptionFactory(errors);
            }
            const sessionMetadata = {
                userId: constants_2.DEFAULT_USER_ID,
                sessionId: constants_2.DEFAULT_SESSION_ID,
            };
            return await this.cloudJobService.monitorJob(sessionMetadata, dto, client);
        }
        catch (error) {
            this.logger.error('Unable to add listener', error);
            throw new websockets_1.WsException(error);
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], CloudJobGateway.prototype, "wss", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)(constants_1.CloudJobEvents.Monitor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, monitor_cloud_job_dto_1.MonitorCloudJobDto]),
    __metadata("design:returntype", Promise)
], CloudJobGateway.prototype, "monitor", null);
CloudJobGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({ cors: SOCKETS_CONFIG.cors, serveClient: SOCKETS_CONFIG.serveClient }),
    __metadata("design:paramtypes", [cloud_job_service_1.CloudJobService])
], CloudJobGateway);
exports.CloudJobGateway = CloudJobGateway;
