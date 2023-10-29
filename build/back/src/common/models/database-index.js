"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseIndex = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_metadata_1 = require("./client-metadata");
class DatabaseIndex extends (0, swagger_1.PickType)(client_metadata_1.ClientMetadata, ['db']) {
}
exports.DatabaseIndex = DatabaseIndex;
