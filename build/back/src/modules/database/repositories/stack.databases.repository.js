"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StackDatabasesRepository = void 0;
const common_1 = require("@nestjs/common");
const lodash_1 = require("lodash");
const config_1 = require("../../../utils/config");
const database_entity_1 = require("../entities/database.entity");
const local_database_repository_1 = require("./local.database.repository");
const REDIS_STACK_CONFIG = config_1.default.get('redisStack');
let StackDatabasesRepository = class StackDatabasesRepository extends local_database_repository_1.LocalDatabaseRepository {
    constructor() {
        super(...arguments);
        this.logger = new common_1.Logger('StackDatabasesRepository');
    }
    async onApplicationBootstrap() {
        await this.setPredefinedDatabase((0, lodash_1.merge)({
            name: 'Redis Stack',
            host: 'localhost',
            port: '6379',
        }, REDIS_STACK_CONFIG));
    }
    async exists() {
        return super.exists(REDIS_STACK_CONFIG.id);
    }
    async get(id, ignoreEncryptionErrors = false, omitFields = []) {
        return super.get(REDIS_STACK_CONFIG.id, ignoreEncryptionErrors, omitFields);
    }
    async list() {
        return [await this.get(REDIS_STACK_CONFIG.id)];
    }
    async create() {
        return Promise.reject(new common_1.NotImplementedException('This functionality is not supported'));
    }
    async update(id, data) {
        return super.update(REDIS_STACK_CONFIG.id, data);
    }
    async setPredefinedDatabase(options) {
        try {
            const { id, name, host, port, } = options;
            const isExist = await this.exists();
            if (!isExist) {
                await super.create({
                    id,
                    host,
                    port: parseInt(port, 10),
                    name,
                    tls: false,
                    verifyServerCert: false,
                    connectionType: database_entity_1.ConnectionType.STANDALONE,
                    lastConnection: null,
                }, false);
            }
            this.logger.log(`Succeed to set predefined database ${id}`);
        }
        catch (error) {
            this.logger.error('Failed to set predefined database', error);
        }
    }
};
StackDatabasesRepository = __decorate([
    (0, common_1.Injectable)()
], StackDatabasesRepository);
exports.StackDatabasesRepository = StackDatabasesRepository;
