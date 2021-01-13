"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = exports.prisma = void 0;
const client_1 = require("@prisma/client");
exports.prisma = new client_1.PrismaClient();
exports.createContext = () => ({
    prisma: exports.prisma,
});
//# sourceMappingURL=context.js.map