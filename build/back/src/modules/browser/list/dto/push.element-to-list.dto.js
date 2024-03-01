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
exports.PushElementToListDto = exports.ListElementDestination = void 0;
const dto_1 = require("../../keys/dto");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const decorators_1 = require("../../../../common/decorators");
var ListElementDestination;
(function (ListElementDestination) {
    ListElementDestination["Tail"] = "TAIL";
    ListElementDestination["Head"] = "HEAD";
})(ListElementDestination = exports.ListElementDestination || (exports.ListElementDestination = {}));
class PushElementToListDto extends dto_1.KeyDto {
    constructor() {
        super(...arguments);
        this.destination = ListElementDestination.Tail;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'List element',
        type: String,
    }),
    (0, class_validator_1.IsDefined)(),
    (0, decorators_1.IsRedisString)(),
    (0, decorators_1.RedisStringType)(),
    __metadata("design:type", Object)
], PushElementToListDto.prototype, "element", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'In order to append elements to the end of the list, '
            + 'use the TAIL value, to prepend use HEAD value. '
            + 'Default: TAIL (when not specified)',
        default: ListElementDestination.Tail,
        enum: ListElementDestination,
    }),
    (0, class_validator_1.IsEnum)(ListElementDestination, {
        message: `destination must be a valid enum value. Valid values: ${Object.values(ListElementDestination)}.`,
    }),
    __metadata("design:type", String)
], PushElementToListDto.prototype, "destination", void 0);
exports.PushElementToListDto = PushElementToListDto;
