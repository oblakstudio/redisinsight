"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShortLibrary = void 0;
const swagger_1 = require("@nestjs/swagger");
const library_1 = require("./library");
class ShortLibrary extends (0, swagger_1.PickType)(library_1.Library, ['name', 'user', 'totalFunctions', 'pendingJobs']) {
}
exports.ShortLibrary = ShortLibrary;
