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
exports.SearchRedisearchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../common/decorators");
class SearchRedisearchDto {
    constructor() {
        this.limit = 500;
        this.offset = 0;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Index Name',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.RedisStringType)(),
    (0, decorators_1.IsRedisString)(),
    __metadata("design:type", Object)
], SearchRedisearchDto.prototype, "index", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Query to search inside data fields',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SearchRedisearchDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Limit number of results to be returned',
        type: Number,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchRedisearchDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Offset position to start searching',
        type: Number,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], SearchRedisearchDto.prototype, "offset", void 0);
exports.SearchRedisearchDto = SearchRedisearchDto;
