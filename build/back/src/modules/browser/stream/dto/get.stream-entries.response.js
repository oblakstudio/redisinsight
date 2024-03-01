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
exports.GetStreamEntriesResponse = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const stream_entry_dto_1 = require("./stream-entry.dto");
class GetStreamEntriesResponse extends dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'Total number of entries',
    }),
    __metadata("design:type", Number)
], GetStreamEntriesResponse.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Last generated id in the stream',
    }),
    __metadata("design:type", String)
], GetStreamEntriesResponse.prototype, "lastGeneratedId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'First stream entry',
        type: stream_entry_dto_1.StreamEntryDto,
    }),
    (0, class_transformer_1.Type)(() => stream_entry_dto_1.StreamEntryDto),
    __metadata("design:type", stream_entry_dto_1.StreamEntryDto)
], GetStreamEntriesResponse.prototype, "firstEntry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Last stream entry',
        type: stream_entry_dto_1.StreamEntryDto,
    }),
    (0, class_transformer_1.Type)(() => stream_entry_dto_1.StreamEntryDto),
    __metadata("design:type", stream_entry_dto_1.StreamEntryDto)
], GetStreamEntriesResponse.prototype, "lastEntry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Stream entries',
        type: stream_entry_dto_1.StreamEntryDto,
        isArray: true,
    }),
    (0, class_transformer_1.Type)(() => stream_entry_dto_1.StreamEntryDto),
    __metadata("design:type", Array)
], GetStreamEntriesResponse.prototype, "entries", void 0);
exports.GetStreamEntriesResponse = GetStreamEntriesResponse;
