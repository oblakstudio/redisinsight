"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleUserSessionProvider = void 0;
const session_provider_1 = require("./session.provider");
const models_1 = require("../../../common/models");
const constants_1 = require("../../../common/constants");
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
let SingleUserSessionProvider = class SingleUserSessionProvider extends session_provider_1.SessionProvider {
    async getSession() {
        return this.sessionStorage.getSession(constants_1.DEFAULT_SESSION_ID);
    }
    async createSession(session) {
        return this.sessionStorage.createSession((0, class_transformer_1.plainToClass)(models_1.Session, {
            ...session,
            id: constants_1.DEFAULT_SESSION_ID,
        }));
    }
    async updateSessionData(id, data) {
        return this.sessionStorage.updateSessionData(constants_1.DEFAULT_SESSION_ID, data);
    }
    async deleteSession() {
        return this.sessionStorage.deleteSession(constants_1.DEFAULT_SESSION_ID);
    }
};
SingleUserSessionProvider = __decorate([
    (0, common_1.Injectable)()
], SingleUserSessionProvider);
exports.SingleUserSessionProvider = SingleUserSessionProvider;
