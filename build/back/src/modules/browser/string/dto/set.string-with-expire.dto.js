"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetStringWithExpireDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../keys/dto");
const set_string_dto_1 = require("./set.string.dto");
class SetStringWithExpireDto extends (0, swagger_1.IntersectionType)(set_string_dto_1.SetStringDto, dto_1.KeyWithExpireDto) {
}
exports.SetStringWithExpireDto = SetStringWithExpireDto;
