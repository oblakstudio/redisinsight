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
exports.SlowLog = void 0;
const swagger_1 = require("@nestjs/swagger");
class SlowLog {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique slowlog Id calculated by Redis',
        example: 12,
        type: Number,
    }),
    __metadata("design:type", Number)
], SlowLog.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time when command was executed',
        example: 1652265051,
        type: Number,
    }),
    __metadata("design:type", Number)
], SlowLog.prototype, "time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Time needed to execute this command in microseconds',
        example: 57000,
        type: Number,
    }),
    __metadata("design:type", Number)
], SlowLog.prototype, "durationUs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Command with args',
        example: 'SET foo bar',
        type: String,
    }),
    __metadata("design:type", String)
], SlowLog.prototype, "args", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Client that executed this command',
        example: '127.17.0.1:46922',
        type: String,
    }),
    __metadata("design:type", String)
], SlowLog.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Client name if defined',
        example: 'redisinsight-common-e25b587e',
        type: String,
    }),
    __metadata("design:type", String)
], SlowLog.prototype, "client", void 0);
exports.SlowLog = SlowLog;
