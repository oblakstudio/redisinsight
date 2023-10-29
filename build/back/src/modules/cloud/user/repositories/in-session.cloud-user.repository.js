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
exports.InSessionCloudUserRepository = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const cloud_user_repository_1 = require("./cloud-user.repository");
const models_1 = require("../models");
const cloud_session_service_1 = require("../../session/cloud-session.service");
const constants_1 = require("../../../../common/constants");
let InSessionCloudUserRepository = class InSessionCloudUserRepository extends cloud_user_repository_1.CloudUserRepository {
    constructor(sessionService) {
        super();
        this.sessionService = sessionService;
    }
    async get(sessionId) {
        const session = await this.sessionService.getSession(sessionId);
        return (0, class_transformer_1.plainToClass)(models_1.CloudUser, session === null || session === void 0 ? void 0 : session.user, { groups: [constants_1.TransformGroup.Secure] }) || null;
    }
    async update(sessionId, data) {
        const user = await this.get(sessionId);
        await this.sessionService.updateSessionData(sessionId, {
            user: (0, class_transformer_1.plainToClass)(models_1.CloudUser, {
                ...(0, class_transformer_1.classToPlain)(user, { groups: [constants_1.TransformGroup.Secure] }),
                ...(0, class_transformer_1.classToPlain)(data, { groups: [constants_1.TransformGroup.Secure] }),
            }, { groups: [constants_1.TransformGroup.Secure] }),
        });
        return this.get(sessionId);
    }
};
InSessionCloudUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [cloud_session_service_1.CloudSessionService])
], InSessionCloudUserRepository);
exports.InSessionCloudUserRepository = InSessionCloudUserRepository;
