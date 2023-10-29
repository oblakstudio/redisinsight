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
exports.SessionService = void 0;
const common_1 = require("@nestjs/common");
const session_provider_1 = require("./providers/session.provider");
let SessionService = class SessionService {
    constructor(sessionProvider) {
        this.sessionProvider = sessionProvider;
    }
    async getSession(id) {
        return this.sessionProvider.getSession(id);
    }
    async createSession(session) {
        return this.sessionProvider.createSession(session);
    }
    async updateSessionData(id, data) {
        const session = await this.getSession(id);
        if (!session) {
            return null;
        }
        return this.sessionProvider.updateSessionData(id, data ? {
            ...session.data,
            ...data,
        } : {});
    }
    async deleteSession(id) {
        return this.sessionProvider.deleteSession(id);
    }
};
SessionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [session_provider_1.SessionProvider])
], SessionService);
exports.SessionService = SessionService;
