"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudAuthHeaders = exports.cloudAuthDtoFromRequestHeadersFactory = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const dto_1 = require("../dto");
const validator = new class_validator_1.Validator();
const cloudAuthDtoFromRequestHeadersFactory = (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const dto = (0, class_transformer_1.plainToClass)(dto_1.CloudCapiAuthDto, {
        capiKey: request.headers['x-cloud-api-key'],
        capiSecret: request.headers['x-cloud-api-secret'],
    });
    const errors = validator.validateSync(dto);
    if (errors === null || errors === void 0 ? void 0 : errors.length) {
        throw new common_1.UnauthorizedException('Required authentication credentials were not provided');
    }
    return dto;
};
exports.cloudAuthDtoFromRequestHeadersFactory = cloudAuthDtoFromRequestHeadersFactory;
exports.CloudAuthHeaders = (0, common_1.createParamDecorator)(exports.cloudAuthDtoFromRequestHeadersFactory);
