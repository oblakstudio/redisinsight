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
exports.ClientMetadata = exports.ClientContext = void 0;
const session_1 = require("./session");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var ClientContext;
(function (ClientContext) {
    ClientContext["Common"] = "Common";
    ClientContext["Browser"] = "Browser";
    ClientContext["CLI"] = "CLI";
    ClientContext["Workbench"] = "Workbench";
    ClientContext["Profiler"] = "Profiler";
})(ClientContext = exports.ClientContext || (exports.ClientContext = {}));
class ClientMetadata {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => session_1.Session),
    __metadata("design:type", session_1.SessionMetadata)
], ClientMetadata.prototype, "sessionMetadata", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientMetadata.prototype, "databaseId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEnum)(ClientContext, {
        message: `context must be a valid enum value. Valid values: ${Object.values(ClientContext)}.`,
    }),
    __metadata("design:type", String)
], ClientMetadata.prototype, "context", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ClientMetadata.prototype, "uniqueId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(2147483647),
    __metadata("design:type", Number)
], ClientMetadata.prototype, "db", void 0);
exports.ClientMetadata = ClientMetadata;
