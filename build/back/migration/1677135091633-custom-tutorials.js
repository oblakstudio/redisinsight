"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customTutorials1677135091633 = void 0;
class customTutorials1677135091633 {
    constructor() {
        this.name = 'customTutorials1677135091633';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "custom_tutorials" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "link" varchar, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "custom_tutorials"`);
    }
}
exports.customTutorials1677135091633 = customTutorials1677135091633;
