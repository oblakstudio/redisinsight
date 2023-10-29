"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbIndexValidationPipe = void 0;
const common_1 = require("@nestjs/common");
class DbIndexValidationPipe extends common_1.ValidationPipe {
    async transform(db, metadata) {
        return super.transform({ db }, metadata);
    }
}
exports.DbIndexValidationPipe = DbIndexValidationPipe;
