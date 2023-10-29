"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestSessionMetadata = exports.sessionMetadataFromRequestFactory = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const models_1 = require("../../models");
const validator = new class_validator_1.Validator();
const sessionMetadataFromRequestFactory = (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const session = (0, class_transformer_1.plainToClass)(models_1.SessionMetadata, request.session);
    const errors = validator.validateSync(session, {
        whitelist: false,
    });
    if (errors === null || errors === void 0 ? void 0 : errors.length) {
        throw new common_1.BadRequestException(Object.values(errors[0].constraints) || 'Bad request');
    }
    return session;
};
exports.sessionMetadataFromRequestFactory = sessionMetadataFromRequestFactory;
exports.RequestSessionMetadata = (0, common_1.createParamDecorator)(exports.sessionMetadataFromRequestFactory);
