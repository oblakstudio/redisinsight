"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoverSentinelMastersDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_database_dto_1 = require("../../database/dto/create.database.dto");
class DiscoverSentinelMastersDto extends (0, swagger_1.OmitType)(create_database_dto_1.CreateDatabaseDto, [
    'name', 'db',
]) {
}
exports.DiscoverSentinelMastersDto = DiscoverSentinelMastersDto;
