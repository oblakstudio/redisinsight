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
exports.GetSetMembersResponse = exports.SetScanResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const dto_1 = require("../../keys/dto");
const decorators_1 = require("../../../../common/decorators");
class SetScanResponse extends dto_1.KeyResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        minimum: 0,
        description: 'The new cursor to use in the next call.'
            + ' If the property has value of 0, then the iteration is completed.',
    }),
    __metadata("design:type", Number)
], SetScanResponse.prototype, "nextCursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => String,
        description: 'Array of members.',
        isArray: true,
    }),
    (0, decorators_1.RedisStringType)({ each: true }),
    __metadata("design:type", Array)
], SetScanResponse.prototype, "members", void 0);
exports.SetScanResponse = SetScanResponse;
class GetSetMembersResponse extends SetScanResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Number,
        description: 'The number of members in the currently-selected set.',
    }),
    __metadata("design:type", Number)
], GetSetMembersResponse.prototype, "total", void 0);
exports.GetSetMembersResponse = GetSetMembersResponse;
