"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sshOptionsTransformer = void 0;
const lodash_1 = require("lodash");
const create_basic_ssh_options_dto_1 = require("../dto/create.basic-ssh-options.dto");
const create_cert_ssh_options_dto_1 = require("../dto/create.cert-ssh-options.dto");
const sshOptionsTransformer = (data) => {
    if ((0, lodash_1.get)(data === null || data === void 0 ? void 0 : data.object, 'sshOptions.privateKey')) {
        return create_cert_ssh_options_dto_1.CreateCertSshOptionsDto;
    }
    return create_basic_ssh_options_dto_1.CreateBasicSshOptionsDto;
};
exports.sshOptionsTransformer = sshOptionsTransformer;
