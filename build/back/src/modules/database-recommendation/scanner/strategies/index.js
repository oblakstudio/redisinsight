"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./abstract.recommendation.strategy"), exports);
__exportStar(require("./default.recommendation.strategy"), exports);
__exportStar(require("./redis-version.strategy"), exports);
__exportStar(require("./search-JSON.strategy"), exports);
__exportStar(require("./big-set.strategy"), exports);
__exportStar(require("./rts.strategy"), exports);
__exportStar(require("./avoid-logical-databases.strategy"), exports);
__exportStar(require("./shard-hash.strategy"), exports);
__exportStar(require("./string-to-json.strategy"), exports);
__exportStar(require("./search-visualization.strategy"), exports);
__exportStar(require("./use-smaller-keys.strategy"), exports);
__exportStar(require("./avoid-lua-scripts.strategy"), exports);
__exportStar(require("./big-string.strategy"), exports);
__exportStar(require("./compression-for-list.strategy"), exports);
__exportStar(require("./big-amount-connected-clients.strategy"), exports);
__exportStar(require("./functions-with-streams.strategy"), exports);
__exportStar(require("./lua-to-functions.strategy"), exports);
__exportStar(require("./functions-with-keyspace.strategy"), exports);
