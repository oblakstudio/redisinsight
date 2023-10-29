"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SessionModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionModule = void 0;
const common_1 = require("@nestjs/common");
const session_service_1 = require("./session.service");
const session_provider_1 = require("./providers/session.provider");
const single_user_session_provider_1 = require("./providers/single-user.session.provider");
const session_storage_1 = require("./providers/storage/session.storage");
const in_memory_session_storage_1 = require("./providers/storage/in-memory.session.storage");
let SessionModule = SessionModule_1 = class SessionModule {
    static async register(sessionProvider = single_user_session_provider_1.SingleUserSessionProvider, sessionStorage = in_memory_session_storage_1.InMemorySessionStorage) {
        return {
            module: SessionModule_1,
            providers: [
                session_service_1.SessionService,
                {
                    provide: session_provider_1.SessionProvider,
                    useClass: sessionProvider,
                },
                {
                    provide: session_storage_1.SessionStorage,
                    useClass: sessionStorage,
                },
            ],
            exports: [session_service_1.SessionService],
        };
    }
};
SessionModule = SessionModule_1 = __decorate([
    (0, common_1.Module)({})
], SessionModule);
exports.SessionModule = SessionModule;
