"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateListWithExpireDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../keys/dto");
const push_element_to_list_dto_1 = require("./push.element-to-list.dto");
class CreateListWithExpireDto extends (0, swagger_1.IntersectionType)(push_element_to_list_dto_1.PushElementToListDto, dto_1.KeyWithExpireDto) {
}
exports.CreateListWithExpireDto = CreateListWithExpireDto;
