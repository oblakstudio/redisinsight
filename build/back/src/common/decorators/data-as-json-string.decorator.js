"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataAsJsonString = void 0;
const common_1 = require("@nestjs/common");
const class_transformer_1 = require("class-transformer");
function DataAsJsonString() {
    return (0, common_1.applyDecorators)((0, class_transformer_1.Transform)((object) => JSON.stringify(object), { toClassOnly: true }), (0, class_transformer_1.Transform)((string) => {
        try {
            return JSON.parse(string);
        }
        catch (e) {
            return undefined;
        }
    }, { toPlainOnly: true }));
}
exports.DataAsJsonString = DataAsJsonString;
