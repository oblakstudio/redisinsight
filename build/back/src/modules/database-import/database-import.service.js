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
var DatabaseImportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseImportService = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const database_1 = require("../database/models/database");
const class_transformer_1 = require("class-transformer");
const database_entity_1 = require("../database/entities/database.entity");
const database_repository_1 = require("../database/repositories/database.repository");
const database_import_response_1 = require("./dto/database-import.response");
const class_validator_1 = require("class-validator");
const import_database_dto_1 = require("./dto/import.database.dto");
const utils_1 = require("../../utils");
const database_import_analytics_1 = require("./database-import.analytics");
const exceptions_1 = require("./exceptions");
const exceptions_2 = require("../../common/exceptions");
const certificate_import_service_1 = require("./certificate-import.service");
const ssh_import_service_1 = require("./ssh-import.service");
let DatabaseImportService = DatabaseImportService_1 = class DatabaseImportService {
    constructor(certificateImportService, sshImportService, databaseRepository, analytics) {
        this.certificateImportService = certificateImportService;
        this.sshImportService = sshImportService;
        this.databaseRepository = databaseRepository;
        this.analytics = analytics;
        this.logger = new common_1.Logger('DatabaseImportService');
        this.validator = new class_validator_1.Validator();
        this.fieldsMapSchema = [
            ['name', ['name', 'connectionName']],
            ['username', ['username']],
            ['password', ['password', 'auth']],
            ['host', ['host']],
            ['port', ['port']],
            ['db', ['db']],
            ['provider', ['provider']],
            ['isCluster', ['cluster']],
            ['type', ['type']],
            ['connectionType', ['connectionType']],
            ['tls', ['tls', 'ssl']],
            ['tlsServername', ['tlsServername']],
            ['tlsCaName', ['caCert.name']],
            ['tlsCaCert', ['caCert.certificate', 'caCert', 'sslOptions.ca', 'ssl_ca_cert_path']],
            ['tlsClientName', ['clientCert.name']],
            ['tlsClientCert', ['clientCert.certificate', 'certificate', 'sslOptions.cert', 'ssl_local_cert_path']],
            ['tlsClientKey', ['clientCert.key', 'keyFile', 'sslOptions.key', 'ssl_private_key_path']],
            ['sentinelMasterName', ['sentinelMaster.name', 'sentinelOptions.masterName', 'sentinelOptions.name']],
            ['sentinelMasterUsername', ['sentinelMaster.username']],
            ['sentinelMasterPassword', [
                    'sentinelMaster.password', 'sentinelOptions.nodePassword', 'sentinelOptions.sentinelPassword',
                ]],
            ['sshHost', ['sshOptions.host', 'ssh_host', 'sshHost']],
            ['sshPort', ['sshOptions.port', 'ssh_port', 'sshPort']],
            ['sshUsername', ['sshOptions.username', 'ssh_user', 'sshUser']],
            ['sshPassword', ['sshOptions.password', 'ssh_password', 'sshPassword']],
            ['sshPrivateKey', ['sshOptions.privateKey', 'sshOptions.privatekey', 'ssh_private_key_path', 'sshKeyFile']],
            ['sshPassphrase', ['sshOptions.passphrase', 'sshKeyPassphrase']],
            ['sshAgentPath', ['ssh_agent_path']],
            ['compressor', ['compressor']],
            ['modules', ['modules']],
        ];
    }
    async import(file) {
        var _a;
        try {
            if (!file) {
                throw new exceptions_1.NoDatabaseImportFileProvidedException('No import file provided');
            }
            if ((file === null || file === void 0 ? void 0 : file.size) > 1024 * 1024 * 10) {
                throw new exceptions_1.SizeLimitExceededDatabaseImportFileException('Import file is too big. Maximum 10mb allowed');
            }
            const items = DatabaseImportService_1.parseFile(file);
            if (!(0, lodash_1.isArray)(items) || !(items === null || items === void 0 ? void 0 : items.length)) {
                let filename = (file === null || file === void 0 ? void 0 : file.originalname) || 'import file';
                if (filename.length > 50) {
                    filename = `${filename.slice(0, 50)}...`;
                }
                throw new exceptions_1.UnableToParseDatabaseImportFileException(`Unable to parse ${filename}`);
            }
            let response = {
                total: items.length,
                success: [],
                partial: [],
                fail: [],
            };
            await items.reduce((prev, item, index) => prev.finally(() => this.createDatabase(item, index)
                .then((result) => {
                switch (result.status) {
                    case database_import_response_1.DatabaseImportStatus.Fail:
                        response.fail.push(result);
                        break;
                    case database_import_response_1.DatabaseImportStatus.Partial:
                        response.partial.push(result);
                        break;
                    case database_import_response_1.DatabaseImportStatus.Success:
                        response.success.push(result);
                        break;
                    default:
                }
            })), Promise.resolve());
            response = (0, class_transformer_1.plainToClass)(database_import_response_1.DatabaseImportResponse, response);
            this.analytics.sendImportResults(response);
            return response;
        }
        catch (e) {
            this.logger.warn(`Unable to import databases: ${((_a = e === null || e === void 0 ? void 0 : e.constructor) === null || _a === void 0 ? void 0 : _a.name) || 'UncaughtError'}`, e);
            this.analytics.sendImportFailed(e);
            throw e;
        }
    }
    async createDatabase(item, index) {
        var _a, _b;
        try {
            let status = database_import_response_1.DatabaseImportStatus.Success;
            const errors = [];
            const data = {};
            data.new = true;
            this.fieldsMapSchema.forEach(([field, paths]) => {
                let value;
                paths.every((path) => {
                    value = (0, lodash_1.get)(item, path);
                    return value === undefined;
                });
                (0, lodash_1.set)(data, field, value);
            });
            if (!data.name) {
                data.name = `${data.host}:${data.port}`;
            }
            data.connectionType = DatabaseImportService_1.determineConnectionType(data);
            if (data === null || data === void 0 ? void 0 : data.sentinelMasterName) {
                data.sentinelMaster = {
                    name: data.sentinelMasterName,
                    username: data.sentinelMasterUsername || undefined,
                    password: data.sentinelMasterPassword,
                };
                data.nodes = [{
                        host: data.host,
                        port: parseInt(data.port, 10),
                    }];
            }
            if ((data === null || data === void 0 ? void 0 : data.sshHost) || (data === null || data === void 0 ? void 0 : data.sshAgentPath)) {
                data.ssh = true;
                try {
                    data.sshOptions = await this.sshImportService.processSshOptions(data);
                }
                catch (e) {
                    status = database_import_response_1.DatabaseImportStatus.Partial;
                    data.ssh = false;
                    errors.push(e);
                }
            }
            if (data === null || data === void 0 ? void 0 : data.tlsCaCert) {
                try {
                    data.tls = true;
                    data.caCert = await this.certificateImportService.processCaCertificate({
                        certificate: data.tlsCaCert,
                        name: data === null || data === void 0 ? void 0 : data.tlsCaName,
                    });
                }
                catch (e) {
                    status = database_import_response_1.DatabaseImportStatus.Partial;
                    errors.push(e);
                }
            }
            if ((data === null || data === void 0 ? void 0 : data.tlsClientCert) || (data === null || data === void 0 ? void 0 : data.tlsClientKey)) {
                try {
                    data.tls = true;
                    data.clientCert = await this.certificateImportService.processClientCertificate({
                        certificate: data.tlsClientCert,
                        key: data.tlsClientKey,
                        name: data === null || data === void 0 ? void 0 : data.tlsClientName,
                    });
                }
                catch (e) {
                    status = database_import_response_1.DatabaseImportStatus.Partial;
                    errors.push(e);
                }
            }
            if ((data === null || data === void 0 ? void 0 : data.compressor) && !(data.compressor in database_entity_1.Compressor)) {
                status = database_import_response_1.DatabaseImportStatus.Partial;
                data.compressor = database_entity_1.Compressor.NONE;
                errors.push(new exceptions_1.InvalidCompressorException());
            }
            const dto = (0, class_transformer_1.plainToClass)(import_database_dto_1.ImportDatabaseDto, Object.keys(data)
                .reduce((acc, key) => {
                acc[key] = data[key] === '' ? null : data[key];
                return acc;
            }, {}), {
                groups: ['security'],
            });
            await this.validator.validateOrReject(dto, {
                whitelist: true,
            });
            const database = (0, utils_1.classToClass)(database_1.Database, dto);
            await this.databaseRepository.create(database, false);
            return {
                index,
                status,
                host: database.host,
                port: database.port,
                errors: (errors === null || errors === void 0 ? void 0 : errors.length) ? errors : undefined,
            };
        }
        catch (e) {
            let errors = [e];
            if ((0, lodash_1.isArray)(e)) {
                errors = e;
            }
            errors = errors.map((error) => {
                if (error instanceof class_validator_1.ValidationError) {
                    const messages = Object.values((error === null || error === void 0 ? void 0 : error.constraints) || {});
                    return new exceptions_2.ValidationException(messages[messages.length - 1] || 'Bad request');
                }
                if (!(error instanceof common_1.HttpException)) {
                    return new common_1.InternalServerErrorException(error === null || error === void 0 ? void 0 : error.message);
                }
                return error;
            });
            this.logger.warn(`Unable to import database: ${((_b = (_a = errors[0]) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) || 'UncaughtError'}`, errors[0]);
            return {
                index,
                status: database_import_response_1.DatabaseImportStatus.Fail,
                host: item === null || item === void 0 ? void 0 : item.host,
                port: item === null || item === void 0 ? void 0 : item.port,
                errors,
            };
        }
    }
    static determineConnectionType(data = {}) {
        if (data === null || data === void 0 ? void 0 : data.connectionType) {
            return (data.connectionType in database_entity_1.ConnectionType)
                ? database_entity_1.ConnectionType[data.connectionType]
                : database_entity_1.ConnectionType.NOT_CONNECTED;
        }
        if (data === null || data === void 0 ? void 0 : data.type) {
            switch (data.type) {
                case 'cluster':
                    return database_entity_1.ConnectionType.CLUSTER;
                case 'sentinel':
                    return database_entity_1.ConnectionType.SENTINEL;
                case 'standalone':
                    return database_entity_1.ConnectionType.STANDALONE;
                default:
                    return database_entity_1.ConnectionType.NOT_CONNECTED;
            }
        }
        if ((data === null || data === void 0 ? void 0 : data.isCluster) === true) {
            return database_entity_1.ConnectionType.CLUSTER;
        }
        if (data === null || data === void 0 ? void 0 : data.sentinelMasterName) {
            return database_entity_1.ConnectionType.SENTINEL;
        }
        return database_entity_1.ConnectionType.NOT_CONNECTED;
    }
    static parseFile(file) {
        var _a;
        const data = (_a = file === null || file === void 0 ? void 0 : file.buffer) === null || _a === void 0 ? void 0 : _a.toString();
        let databases = DatabaseImportService_1.parseJson(data);
        if (!databases) {
            databases = DatabaseImportService_1.parseBase64(data);
        }
        return databases;
    }
    static parseBase64(data) {
        try {
            return JSON.parse((Buffer.from(data, 'base64')).toString('utf8'));
        }
        catch (e) {
            return null;
        }
    }
    static parseJson(data) {
        try {
            return JSON.parse(data);
        }
        catch (e) {
            return null;
        }
    }
};
DatabaseImportService = DatabaseImportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [certificate_import_service_1.CertificateImportService,
        ssh_import_service_1.SshImportService,
        database_repository_1.DatabaseRepository,
        database_import_analytics_1.DatabaseImportAnalytics])
], DatabaseImportService);
exports.DatabaseImportService = DatabaseImportService;
