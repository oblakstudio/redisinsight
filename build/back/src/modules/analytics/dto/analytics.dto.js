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
exports.SendEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class SendEventDto {
    constructor() {
        this.eventData = {};
        this.nonTracking = false;
        this.traits = {};
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Telemetry event name.',
        type: String,
        example: 'APPLICATION_UPDATED',
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], SendEventDto.prototype, "event", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Telemetry event data.',
        type: Object,
        example: { length: 5 },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], SendEventDto.prototype, "eventData", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Does not track the specific user in any way?',
        type: Boolean,
        example: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], SendEventDto.prototype, "nonTracking", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'User data.',
        type: Object,
        example: { telemetry: true },
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Object)
], SendEventDto.prototype, "traits", void 0);
exports.SendEventDto = SendEventDto;
