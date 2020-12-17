"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeName = void 0;
function getTypeName(type) {
    if (typeof type === 'string') {
        return type;
    }
    return type.name;
}
exports.getTypeName = getTypeName;
//# sourceMappingURL=helpers.js.map