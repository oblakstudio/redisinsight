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
exports.CloudJobInfo = exports.CloudJobStep = exports.CloudJobStatus = exports.CloudJobRunMode = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const constants_1 = require("../constants");
const common_1 = require("@nestjs/common");
var CloudJobRunMode;
(function (CloudJobRunMode) {
    CloudJobRunMode["Async"] = "async";
    CloudJobRunMode["Sync"] = "sync";
})(CloudJobRunMode = exports.CloudJobRunMode || (exports.CloudJobRunMode = {}));
var CloudJobStatus;
(function (CloudJobStatus) {
    CloudJobStatus["Initializing"] = "initializing";
    CloudJobStatus["Running"] = "running";
    CloudJobStatus["Finished"] = "finished";
    CloudJobStatus["Failed"] = "failed";
})(CloudJobStatus = exports.CloudJobStatus || (exports.CloudJobStatus = {}));
var CloudJobStep;
(function (CloudJobStep) {
    CloudJobStep["Credentials"] = "credentials";
    CloudJobStep["Subscription"] = "subscription";
    CloudJobStep["Database"] = "database";
    CloudJobStep["Import"] = "import";
})(CloudJobStep = exports.CloudJobStep || (exports.CloudJobStep = {}));
class CloudJobInfo {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudJobInfo.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: constants_1.CloudJobName,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudJobInfo.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: CloudJobStatus,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudJobInfo.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Children job if any',
        type: () => CloudJobInfo,
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => CloudJobInfo),
    __metadata("design:type", CloudJobInfo)
], CloudJobInfo.prototype, "child", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Error if any',
        type: () => common_1.HttpException,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], CloudJobInfo.prototype, "error", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Job result',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Object)
], CloudJobInfo.prototype, "result", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Job step',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], CloudJobInfo.prototype, "step", void 0);
exports.CloudJobInfo = CloudJobInfo;
