"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const lodash_1 = require("lodash");
const common_1 = require("@nestjs/common");
const user_client_1 = require("../model/user-client");
exports.Client = (0, common_1.createParamDecorator)((data, ctx) => {
    const socket = ctx.switchToWs().getClient();
    return new user_client_1.UserClient(socket.id, socket, (0, lodash_1.get)(socket, 'handshake.query.instanceId'));
});
