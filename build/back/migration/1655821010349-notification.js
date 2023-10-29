"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notification1655821010349 = void 0;
class notification1655821010349 {
    constructor() {
        this.name = 'notification1655821010349';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "notification" ("type" varchar CHECK( type IN ('global') ) NOT NULL, "timestamp" integer NOT NULL, "title" varchar NOT NULL, "body" text NOT NULL, "read" boolean NOT NULL DEFAULT (0), PRIMARY KEY ("type", "timestamp"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "notification"`);
    }
}
exports.notification1655821010349 = notification1655821010349;
