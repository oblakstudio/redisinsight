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
exports.CreateBrowserHistoryDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../../../../common/constants");
const get_browser_history_dto_1 = require("./get.browser-history.dto");
class CreateBrowserHistoryDto {
    constructor() {
        this.filter = new get_browser_history_dto_1.ScanFilter();
        this.mode = constants_1.BrowserHistoryMode.Pattern;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Filters for scan operation',
        type: () => get_browser_history_dto_1.ScanFilter,
        default: new get_browser_history_dto_1.ScanFilter(),
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => get_browser_history_dto_1.ScanFilter),
    __metadata("design:type", get_browser_history_dto_1.ScanFilter)
], CreateBrowserHistoryDto.prototype, "filter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Search mode',
        type: String,
        example: constants_1.BrowserHistoryMode.Pattern,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(constants_1.BrowserHistoryMode, {
        message: `mode must be a valid enum value. Valid values: ${Object.values(constants_1.BrowserHistoryMode)}.`,
    }),
    __metadata("design:type", String)
], CreateBrowserHistoryDto.prototype, "mode", void 0);
exports.CreateBrowserHistoryDto = CreateBrowserHistoryDto;
