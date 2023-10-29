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
exports.DeleteClientResponse = exports.CreateCliClientResponse = exports.SendClusterCommandResponse = exports.SendCommandResponse = exports.SendClusterCommandDto = exports.ClusterSingleNodeOptions = exports.SendCommandDto = exports.CreateCliClientDto = exports.ClusterNodeRole = exports.CommandExecutionStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const models_1 = require("../../../common/models");
const output_formatter_interface_1 = require("../services/cli-business/output-formatter/output-formatter.interface");
var CommandExecutionStatus;
(function (CommandExecutionStatus) {
    CommandExecutionStatus["Success"] = "success";
    CommandExecutionStatus["Fail"] = "fail";
})(CommandExecutionStatus = exports.CommandExecutionStatus || (exports.CommandExecutionStatus = {}));
var ClusterNodeRole;
(function (ClusterNodeRole) {
    ClusterNodeRole["All"] = "ALL";
    ClusterNodeRole["Master"] = "MASTER";
    ClusterNodeRole["Slave"] = "SLAVE";
})(ClusterNodeRole = exports.ClusterNodeRole || (exports.ClusterNodeRole = {}));
class ClusterNode extends models_1.Endpoint {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Cluster node slot.',
        type: Number,
        example: 0,
    }),
    __metadata("design:type", Number)
], ClusterNode.prototype, "slot", void 0);
class CreateCliClientDto {
}
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: String,
        example: 'workbench',
        description: 'This namespace will be used in Redis client connection name',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCliClientDto.prototype, "namespace", void 0);
exports.CreateCliClientDto = CreateCliClientDto;
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
class ClusterSingleNodeOptions extends models_1.Endpoint {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Use redirects for OSS Cluster or not.',
        type: Boolean,
        default: true,
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsDefined)(),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Boolean)
], ClusterSingleNodeOptions.prototype, "enableRedirection", void 0);
exports.ClusterSingleNodeOptions = ClusterSingleNodeOptions;
class SendClusterCommandDto extends SendCommandDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Execute command for nodes with defined role',
        default: ClusterNodeRole.All,
        enum: ClusterNodeRole,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsEnum)(ClusterNodeRole, {
        message: `role must be a valid enum value. Valid values: ${Object.values(ClusterNodeRole)}.`,
    }),
    __metadata("design:type", String)
], SendClusterCommandDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Should be provided if only one node needs to execute the command.',
        type: ClusterSingleNodeOptions,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_transformer_1.Type)(() => ClusterSingleNodeOptions),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", ClusterSingleNodeOptions)
], SendClusterCommandDto.prototype, "nodeOptions", void 0);
exports.SendClusterCommandDto = SendClusterCommandDto;
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
class SendClusterCommandResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
        description: 'Redis CLI response',
    }),
    __metadata("design:type", Object)
], SendClusterCommandResponse.prototype, "response", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        type: () => ClusterNode,
        description: 'Redis Cluster Node info',
    }),
    __metadata("design:type", ClusterNode)
], SendClusterCommandResponse.prototype, "node", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Redis CLI command execution status',
        default: CommandExecutionStatus.Success,
        enum: CommandExecutionStatus,
    }),
    __metadata("design:type", String)
], SendClusterCommandResponse.prototype, "status", void 0);
exports.SendClusterCommandResponse = SendClusterCommandResponse;
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
