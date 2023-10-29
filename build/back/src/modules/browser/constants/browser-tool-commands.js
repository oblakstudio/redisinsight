"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserToolTSCommands = exports.BrowserToolStreamCommands = exports.BrowserToolGraphCommands = exports.BrowserToolRejsonRlCommands = exports.BrowserToolZSetCommands = exports.BrowserToolSetCommands = exports.BrowserToolListCommands = exports.BrowserToolHashCommands = exports.BrowserToolStringCommands = exports.BrowserToolKeysCommands = void 0;
var BrowserToolKeysCommands;
(function (BrowserToolKeysCommands) {
    BrowserToolKeysCommands["Scan"] = "scan";
    BrowserToolKeysCommands["Ttl"] = "ttl";
    BrowserToolKeysCommands["Type"] = "type";
    BrowserToolKeysCommands["Exists"] = "exists";
    BrowserToolKeysCommands["Expire"] = "expire";
    BrowserToolKeysCommands["Persist"] = "persist";
    BrowserToolKeysCommands["Del"] = "del";
    BrowserToolKeysCommands["Rename"] = "rename";
    BrowserToolKeysCommands["RenameNX"] = "renamenx";
    BrowserToolKeysCommands["MemoryUsage"] = "memory usage";
})(BrowserToolKeysCommands = exports.BrowserToolKeysCommands || (exports.BrowserToolKeysCommands = {}));
var BrowserToolStringCommands;
(function (BrowserToolStringCommands) {
    BrowserToolStringCommands["Set"] = "set";
    BrowserToolStringCommands["Get"] = "get";
    BrowserToolStringCommands["Getrange"] = "getrange";
    BrowserToolStringCommands["StrLen"] = "strlen";
})(BrowserToolStringCommands = exports.BrowserToolStringCommands || (exports.BrowserToolStringCommands = {}));
var BrowserToolHashCommands;
(function (BrowserToolHashCommands) {
    BrowserToolHashCommands["HSet"] = "hset";
    BrowserToolHashCommands["HGet"] = "hget";
    BrowserToolHashCommands["HLen"] = "hlen";
    BrowserToolHashCommands["HScan"] = "hscan";
    BrowserToolHashCommands["HDel"] = "hdel";
})(BrowserToolHashCommands = exports.BrowserToolHashCommands || (exports.BrowserToolHashCommands = {}));
var BrowserToolListCommands;
(function (BrowserToolListCommands) {
    BrowserToolListCommands["LLen"] = "llen";
    BrowserToolListCommands["Lrange"] = "lrange";
    BrowserToolListCommands["LSet"] = "lset";
    BrowserToolListCommands["LPush"] = "lpush";
    BrowserToolListCommands["LPop"] = "lpop";
    BrowserToolListCommands["RPush"] = "rpush";
    BrowserToolListCommands["RPushX"] = "rpushx";
    BrowserToolListCommands["LPushX"] = "lpushx";
    BrowserToolListCommands["RPop"] = "rpop";
    BrowserToolListCommands["LIndex"] = "lindex";
})(BrowserToolListCommands = exports.BrowserToolListCommands || (exports.BrowserToolListCommands = {}));
var BrowserToolSetCommands;
(function (BrowserToolSetCommands) {
    BrowserToolSetCommands["SScan"] = "sscan";
    BrowserToolSetCommands["SAdd"] = "sadd";
    BrowserToolSetCommands["SCard"] = "scard";
    BrowserToolSetCommands["SRem"] = "srem";
    BrowserToolSetCommands["SIsMember"] = "sismember";
})(BrowserToolSetCommands = exports.BrowserToolSetCommands || (exports.BrowserToolSetCommands = {}));
var BrowserToolZSetCommands;
(function (BrowserToolZSetCommands) {
    BrowserToolZSetCommands["ZCard"] = "zcard";
    BrowserToolZSetCommands["ZScan"] = "zscan";
    BrowserToolZSetCommands["ZRange"] = "zrange";
    BrowserToolZSetCommands["ZRevRange"] = "zrevrange";
    BrowserToolZSetCommands["ZAdd"] = "zadd";
    BrowserToolZSetCommands["ZRem"] = "zrem";
    BrowserToolZSetCommands["ZScore"] = "zscore";
})(BrowserToolZSetCommands = exports.BrowserToolZSetCommands || (exports.BrowserToolZSetCommands = {}));
var BrowserToolRejsonRlCommands;
(function (BrowserToolRejsonRlCommands) {
    BrowserToolRejsonRlCommands["JsonDel"] = "json.del";
    BrowserToolRejsonRlCommands["JsonSet"] = "json.set";
    BrowserToolRejsonRlCommands["JsonGet"] = "json.get";
    BrowserToolRejsonRlCommands["JsonType"] = "json.type";
    BrowserToolRejsonRlCommands["JsonObjKeys"] = "json.objkeys";
    BrowserToolRejsonRlCommands["JsonObjLen"] = "json.objlen";
    BrowserToolRejsonRlCommands["JsonArrLen"] = "json.arrlen";
    BrowserToolRejsonRlCommands["JsonStrLen"] = "json.strlen";
    BrowserToolRejsonRlCommands["JsonArrAppend"] = "json.arrappend";
    BrowserToolRejsonRlCommands["JsonDebug"] = "json.debug";
})(BrowserToolRejsonRlCommands = exports.BrowserToolRejsonRlCommands || (exports.BrowserToolRejsonRlCommands = {}));
var BrowserToolGraphCommands;
(function (BrowserToolGraphCommands) {
    BrowserToolGraphCommands["GraphQuery"] = "graph.query";
})(BrowserToolGraphCommands = exports.BrowserToolGraphCommands || (exports.BrowserToolGraphCommands = {}));
var BrowserToolStreamCommands;
(function (BrowserToolStreamCommands) {
    BrowserToolStreamCommands["XLen"] = "xlen";
    BrowserToolStreamCommands["XInfoStream"] = "xinfo stream";
    BrowserToolStreamCommands["XRange"] = "xrange";
    BrowserToolStreamCommands["XRevRange"] = "xrevrange";
    BrowserToolStreamCommands["XAdd"] = "xadd";
    BrowserToolStreamCommands["XDel"] = "xdel";
    BrowserToolStreamCommands["XInfoGroups"] = "xinfo groups";
    BrowserToolStreamCommands["XInfoConsumers"] = "xinfo consumers";
    BrowserToolStreamCommands["XPending"] = "xpending";
    BrowserToolStreamCommands["XAck"] = "xack";
    BrowserToolStreamCommands["XClaim"] = "xclaim";
    BrowserToolStreamCommands["XGroupCreate"] = "xgroup create";
    BrowserToolStreamCommands["XGroupSetId"] = "xgroup setid";
    BrowserToolStreamCommands["XGroupDestroy"] = "xgroup destroy";
    BrowserToolStreamCommands["XGroupDelConsumer"] = "xgroup delconsumer";
})(BrowserToolStreamCommands = exports.BrowserToolStreamCommands || (exports.BrowserToolStreamCommands = {}));
var BrowserToolTSCommands;
(function (BrowserToolTSCommands) {
    BrowserToolTSCommands["TSInfo"] = "ts.info";
})(BrowserToolTSCommands = exports.BrowserToolTSCommands || (exports.BrowserToolTSCommands = {}));
