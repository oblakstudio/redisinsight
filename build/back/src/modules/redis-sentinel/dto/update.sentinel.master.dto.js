"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSentinelMasterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const sentinel_master_1 = require("../models/sentinel-master");
class UpdateSentinelMasterDto extends (0, swagger_1.PickType)(sentinel_master_1.SentinelMaster, ['username', 'password']) {
}
exports.UpdateSentinelMasterDto = UpdateSentinelMasterDto;
