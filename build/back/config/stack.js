"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
exports.default = {
    server: {
        excludeRoutes: [
            'redis-enterprise/*',
            'redis-sentinel/*',
            { path: 'databases/import' },
            { path: 'databases', method: common_1.RequestMethod.POST },
            { path: 'databases', method: common_1.RequestMethod.DELETE },
            { path: 'databases/:id', method: common_1.RequestMethod.DELETE },
        ],
    },
};
