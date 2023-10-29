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
exports.SlowLogConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SlowLogConfig {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Max logs to store inside Redis slowlog',
        example: 128,
        type: Number,
    }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], SlowLogConfig.prototype, "slowlogMaxLen", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Store logs with execution time greater than this value (in microseconds)',
        example: 10000,
        type: Number,
    }),
    (0, class_validator_1.NotEquals)(null),
    (0, class_validator_1.ValidateIf)((object, value) => value !== undefined),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(-1),
    __metadata("design:type", Number)
], SlowLogConfig.prototype, "slowlogLogSlowerThan", void 0);
exports.SlowLogConfig = SlowLogConfig;
