"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickDefinedAgreements = void 0;
const lodash_1 = require("lodash");
const AGREEMENTS_SPEC = require("../constants/agreements-spec.json");
const pickDefinedAgreements = (data) => {
    if ((0, lodash_1.isMap)(data)) {
        for (const k of data === null || data === void 0 ? void 0 : data.keys()) {
            if (!AGREEMENTS_SPEC.agreements[k]) {
                data.delete(k);
            }
        }
    }
    return data;
};
exports.pickDefinedAgreements = pickDefinedAgreements;
