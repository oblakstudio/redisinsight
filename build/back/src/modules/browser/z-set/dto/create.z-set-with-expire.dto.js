"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateZSetWithExpireDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../keys/dto");
const add_members_to_z_set_dto_1 = require("./add.members-to-z-set.dto");
class CreateZSetWithExpireDto extends (0, swagger_1.IntersectionType)(add_members_to_z_set_dto_1.AddMembersToZSetDto, dto_1.KeyWithExpireDto) {
}
exports.CreateZSetWithExpireDto = CreateZSetWithExpireDto;
