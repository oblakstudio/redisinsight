"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogFile = void 0;
const path_1 = require("path");
const fs = require("fs-extra");
const config_1 = require("../../../utils/config");
const file_logs_emitter_1 = require("../emitters/file.logs-emitter");
const constants_1 = require("../../../constants");
const DIR_PATH = config_1.default.get('dir_path');
const PROFILER = config_1.default.get('profiler');
class LogFile {
    constructor(instanceId, id, analyticsEvents) {
        this.clientObservers = new Map();
        this.idleSince = 0;
        this.instanceId = instanceId;
        this.id = id;
        this.alias = id;
        this.filePath = (0, path_1.join)(DIR_PATH.tmpDir, this.id);
        this.startTime = new Date();
        this.analyticsEvents = analyticsEvents || new Map();
    }
    getWriteStream() {
        if (!this.writeStream) {
            fs.ensureFileSync(this.filePath);
            this.writeStream = fs.createWriteStream(this.filePath, { flags: 'a' });
        }
        this.writeStream.on('error', () => { });
        return this.writeStream;
    }
    getReadStream() {
        fs.ensureFileSync(this.filePath);
        const stream = fs.createReadStream(this.filePath);
        stream.once('end', () => {
            stream.destroy();
            try {
                this.analyticsEvents.get(constants_1.TelemetryEvents.ProfilerLogDownloaded)(this.instanceId, this.getFileSize());
            }
            catch (e) {
            }
        });
        return stream;
    }
    getEmitter() {
        if (!this.emitter) {
            this.emitter = new file_logs_emitter_1.FileLogsEmitter(this);
        }
        return this.emitter;
    }
    getFilename() {
        return `${this.alias}-${this.startTime.getTime()}-${Date.now()}`;
    }
    getFileSize() {
        const stats = fs.statSync(this.filePath);
        return stats.size;
    }
    setAlias(alias) {
        this.alias = alias;
    }
    addProfilerClient(id) {
        this.clientObservers.set(id, id);
        this.idleSince = 0;
    }
    removeProfilerClient(id) {
        this.clientObservers.delete(id);
        if (!this.clientObservers.size) {
            this.idleSince = Date.now();
            setTimeout(() => {
                if ((this === null || this === void 0 ? void 0 : this.idleSince) && Date.now() - this.idleSince >= PROFILER.logFileIdleThreshold) {
                    this.destroy();
                }
            }, PROFILER.logFileIdleThreshold);
        }
    }
    destroy() {
        var _a;
        try {
            (_a = this.writeStream) === null || _a === void 0 ? void 0 : _a.close();
            this.writeStream = null;
            const size = this.getFileSize();
            fs.unlinkSync(this.filePath);
            this.analyticsEvents.get(constants_1.TelemetryEvents.ProfilerLogDeleted)(this.instanceId, size);
        }
        catch (e) {
        }
    }
}
exports.LogFile = LogFile;
