"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddStreamEntriesDto = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const stream_entry_dto_1 = require("./stream-entry.dto");
class AddStreamEntriesDto extends dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Entries to push',
        type: stream_entry_dto_1.StreamEntryDto,
        isArray: true,
        example: [
            {
                id: '*',
                fields: [{ name: 'field1', value: 'value1' }, { name: 'field2', value: 'value2' }],
            },
            {
                id: '*',
                fields: [{ name: 'field1', value: 'value1' }, { name: 'field2', value: 'value2' }],
            },
        ],
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => stream_entry_dto_1.StreamEntryDto),
    __metadata("design:type", Array)
], AddStreamEntriesDto.prototype, "entries", void 0);
exports.AddStreamEntriesDto = AddStreamEntriesDto;
