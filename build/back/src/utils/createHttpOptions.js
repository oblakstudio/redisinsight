"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpOptions = void 0;
const promises_1 = require("fs/promises");
const createHttpOptions = async (serverConfig) => {
    const { tlsKey, tlsCert } = serverConfig;
    try {
        const [key, cert] = await Promise.all([
            (0, promises_1.readFile)(tlsKey, { encoding: 'utf-8' }),
            (0, promises_1.readFile)(tlsCert, { encoding: 'utf-8' }),
        ]);
        return {
            key,
            cert,
        };
    }
    catch (e) {
    }
    const key = tlsKey.replace(/\\n/g, '\n');
    const cert = tlsCert.replace(/\\n/g, '\n');
    return {
        key,
        cert,
    };
};
exports.createHttpOptions = createHttpOptions;
