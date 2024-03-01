"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRejsonRlWithExpireDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../keys/dto");
const create_rejson_rl_dto_1 = require("./create.rejson-rl.dto");
class CreateRejsonRlWithExpireDto extends (0, swagger_1.IntersectionType)(create_rejson_rl_dto_1.CreateRejsonRlDto, dto_1.KeyWithExpireDto) {
}
exports.CreateRejsonRlWithExpireDto = CreateRejsonRlWithExpireDto;
