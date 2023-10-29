"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCloudTaskCapiResponse = void 0;
const class_transformer_1 = require("class-transformer");
const models_1 = require("../models");
const parseCloudTaskCapiResponse = (task) => (0, class_transformer_1.plainToClass)(models_1.CloudTask, task);
exports.parseCloudTaskCapiResponse = parseCloudTaskCapiResponse;
