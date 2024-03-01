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
exports.ModifyRejsonRlSetDto = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const validators_1 = require("../../../../validators");
class ModifyRejsonRlSetDto extends dto_1.KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Path of the json field',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ModifyRejsonRlSetDto.prototype, "path", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array of valid serialized jsons',
        type: String,
    }),
    (0, class_validator_1.Validate)(validators_1.SerializedJsonValidator),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ModifyRejsonRlSetDto.prototype, "data", void 0);
exports.ModifyRejsonRlSetDto = ModifyRejsonRlSetDto;
