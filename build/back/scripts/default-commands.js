"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const fs = require("fs");
const path = require("path");
const config_1 = require("../src/utils/config");
const PATH_CONFIG = (0, config_1.get)('dir_path');
const COMMANDS_CONFIG = (0, config_1.get)('commands');
async function init() {
    try {
        await Promise.all(COMMANDS_CONFIG.map(async ({ name, url, defaultUrl }) => {
            try {
                console.log(`Trying to get ${name} commands...`);
                const { data } = await axios_1.default.get(defaultUrl || url, {
                    responseType: 'text',
                    transformResponse: [(raw) => raw],
                });
                if (!fs.existsSync(PATH_CONFIG.defaultCommandsDir)) {
                    fs.mkdirSync(PATH_CONFIG.defaultCommandsDir, { recursive: true });
                }
                fs.writeFileSync(path.join(PATH_CONFIG.defaultCommandsDir, `${name}.json`), JSON.stringify(JSON.parse(data)));
                console.log(`Successfully generated default ${name} commands`);
            }
            catch (error) {
                console.error(`Unable to update ${name} commands`, error);
            }
        }));
        process.exit(0);
    }
    catch (e) {
        console.error('Something went wrong trying to get default commands jsons', e);
        process.exit(1);
    }
}
init();
