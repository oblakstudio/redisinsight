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
exports.KeyDto = exports.RedisDataType = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../common/decorators");
var RedisDataType;
(function (RedisDataType) {
    RedisDataType["String"] = "string";
    RedisDataType["Hash"] = "hash";
    RedisDataType["List"] = "list";
    RedisDataType["Set"] = "set";
    RedisDataType["ZSet"] = "zset";
    RedisDataType["Stream"] = "stream";
    RedisDataType["JSON"] = "ReJSON-RL";
    RedisDataType["Graph"] = "graphdata";
    RedisDataType["TS"] = "TSDB-TYPE";
})(RedisDataType = exports.RedisDataType || (exports.RedisDataType = {}));
class KeyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Key Name',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], KeyDto.prototype, "keyName", void 0);
exports.KeyDto = KeyDto;
