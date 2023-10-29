"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserClient = void 0;
class UserClient {
    constructor(id, socket, databaseId) {
        this.id = id;
        this.socket = socket;
        this.databaseId = databaseId;
    }
    getId() {
        return this.id;
    }
    getDatabaseId() {
        return this.databaseId;
    }
    getSocket() {
        return this.socket;
    }
}
exports.UserClient = UserClient;
