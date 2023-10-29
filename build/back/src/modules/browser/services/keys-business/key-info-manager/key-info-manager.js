"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyInfoManager = void 0;
class KeyInfoManager {
    constructor(defaultStrategy) {
        this.strategies = {};
        this.defaultStrategy = defaultStrategy;
    }
    addStrategy(name, strategy) {
        this.strategies[name] = strategy;
    }
    getStrategy(name) {
        if (!this.strategies[name]) {
            return this.defaultStrategy;
        }
        return this.strategies[name];
    }
}
exports.KeyInfoManager = KeyInfoManager;
