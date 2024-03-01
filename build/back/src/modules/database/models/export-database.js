"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportDatabase = void 0;
const swagger_1 = require("@nestjs/swagger");
const database_1 = require("./database");
class ExportDatabase extends (0, swagger_1.PickType)(database_1.Database, [
    'id',
    'host',
    'port',
    'name',
    'db',
    'username',
    'password',
    'connectionType',
    'nameFromProvider',
    'provider',
    'lastConnection',
    'sentinelMaster',
    'modules',
    'tls',
    'tlsServername',
    'verifyServerCert',
    'caCert',
    'clientCert',
    'ssh',
    'sshOptions',
    'compressor',
]) {
}
exports.ExportDatabase = ExportDatabase;
