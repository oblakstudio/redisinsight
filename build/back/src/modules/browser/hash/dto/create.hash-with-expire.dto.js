"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateHashWithExpireDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../keys/dto");
const dto_2 = require("./");
class CreateHashWithExpireDto extends (0, swagger_1.IntersectionType)(dto_2.AddFieldsToHashDto, dto_1.KeyWithExpireDto) {
}
exports.CreateHashWithExpireDto = CreateHashWithExpireDto;
