"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSetWithExpireDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../keys/dto");
const add_members_to_set_dto_1 = require("./add.members-to-set.dto");
class CreateSetWithExpireDto extends (0, swagger_1.IntersectionType)(add_members_to_set_dto_1.AddMembersToSetDto, dto_1.KeyWithExpireDto) {
}
exports.CreateSetWithExpireDto = CreateSetWithExpireDto;
