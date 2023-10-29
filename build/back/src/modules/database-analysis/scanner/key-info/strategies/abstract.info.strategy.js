"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractInfoStrategy = void 0;
class AbstractInfoStrategy {
    async getLengthSafe(client, key) {
        try {
            return await this.getLength(client, key);
        }
        catch (e) {
            return null;
        }
    }
}
exports.AbstractInfoStrategy = AbstractInfoStrategy;
