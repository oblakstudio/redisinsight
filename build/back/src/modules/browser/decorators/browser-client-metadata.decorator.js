"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserClientMetadata = void 0;
const constants_1 = require("../../../common/constants");
const models_1 = require("../../../common/models");
const decorators_1 = require("../../../common/decorators");
const BrowserClientMetadata = (databaseIdParam = constants_1.API_PARAM_DATABASE_ID) => (0, decorators_1.ClientMetadataParam)({
    context: models_1.ClientContext.Browser,
    databaseIdParam,
});
exports.BrowserClientMetadata = BrowserClientMetadata;
