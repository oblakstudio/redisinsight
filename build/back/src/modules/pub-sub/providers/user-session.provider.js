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
exports.UserSessionProvider = void 0;
const common_1 = require("@nestjs/common");
const user_session_1 = require("../model/user-session");
const redis_client_provider_1 = require("./redis-client.provider");
const models_1 = require("../../../common/models");
let UserSessionProvider = class UserSessionProvider {
    constructor(redisClientProvider) {
        this.redisClientProvider = redisClientProvider;
        this.logger = new common_1.Logger('UserSessionProvider');
        this.sessions = new Map();
    }
    getOrCreateUserSession(userClient) {
        let session = this.getUserSession(userClient.getId());
        if (!session) {
            session = new user_session_1.UserSession(userClient, this.redisClientProvider.createClient({
                sessionMetadata: undefined,
                databaseId: userClient.getDatabaseId(),
                context: models_1.ClientContext.Common,
            }));
            this.sessions.set(session.getId(), session);
            this.logger.debug(`New session was added ${this}`);
        }
        return session;
    }
    getUserSession(id) {
        return this.sessions.get(id);
    }
    removeUserSession(id) {
        this.logger.debug(`Removing user session ${id}`);
        this.sessions.delete(id);
        this.logger.debug(`User session was removed ${this}`);
    }
    toString() {
        return `UserSessionProvider:${JSON.stringify({
            sessionsSize: this.sessions.size,
            sessions: [...this.sessions.keys()],
        })}`;
    }
};
UserSessionProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_client_provider_1.RedisClientProvider])
], UserSessionProvider);
exports.UserSessionProvider = UserSessionProvider;
