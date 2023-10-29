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
exports.Endpoint = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class Endpoint {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The hostname of your Redis database, for example redis.acme.com.'
            + ' If your Redis server is running on your local machine, you can enter either 127.0.0.1 or localhost.',
        type: String,
        default: 'localhost',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)({ always: true }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], Endpoint.prototype, "host", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The port your Redis database is available on.',
        type: Number,
        default: 6379,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsInt)({ always: true }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", Number)
], Endpoint.prototype, "port", void 0);
exports.Endpoint = Endpoint;
