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
exports.BrowserHistory = exports.ScanFilter = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../../../common/constants");
const dto_1 = require("../../keys/dto");
class ScanFilter {
    constructor() {
        this.type = null;
        this.match = '*';
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key type',
        type: String,
        example: 'list',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Expose)(),
    (0, class_validator_1.IsEnum)(dto_1.RedisDataType, {
        message: `type must be a valid enum value. Valid values: ${Object.values(dto_1.RedisDataType)}.`,
    }),
    __metadata("design:type", String)
], ScanFilter.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Match glob patterns',
        type: String,
        example: 'device:*',
        default: '*',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], ScanFilter.prototype, "match", void 0);
exports.ScanFilter = ScanFilter;
class BrowserHistory {
    constructor() {
        this.filter = new ScanFilter();
        this.mode = constants_1.BrowserHistoryMode.Pattern;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'History id',
        type: String,
        default: '76dd5654-814b-4e49-9c72-b236f50891f4',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BrowserHistory.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database id',
        type: String,
        default: '76dd5654-814b-4e49-9c72-b236f50891f4',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BrowserHistory.prototype, "databaseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filters for scan operation',
        type: () => ScanFilter,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => ScanFilter),
    __metadata("design:type", ScanFilter)
], BrowserHistory.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mode of history',
        default: constants_1.BrowserHistoryMode.Pattern,
        enum: constants_1.BrowserHistoryMode,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], BrowserHistory.prototype, "mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'History created date (ISO string)',
        type: Date,
        default: '2022-09-16T06:29:20.000Z',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Date)
], BrowserHistory.prototype, "createdAt", void 0);
exports.BrowserHistory = BrowserHistory;
