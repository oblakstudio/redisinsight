"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableEndpoints = exports.testEndpoint = exports.getTCPEndpoints = exports.getRunningProcesses = exports.getSpawnArgs = void 0;
const os = require("os");
const net = require("net");
const child_process_1 = require("child_process");
const lodash_1 = require("lodash");
const getSpawnArgs = () => {
    switch (os.type()) {
        case 'Linux':
            return ['netstat', ['-anpt']];
        case 'Darwin':
            return ['netstat', ['-anvp', 'tcp']];
        case 'Windows_NT':
            return ['netstat.exe', ['-a', '-n', '-o']];
        default:
            throw new Error('Unsupported operation system');
    }
};
exports.getSpawnArgs = getSpawnArgs;
const getRunningProcesses = async () => new Promise((resolve, reject) => {
    try {
        let stdoutData = '';
        const proc = (0, child_process_1.spawn)(...(0, exports.getSpawnArgs)());
        proc.stdout.on('data', (data) => {
            stdoutData += data.toString();
        });
        proc.on('error', (e) => {
            reject(e);
        });
        proc.stdout.on('end', () => {
            resolve(stdoutData.split('\n'));
        });
    }
    catch (e) {
        reject(e);
    }
});
exports.getRunningProcesses = getRunningProcesses;
const getTCPEndpoints = (processes) => {
    const regExp = /\s((\d+\.\d+\.\d+\.\d+|\*)[:.]|([0-9a-fA-F\][]{0,4}[.:]){1,8})(\d+)\s/;
    const endpoints = new Map();
    processes.forEach((line) => {
        const match = line.match(regExp);
        if (match) {
            endpoints.set(match[4], {
                host: '127.0.0.1',
                port: parseInt(match[4], 10),
            });
        }
    });
    return [...endpoints.values()];
};
exports.getTCPEndpoints = getTCPEndpoints;
const testEndpoint = async (endpoint) => new Promise((resolve) => {
    const client = net.createConnection({
        host: endpoint.host,
        port: endpoint.port,
    }, () => {
        client.write('PING\r\n');
    });
    client.on('data', (data) => {
        client.end();
        if (data.toString().startsWith('+PONG')) {
            resolve(endpoint);
        }
        else {
            resolve(null);
        }
    });
    client.on('error', () => {
        resolve(null);
    });
    setTimeout(() => {
        client.end();
        resolve(null);
    }, 1000);
});
exports.testEndpoint = testEndpoint;
const getAvailableEndpoints = async () => {
    const endpoints = (0, exports.getTCPEndpoints)(await (0, exports.getRunningProcesses)());
    return (await Promise.all(endpoints.map(exports.testEndpoint))).filter(lodash_1.isObject);
};
exports.getAvailableEndpoints = getAvailableEndpoints;
