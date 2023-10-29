"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliClientMetadata = void 0;
const constants_1 = require("../../../common/constants");
const common_1 = require("@nestjs/common");
const models_1 = require("../../../common/models");
const decorators_1 = require("../../../common/decorators");
const CliClientMetadata = (databaseIdParam = constants_1.API_PARAM_DATABASE_ID, uniqueIdParam = constants_1.API_PARAM_CLI_CLIENT_ID) => (0, common_1.createParamDecorator)(decorators_1.clientMetadataParamFactory)({
    context: models_1.ClientContext.CLI,
    databaseIdParam,
    uniqueIdParam,
});
exports.CliClientMetadata = CliClientMetadata;
