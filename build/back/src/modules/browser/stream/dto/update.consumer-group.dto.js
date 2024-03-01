"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateConsumerGroupDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../keys/dto");
const create_consumer_groups_dto_1 = require("./create.consumer-groups.dto");
class UpdateConsumerGroupDto extends (0, swagger_1.IntersectionType)(dto_1.KeyDto, create_consumer_groups_dto_1.CreateConsumerGroupDto) {
}
exports.UpdateConsumerGroupDto = UpdateConsumerGroupDto;
