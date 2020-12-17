"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionType = void 0;
const objectType_1 = require("./objectType");
function subscriptionType(config) {
    return objectType_1.objectType(Object.assign({ name: 'Subscription' }, config));
}
exports.subscriptionType = subscriptionType;
//# sourceMappingURL=subscriptionType.js.map