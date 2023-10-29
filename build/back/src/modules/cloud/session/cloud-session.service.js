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
exports.CloudSessionService = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("../../session/session.service");
const cloud_session_1 = require("./models/cloud-session");
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../../../common/constants");
let CloudSessionService = class CloudSessionService {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async getSession(id) {
        var _a;
        const session = await this.sessionService.getSession(id);
        return ((_a = session === null || session === void 0 ? void 0 : session.data) === null || _a === void 0 ? void 0 : _a.cloud) || null;
    }
    async updateSessionData(id, cloud) {
        var _a, _b;
        const session = await this.getSession(id);
        return ((_b = (_a = (await this.sessionService.updateSessionData(id, {
            cloud: (0, class_transformer_1.plainToClass)(cloud_session_1.CloudSession, {
                ...(0, class_transformer_1.classToPlain)(session, { groups: [constants_1.TransformGroup.Secure] }),
                ...(0, class_transformer_1.classToPlain)(cloud, { groups: [constants_1.TransformGroup.Secure] }),
            }, { groups: [constants_1.TransformGroup.Secure] }),
        }))) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.cloud) || null;
    }
    async deleteSessionData(id) {
        await this.sessionService.updateSessionData(id, { cloud: null });
    }
};
CloudSessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], CloudSessionService);
exports.CloudSessionService = CloudSessionService;
