"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelEncryptor = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const utils_1 = require("../../utils");
class ModelEncryptor {
    constructor(encryptionService, fields) {
        this.encryptionService = encryptionService;
        this.fields = fields;
        this.logger = new common_1.Logger('ModelEncryptor');
    }
    async encryptEntity(entity) {
        const encryptedEntity = (0, utils_1.cloneClassInstance)(entity);
        await Promise.all(this.fields.map(async (field) => {
            if (entity[field]) {
                const { data, encryption } = await this.encryptionService.encrypt(entity[field]);
                encryptedEntity[field] = data;
                encryptedEntity['encryption'] = encryption;
            }
        }));
        return encryptedEntity;
    }
    async decryptEntity(entity, ignoreErrors = false) {
        if (!entity) {
            return null;
        }
        const decrypted = (0, utils_1.cloneClassInstance)(entity);
        await Promise.all(this.fields.map(async (field) => {
            decrypted[field] = await this.decryptField(entity, field, ignoreErrors);
        }));
        return decrypted;
    }
    async decryptField(entity, field, ignoreErrors) {
        if ((0, lodash_1.isUndefined)(entity[field])) {
            return undefined;
        }
        try {
            return await this.encryptionService.decrypt(entity[field], entity['encryption']);
        }
        catch (error) {
            this.logger.error(`Unable to decrypt entity fields: ${field}`, error);
            if (!ignoreErrors) {
                throw error;
            }
        }
        return null;
    }
}
exports.ModelEncryptor = ModelEncryptor;
