"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withTimeout = void 0;
const withTimeout = (promise, delay, error) => {
    let timer = null;
    return Promise.race([
        new Promise((resolve, reject) => {
            timer = setTimeout(reject, delay, error);
            return timer;
        }),
        promise.then((value) => {
            clearTimeout(timer);
            return value;
        }),
    ]);
};
exports.withTimeout = withTimeout;
