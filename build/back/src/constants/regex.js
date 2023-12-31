"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_TIMESTAMP = exports.PRIVATE_IP_ADDRESS_REGEX = exports.IP_ADDRESS_REGEX = exports.IS_NON_PRINTABLE_ASCII_CHARACTER = exports.IS_NUMBER_REGEX = exports.IS_INTEGER_NUMBER_REGEX = exports.ARG_IN_QUOTATION_MARKS_REGEX = void 0;
exports.ARG_IN_QUOTATION_MARKS_REGEX = /"[^"]*|'[^']*'|"+/g;
exports.IS_INTEGER_NUMBER_REGEX = /^\d+$/;
exports.IS_NUMBER_REGEX = /^-?\d*(\.\d+)?$/;
exports.IS_NON_PRINTABLE_ASCII_CHARACTER = /[^ -~\u0007\b\t\n\r]/;
exports.IP_ADDRESS_REGEX = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
exports.PRIVATE_IP_ADDRESS_REGEX = /(^127\.)|(^10\.)|(^172\.1[6-9]\.)|(^172\.2[0-9]\.)|(^172\.3[0-1]\.)|(^192\.168\.)/;
exports.IS_TIMESTAMP = /^(\d{10}|\d{13}|\d{16}|\d{19})$/;
