"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileLogsEmitter = void 0;
class FileLogsEmitter {
    constructor(logFile) {
        this.id = logFile.id;
        this.logFile = logFile;
    }
    async emit(items) {
        try {
            if (!this.logFile.getWriteStream()) {
                return;
            }
            const text = items.map((item) => {
                const args = (item.args.map((arg) => `${JSON.stringify(arg)}`)).join(' ');
                return `${item.time} [${item.database} ${item.source}] ${args}`;
            }).join('\n');
            this.logFile.getWriteStream().write(`${text}\n`);
        }
        catch (e) {
        }
    }
    async addProfilerClient(id) {
        return this.logFile.addProfilerClient(id);
    }
    async removeProfilerClient(id) {
        return this.logFile.removeProfilerClient(id);
    }
    async flushLogs() {
        return this.logFile.destroy();
    }
}
exports.FileLogsEmitter = FileLogsEmitter;
