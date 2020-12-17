"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = exports.keys = exports.isEmptyObject = exports.getImportPathRelativeToOutput = exports.trimIfInNodeModules = exports.assertPrismaClientInContext = exports.flatMap = exports.lowerFirst = exports.upperFirst = exports.indexBy = exports.hardWriteFileSync = exports.hardWriteFile = exports.dumpToFile = exports.dump = void 0;
const fs_1 = require("fs");
const fs = __importStar(require("fs-jetpack"));
const path = __importStar(require("path"));
const util_1 = require("util");
function dump(x, name) {
    const fence = (name !== null && name !== void 0 ? name : '') + '---------------------------------------------------------';
    console.error(fence + '\n' + util_1.inspect(x, { depth: 20 }) + '\n' + fence);
}
exports.dump = dump;
/**
 * Dump JSONified representation of the data to a debug.json file (or named to what you give as the second parameter).
 */
function dumpToFile(x, name) {
    fs_1.writeFileSync(`debug${name ? '-' + name : ''}.json`, JSON.stringify(x, null, 2));
}
exports.dumpToFile = dumpToFile;
/**
 * Write file contents but first delete the file off disk if present. This is a
 * useful function when the effect of file delete is needed to trigger some file
 * watch/refresh mechanism, such as is the case with VSCode TS declaration files
 * inside `@types/` packages.
 *
 * For more details that motivated this utility refer to the originating issue
 * https://github.com/graphql-nexus/nexus-plugin-prisma/issues/453.
 */
const hardWriteFile = (filePath, data) => fs
    .removeAsync(filePath)
    .catch((error) => {
    return error.code === 'ENOENT' ? Promise.resolve() : Promise.reject(error);
})
    .then(() => fs.writeAsync(filePath, data));
exports.hardWriteFile = hardWriteFile;
/**
 * Write file contents but first delete the file off disk if present. This is a
 * useful function when the effect of file delete is needed to trigger some file
 * watch/refresh mechanism, such as is the case with VSCode TS declaration files
 * inside `@types/` packages.
 *
 * For more details that motivated this utility refer to the originating issue
 * https://github.com/graphql-nexus/nexus-plugin-prisma/issues/453.
 */
const hardWriteFileSync = (filePath, data) => {
    try {
        fs.remove(filePath);
    }
    catch (error) {
        if (error.code !== 'ENOENT')
            throw error;
    }
    fs.write(filePath, data);
};
exports.hardWriteFileSync = hardWriteFileSync;
// TODO `any` should be `unknown` but there is a bug (?)
// preventing that from working, see:
// https://github.com/microsoft/TypeScript/issues/33521
// https://stackoverflow.com/questions/58030413/calculate-union-type-of-key-names-in-object-whose-values-are-indexable
/**
 * TODO
 */
const indexBy = (xs, indexer) => {
    const seed = {};
    if (typeof indexer === 'function') {
        return xs.reduce((index, x) => {
            const address = indexer(x);
            index[address] = x;
            return index;
        }, seed);
    }
    else {
        return xs.reduce((index, x) => {
            const address = x[indexer];
            index[address] = x;
            return index;
        }, seed);
    }
};
exports.indexBy = indexBy;
const upperFirst = (s) => {
    return s.replace(/^\w/, (c) => c.toUpperCase());
};
exports.upperFirst = upperFirst;
function lowerFirst(s) {
    if (s.length === 0)
        return s;
    return s[0].toLowerCase() + s.slice(1);
}
exports.lowerFirst = lowerFirst;
function flatMap(array, callbackfn) {
    return Array.prototype.concat(...array.map(callbackfn));
}
exports.flatMap = flatMap;
function assertPrismaClientInContext(prismaClient) {
    if (!prismaClient) {
        throw new Error('Could not find Prisma Client JS in context (ctx.prisma)');
    }
}
exports.assertPrismaClientInContext = assertPrismaClientInContext;
function trimIfInNodeModules(path) {
    if (path.includes('node_modules')) {
        return path.substring(path.lastIndexOf('node_modules') + 'node_modules'.length + 1);
    }
    return path;
}
exports.trimIfInNodeModules = trimIfInNodeModules;
function getImportPathRelativeToOutput(from, to) {
    if (to.includes('node_modules')) {
        return trimIfInNodeModules(to);
    }
    let relativePath = path.relative(from, to);
    if (!relativePath.startsWith('.')) {
        relativePath = './' + relativePath;
    }
    // remove .ts or .js file extension
    relativePath = relativePath.replace(/\.(ts|js)$/, '');
    // remove /index
    relativePath = relativePath.replace(/\/index$/, '');
    // replace \ with /
    relativePath = relativePath.replace(/\\/g, '/');
    return relativePath;
}
exports.getImportPathRelativeToOutput = getImportPathRelativeToOutput;
const isEmptyObject = (o) => util_1.isDeepStrictEqual(o, {});
exports.isEmptyObject = isEmptyObject;
function keys(a) {
    return Object.keys(a);
}
exports.keys = keys;
function apply(val, fn) {
    return fn(val);
}
exports.apply = apply;
//# sourceMappingURL=utils.js.map