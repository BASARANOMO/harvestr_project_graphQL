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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = require("./colors");
const semver = __importStar(require("semver"));
const pkgJson = require('../package.json');
function ensureDepIsInstalled(depName) {
    try {
        require(depName);
    }
    catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            console.error(`${colors_1.colors.red('ERROR:')} ${colors_1.colors.green(depName)} must be installed as a dependency. Please run \`${colors_1.colors.green(`npm install ${depName}`)}\`.`);
            process.exit(1);
        }
        else {
            throw err;
        }
    }
}
function ensurePeerDepRangeSatisfied(depName) {
    try {
        const installedVersion = require(`${depName}/package.json`).version;
        // npm enforces that package manifests have a valid "version" field so this case _should_ never happen under normal circumstances.
        if (!installedVersion) {
            console.warn(colors_1.colors.yellow(`Warning: No version found for "${depName}". We cannot check if the consumer has satisfied the specified range.`));
            return;
        }
        const supportedRange = pkgJson.peerDependencies[depName];
        if (!supportedRange) {
            console.warn(colors_1.colors.yellow(`Warning: nexus-plugin-prisma has no such peer dependency for "${depName}". We cannot check if the consumer has satisfied the specified range.`));
            return;
        }
        if (semver.satisfies(installedVersion, supportedRange)) {
            return;
        }
        console.warn(colors_1.colors.yellow(`Warning: nexus-plugin-prisma@${pkgJson.version} does not support ${depName}@${installedVersion}. The supported range is: \`${supportedRange}\`. This could lead to undefined behaviors and bugs.`));
    }
    catch (_a) { }
}
ensureDepIsInstalled('@nexus/schema');
ensureDepIsInstalled('graphql');
ensureDepIsInstalled('@prisma/client');
// TODO: Bring back peer dep range check for @nexus/schema and graphql once we have proper ranges
// TODO: They're currently way too conservative
//ensurePeerDepRangeSatisfied('graphql')
ensurePeerDepRangeSatisfied('@nexus/schema');
ensurePeerDepRangeSatisfied('@prisma/client');
__exportStar(require("./plugin"), exports);
//# sourceMappingURL=index.js.map