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
exports.CloudTask = exports.CloudTaskStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
var CloudTaskStatus;
(function (CloudTaskStatus) {
    CloudTaskStatus["Initialized"] = "initialized";
    CloudTaskStatus["Received"] = "received";
    CloudTaskStatus["ProcessingInProgress"] = "processing-in-progress";
    CloudTaskStatus["ProcessingCompleted"] = "processing-completed";
    CloudTaskStatus["ProcessingError"] = "processing-error";
})(CloudTaskStatus = exports.CloudTaskStatus || (exports.CloudTaskStatus = {}));
class CloudTask {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], CloudTask.prototype, "taskId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: String,
    }),
    __metadata("design:type", String)
], CloudTask.prototype, "commandType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Current status of the task',
        enum: CloudTaskStatus,
    }),
    __metadata("design:type", String)
], CloudTask.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
    }),
    __metadata("design:type", Date)
], CloudTask.prototype, "timestamp", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Short info on what happened',
        type: String,
    }),
    __metadata("design:type", String)
], CloudTask.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional info',
    }),
    __metadata("design:type", Object)
], CloudTask.prototype, "response", void 0);
exports.CloudTask = CloudTask;
