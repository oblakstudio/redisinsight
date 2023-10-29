"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputFormatterManager = void 0;
class OutputFormatterManager {
    constructor() {
        this.strategies = {};
    }
    addStrategy(name, strategy) {
        this.strategies[name] = strategy;
    }
    getStrategy(name) {
        if (!this.strategies[name]) {
            throw new Error(`Unsupported formatter strategy: ${name}`);
        }
        return this.strategies[name];
    }
}
exports.OutputFormatterManager = OutputFormatterManager;
