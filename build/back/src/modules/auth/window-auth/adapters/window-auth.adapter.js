"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowsAuthAdapter = void 0;
const common_1 = require("@nestjs/common");
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const lodash_1 = require("lodash");
const constants_1 = require("../../../../common/constants");
const error_messages_1 = require("../../../../constants/error-messages");
const window_auth_service_1 = require("../window-auth.service");
class WindowsAuthAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app) {
        super(app);
        this.app = app;
        this.logger = new common_1.Logger('WindowsAuthAdapter');
        this.windowAuthService = this.app.get(window_auth_service_1.WindowAuthService);
    }
    async bindMessageHandlers(socket, handlers, transform) {
        var _a;
        const windowId = (0, lodash_1.get)(socket, `handshake.headers.${constants_1.API_HEADER_WINDOW_ID}`) || '';
        const isAuthorized = await ((_a = this.windowAuthService) === null || _a === void 0 ? void 0 : _a.isAuthorized(windowId));
        if (!isAuthorized) {
            this.logger.error(error_messages_1.default.UNDEFINED_WINDOW_ID);
            return;
        }
        return super.bindMessageHandlers(socket, handlers, transform);
    }
}
exports.WindowsAuthAdapter = WindowsAuthAdapter;
