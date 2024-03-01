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
exports.BulkActionFilter = void 0;
const dto_1 = require("../../browser/keys/dto");
const class_validator_1 = require("class-validator");
class BulkActionFilter {
    constructor() {
        this.type = null;
        this.match = '*';
        this.count = 10000;
    }
    getScanArgsArray() {
        const args = ['count', this.count, 'match', this.match];
        if (this.type) {
            args.push('type', this.type);
        }
        return args;
    }
    getCount() {
        return this.count;
    }
    getOverview() {
        return {
            match: this.match,
            type: this.type,
        };
    }
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(dto_1.RedisDataType, {
        message: `type must be a valid enum value. Valid values: ${Object.values(dto_1.RedisDataType)}.`,
    }),
    __metadata("design:type", String)
], BulkActionFilter.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkActionFilter.prototype, "match", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], BulkActionFilter.prototype, "count", void 0);
exports.BulkActionFilter = BulkActionFilter;
