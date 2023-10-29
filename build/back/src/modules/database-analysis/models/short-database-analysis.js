"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortDatabaseAnalysis = void 0;
const swagger_1 = require("@nestjs/swagger");
const database_analysis_1 = require("./database-analysis");
class ShortDatabaseAnalysis extends (0, swagger_1.PartialType)((0, swagger_1.PickType)(database_analysis_1.DatabaseAnalysis, ['id', 'createdAt', 'db'])) {
}
exports.ShortDatabaseAnalysis = ShortDatabaseAnalysis;
