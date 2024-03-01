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
exports.SearchJSON = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../browser/keys/dto");
const client_1 = require("../../redis/client");
class SearchJSON {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Redis client',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", client_1.RedisClient)
], SearchJSON.prototype, "client", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Database id',
        type: String,
        example: 'id',
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], SearchJSON.prototype, "databaseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Keys info',
        type: dto_1.GetKeyInfoResponse,
    }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Array)
], SearchJSON.prototype, "keys", void 0);
exports.SearchJSON = SearchJSON;
