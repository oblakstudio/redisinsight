"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRedisGlob = exports.isEscaped = exports.unescapeRedisGlob = exports.unescapeGlob = void 0;
const GLOB_SPEC_CHAR = ['!', '*', '?', '[', ']', '(', ')', '{', '}'];
const EXT_GLOB_SPEC_CHAR = ['@', '+'];
const unescapeGlob = (value) => {
    let result = value;
    [...GLOB_SPEC_CHAR, ...EXT_GLOB_SPEC_CHAR].forEach((char) => {
        const regex = new RegExp('\\'.repeat(3) + char, 'g');
        result = result.replace(regex, char);
    });
    return result.replace(/\\{2}/g, '\\');
};
exports.unescapeGlob = unescapeGlob;
const REDIS_GLOB_SPEC_CHAR = ['?', '*', '[', ']'];
const unescapeRedisGlob = (value) => {
    let result = value;
    REDIS_GLOB_SPEC_CHAR.forEach((char) => {
        const regex = new RegExp('\\'.repeat(3) + char, 'g');
        result = result.replace(regex, char);
    });
    return result.replace(/\\{2}/g, '\\');
};
exports.unescapeRedisGlob = unescapeRedisGlob;
const isEscaped = (str, pos) => {
    let currPos = pos;
    while (currPos > 0 && str[currPos - 1] === '\\') {
        currPos -= 1;
    }
    const escCount = pos - currPos;
    return escCount && (escCount % 2) > 0;
};
exports.isEscaped = isEscaped;
const findUnescapedCharPosition = (char, str, startPosition = 0) => {
    let pos = str.indexOf(char, startPosition);
    while (pos >= 0) {
        if (!(0, exports.isEscaped)(str, pos)) {
            return pos;
        }
        pos = str.indexOf(char, pos + 1);
    }
    return pos;
};
const hasUnescapedChar = (char, str, startPosition = 0) => {
    if (char.length === 1) {
        return findUnescapedCharPosition(char, str, startPosition) >= 0;
    }
    if (char.length === 2) {
        const firstCharPos = findUnescapedCharPosition(char[0], str, startPosition);
        if (firstCharPos >= 0) {
            return findUnescapedCharPosition(char[1], str, firstCharPos) >= 0;
        }
    }
    return false;
};
const isRedisGlob = (str) => hasUnescapedChar('?', str)
    || hasUnescapedChar('*', str)
    || hasUnescapedChar('[]', str);
exports.isRedisGlob = isRedisGlob;
