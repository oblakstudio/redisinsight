"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySessionStorage = void 0;
const session_storage_1 = require("./session.storage");
class InMemorySessionStorage extends session_storage_1.SessionStorage {
    constructor() {
        super(...arguments);
        this.sessions = new Map();
    }
    async getSession(id) {
        return this.sessions.get(id) || null;
    }
    async createSession(session) {
        if (!this.sessions.has(session.id)) {
            this.sessions.set(session.id, session);
        }
        return this.getSession(session.id);
    }
    async updateSessionData(id, data) {
        const session = this.sessions.get(id);
        if (!session) {
            return null;
        }
        session.data = data;
        return this.getSession(id);
    }
    async deleteSession(id) {
        this.sessions.delete(id);
    }
}
exports.InMemorySessionStorage = InMemorySessionStorage;
