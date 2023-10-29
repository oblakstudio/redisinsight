"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterNodeNotFoundError = exports.WrongDatabaseTypeError = exports.CommandNotSupportedError = exports.RedirectionParsingError = exports.CommandParsingError = void 0;
const models_1 = require("../../../models");
class CommandParsingError extends models_1.ReplyError {
    constructor(args) {
        super(args);
        this.name = 'CommandParsingError';
    }
}
exports.CommandParsingError = CommandParsingError;
class RedirectionParsingError extends models_1.ReplyError {
    constructor(args = 'Could not parse redirection error.') {
        super(args);
        this.name = 'RedirectionParsingError';
    }
}
exports.RedirectionParsingError = RedirectionParsingError;
class CommandNotSupportedError extends models_1.ReplyError {
    constructor(args) {
        super(args);
        this.name = 'CommandNotSupportedError';
    }
}
exports.CommandNotSupportedError = CommandNotSupportedError;
class WrongDatabaseTypeError extends Error {
    constructor(args) {
        super(args);
        this.name = 'WrongDatabaseTypeError';
    }
}
exports.WrongDatabaseTypeError = WrongDatabaseTypeError;
class ClusterNodeNotFoundError extends Error {
    constructor(args) {
        super(args);
        this.name = 'ClusterNodeNotFoundError';
    }
}
exports.ClusterNodeNotFoundError = ClusterNodeNotFoundError;
