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
exports.SingleUserAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const session_1 = require("../models/session");
const constants_1 = require("../constants");
const session_service_1 = require("../../modules/session/session.service");
const class_transformer_1 = require("class-transformer");
let SingleUserAuthMiddleware = class SingleUserAuthMiddleware {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    async use(req, res, next) {
        if (!await this.sessionService.getSession(constants_1.DEFAULT_SESSION_ID)) {
            await this.sessionService.createSession((0, class_transformer_1.plainToClass)(session_1.Session, {
                id: constants_1.DEFAULT_SESSION_ID,
                userId: constants_1.DEFAULT_USER_ID,
                data: {
                    cloud: {
                        accessToken: process.env.MOCK_AKEY || undefined,
                    },
                },
            }));
        }
        req['session'] = Object.freeze((0, class_transformer_1.plainToClass)(session_1.SessionMetadata, {
            userId: constants_1.DEFAULT_USER_ID,
            sessionId: constants_1.DEFAULT_SESSION_ID,
        }));
        next();
    }
};
SingleUserAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SingleUserAuthMiddleware);
exports.SingleUserAuthMiddleware = SingleUserAuthMiddleware;
