"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBasicSshOptionsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const ssh_options_1 = require("../models/ssh-options");
class CreateBasicSshOptionsDto extends (0, swagger_1.OmitType)(ssh_options_1.SshOptions, ['privateKey', 'passphrase', 'id']) {
}
exports.CreateBasicSshOptionsDto = CreateBasicSshOptionsDto;
