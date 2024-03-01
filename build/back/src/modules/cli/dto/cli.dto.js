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
exports.DeleteClientResponse = exports.CreateCliClientResponse = exports.SendCommandResponse = exports.SendCommandDto = exports.CommandExecutionStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const output_formatter_interface_1 = require("../services/cli-business/output-formatter/output-formatter.interface");
var CommandExecutionStatus;
(function (CommandExecutionStatus) {
    CommandExecutionStatus["Success"] = "success";
    CommandExecutionStatus["Fail"] = "fail";
})(CommandExecutionStatus = exports.CommandExecutionStatus || (exports.CommandExecutionStatus = {}));
class SendCommandDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Redis CLI command',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], SendCommandDto.prototype, "command", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Define output format',
        default: output_formatter_interface_1.CliOutputFormatterTypes.Raw,
        enum: output_formatter_interface_1.CliOutputFormatterTypes,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(output_formatter_interface_1.CliOutputFormatterTypes, {
        message: `outputFormat must be a valid enum value. Valid values: ${Object.values(output_formatter_interface_1.CliOutputFormatterTypes)}.`,
    }),
    __metadata("design:type", String)
], SendCommandDto.prototype, "outputFormat", void 0);
exports.SendCommandDto = SendCommandDto;
class SendCommandResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Redis CLI response',
    }),
    __metadata("design:type", Object)
], SendCommandResponse.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Redis CLI command execution status',
        default: CommandExecutionStatus.Success,
        enum: CommandExecutionStatus,
    }),
    __metadata("design:type", String)
], SendCommandResponse.prototype, "status", void 0);
exports.SendCommandResponse = SendCommandResponse;
class CreateCliClientResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Client uuid',
    }),
    __metadata("design:type", String)
], CreateCliClientResponse.prototype, "uuid", void 0);
exports.CreateCliClientResponse = CreateCliClientResponse;
class DeleteClientResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Number of affected clients',
        type: Number,
    }),
    __metadata("design:type", Number)
], DeleteClientResponse.prototype, "affected", void 0);
exports.DeleteClientResponse = DeleteClientResponse;
