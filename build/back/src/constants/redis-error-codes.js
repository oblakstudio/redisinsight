"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertificatesErrorCodes = exports.RedisErrorCodes = void 0;
var RedisErrorCodes;
(function (RedisErrorCodes) {
    RedisErrorCodes["WrongType"] = "WRONGTYPE";
    RedisErrorCodes["NoPermission"] = "NOPERM";
    RedisErrorCodes["ConnectionRefused"] = "ECONNREFUSED";
    RedisErrorCodes["InvalidPassword"] = "WRONGPASS";
    RedisErrorCodes["AuthRequired"] = "NOAUTH";
    RedisErrorCodes["ConnectionNotFound"] = "ENOTFOUND";
    RedisErrorCodes["DNSTimeoutError"] = "EAI_AGAIN";
    RedisErrorCodes["SentinelParamsRequired"] = "SENTINEL_PARAMS_REQUIRED";
    RedisErrorCodes["ConnectionReset"] = "ECONNRESET";
    RedisErrorCodes["Timeout"] = "ETIMEDOUT";
    RedisErrorCodes["CommandSyntaxError"] = "syntax error";
    RedisErrorCodes["BusyGroup"] = "BUSYGROUP";
    RedisErrorCodes["NoGroup"] = "NOGROUP";
    RedisErrorCodes["UnknownCommand"] = "unknown command";
    RedisErrorCodes["RedisearchLimit"] = "LIMIT";
})(RedisErrorCodes = exports.RedisErrorCodes || (exports.RedisErrorCodes = {}));
var CertificatesErrorCodes;
(function (CertificatesErrorCodes) {
    CertificatesErrorCodes["IncorrectCertificates"] = "UNCERTAIN_STATE";
    CertificatesErrorCodes["DepthZeroSelfSignedCert"] = "DEPTH_ZERO_SELF_SIGNED_CERT";
    CertificatesErrorCodes["SelfSignedCertInChain"] = "SELF_SIGNED_CERT_IN_CHAIN";
    CertificatesErrorCodes["OSSLError"] = "ERR_OSSL";
})(CertificatesErrorCodes = exports.CertificatesErrorCodes || (exports.CertificatesErrorCodes = {}));
