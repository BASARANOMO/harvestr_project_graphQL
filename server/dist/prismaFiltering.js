"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const context = context_1.createContext();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        /*
          const project = await context.prisma.project.findUnique({
              where: {
                  id: 1
              }
          })
          */
        /*
          const discoveries: Discovery[] = await context.prisma.project.findUnique({
              where: {
                  id: 1
              }
          }).discoverys()
          */
        /*
         const discoveries = await context.prisma.discovery.findMany({
             where: { project: { id: 1 } }
          })
          */
        /*
          const chunks = await context.prisma.chunk.findMany({
              where: { discovery: { project: { id: 1 } } }
          })
          */
        /*
          const messageByChunk = await context.prisma.chunk.findMany({
             where: { discovery: { project: { id: 1 } } },
             select: {
                 message: true
             }
          })
          */
        const submitters = yield context.prisma.chunk.findMany({
            where: { discovery: { project: { id: 1 } } },
            select: {
                message: {
                    include: { person_Message_submitterIdToPerson: true },
                },
            },
        });
        console.log(submitters);
    });
}
main()
    .catch((e) => {
    throw e;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield context.prisma.$disconnect();
}));
//# sourceMappingURL=prismaFiltering.js.map