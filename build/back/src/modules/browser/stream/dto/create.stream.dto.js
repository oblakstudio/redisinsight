"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStreamDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../keys/dto");
const add_stream_entries_dto_1 = require("./add.stream-entries.dto");
class CreateStreamDto extends (0, swagger_1.IntersectionType)(add_stream_entries_dto_1.AddStreamEntriesDto, dto_1.KeyWithExpireDto) {
}
exports.CreateStreamDto = CreateStreamDto;
