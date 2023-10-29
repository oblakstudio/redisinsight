"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseImportModule = void 0;
const common_1 = require("@nestjs/common");
const database_import_controller_1 = require("./database-import.controller");
const database_import_service_1 = require("./database-import.service");
const database_import_analytics_1 = require("./database-import.analytics");
const certificate_import_service_1 = require("./certificate-import.service");
const ssh_import_service_1 = require("./ssh-import.service");
let DatabaseImportModule = class DatabaseImportModule {
};
DatabaseImportModule = __decorate([
    (0, common_1.Module)({
        controllers: [database_import_controller_1.DatabaseImportController],
        providers: [
            database_import_service_1.DatabaseImportService,
            certificate_import_service_1.CertificateImportService,
            ssh_import_service_1.SshImportService,
            database_import_analytics_1.DatabaseImportAnalytics,
        ],
    })
], DatabaseImportModule);
exports.DatabaseImportModule = DatabaseImportModule;
