"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCloudAccountCapiResponse = void 0;
const lodash_1 = require("lodash");
const models_1 = require("../models");
const class_transformer_1 = require("class-transformer");
const parseCloudAccountCapiResponse = (account) => (0, class_transformer_1.plainToClass)(models_1.CloudAccountInfo, {
    accountId: account.id,
    accountName: account.name,
    ownerName: (0, lodash_1.get)(account, ['key', 'owner', 'name']),
    ownerEmail: (0, lodash_1.get)(account, ['key', 'owner', 'email']),
});
exports.parseCloudAccountCapiResponse = parseCloudAccountCapiResponse;
