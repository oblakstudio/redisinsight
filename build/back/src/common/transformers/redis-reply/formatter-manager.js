"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatterManager = void 0;
class FormatterManager {
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
exports.FormatterManager = FormatterManager;
