"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkbenchClientMetadata = void 0;
const constants_1 = require("../../../common/constants");
const common_1 = require("@nestjs/common");
const models_1 = require("../../../common/models");
const decorators_1 = require("../../../common/decorators");
const WorkbenchClientMetadata = (databaseIdParam = constants_1.API_PARAM_DATABASE_ID) => (0, common_1.createParamDecorator)(decorators_1.clientMetadataParamFactory)({
    context: models_1.ClientContext.Workbench,
    databaseIdParam,
});
exports.WorkbenchClientMetadata = WorkbenchClientMetadata;
