"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverInfo1626086601057 = void 0;
class serverInfo1626086601057 {
    constructor() {
        this.name = 'serverInfo1626086601057';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "server" ("id" varchar PRIMARY KEY NOT NULL, "createDateTime" datetime NOT NULL DEFAULT (datetime('now')))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "server"`);
    }
}
exports.serverInfo1626086601057 = serverInfo1626086601057;
