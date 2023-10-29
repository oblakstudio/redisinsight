"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientMetadataParam = exports.clientMetadataParamFactory = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
const models_1 = require("../../models");
const class_validator_1 = require("class-validator");
const constants_1 = require("../../constants");
const swagger_1 = require("@nestjs/swagger");
const session_metadata_decorator_1 = require("../session/session-metadata.decorator");
const validator = new class_validator_1.Validator();
const clientMetadataParamFactory = (options, ctx) => {
    var _a, _b, _c;
    const req = ctx.switchToHttp().getRequest();
    let databaseId;
    if (options === null || options === void 0 ? void 0 : options.databaseIdParam) {
        databaseId = (_a = req.params) === null || _a === void 0 ? void 0 : _a[options.databaseIdParam];
    }
    let uniqueId;
    if (options === null || options === void 0 ? void 0 : options.uniqueIdParam) {
        uniqueId = (_b = req.params) === null || _b === void 0 ? void 0 : _b[options.uniqueIdParam];
    }
    const clientMetadata = (0, class_transformer_1.plainToClass)(models_1.ClientMetadata, {
        sessionMetadata: (0, session_metadata_decorator_1.sessionMetadataFromRequestFactory)(undefined, ctx),
        databaseId,
        uniqueId,
        context: (options === null || options === void 0 ? void 0 : options.context) || models_1.ClientContext.Common,
        db: (options === null || options === void 0 ? void 0 : options.ignoreDbIndex) ? undefined : (_c = req === null || req === void 0 ? void 0 : req.headers) === null || _c === void 0 ? void 0 : _c[constants_1.API_HEADER_DATABASE_INDEX],
    });
    const errors = validator.validateSync(clientMetadata, {
        whitelist: false,
    });
    if (errors === null || errors === void 0 ? void 0 : errors.length) {
        throw new common_1.BadRequestException(Object.values(errors[0].constraints) || 'Bad request');
    }
    return clientMetadata;
};
exports.clientMetadataParamFactory = clientMetadataParamFactory;
const ClientMetadataParam = (options) => {
    const opts = {
        context: models_1.ClientContext.Common,
        databaseIdParam: constants_1.API_PARAM_DATABASE_ID,
        ignoreDbIndex: false,
        ...options,
    };
    return (0, common_1.createParamDecorator)(exports.clientMetadataParamFactory, [
        (target, key) => {
            (0, swagger_1.ApiParam)({
                name: opts.databaseIdParam,
                schema: { type: 'string' },
                required: true,
            })(target, key, Object.getOwnPropertyDescriptor(target, key));
            if (!opts.ignoreDbIndex) {
                (0, swagger_1.ApiHeader)({
                    name: constants_1.API_HEADER_DATABASE_INDEX,
                    schema: {
                        default: undefined,
                        type: 'number',
                        minimum: 0,
                    },
                    required: false,
                })(target, key, Object.getOwnPropertyDescriptor(target, key));
            }
        },
    ])(opts);
};
exports.ClientMetadataParam = ClientMetadataParam;
