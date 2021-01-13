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
const NB_PROJECTS = 3;
const NB_ACCOUNTS = 10500;
const NB_MESSAGES = 51000;
const NB_DISCOVERIES = 30000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 1; i <= NB_PROJECTS; i++) {
            const project = yield context_1.prisma.project.create({
                data: {
                    name: 'Project ' + i,
                },
            });
            for (let j = 1; j <= NB_ACCOUNTS / NB_PROJECTS; j++) {
                var k = ((i - 1) * NB_ACCOUNTS) / NB_PROJECTS + j;
                const account = yield context_1.prisma.account.create({
                    data: {
                        username: 'Username ' + k,
                        hashedPassword: 'pw ' + k,
                        project: {
                            connect: { id: i },
                        },
                        person: {
                            create: {
                                name: 'Name ' + k,
                                email: 'email ' + k,
                                organization: {
                                    create: {
                                        name: 'Organization ' + k,
                                        project: {
                                            connect: { id: i },
                                        },
                                    },
                                },
                                project: {
                                    connect: { id: i },
                                },
                            },
                        },
                    },
                });
                const contributorAttribute = yield context_1.prisma.contributorAttribute.create({
                    data: {
                        name: 'Contributor attribute ' + k,
                        type: 'TEXT',
                        project: {
                            connect: { id: i },
                        },
                    },
                });
                const contributorAttributeValue = yield context_1.prisma.contributorAttributeValue.create({
                    data: {
                        //valuetext: 'Value text ' + 1,
                        person: {
                            connect: { id: k },
                        },
                        organization: {
                            connect: { id: k },
                        },
                        contributorAttribute: {
                            connect: { id_type: { id: k, type: 'TEXT' } },
                        },
                    },
                });
            }
            for (let m = 1; m <= NB_MESSAGES / NB_PROJECTS; m++) {
                var k = ((i - 1) * NB_MESSAGES) / NB_PROJECTS + m;
                var p = Math.floor(Math.random() * (NB_ACCOUNTS / NB_PROJECTS - 1) +
                    ((i - 1) * NB_ACCOUNTS) / NB_PROJECTS);
                console.log(p);
                const message = yield context_1.prisma.message.create({
                    data: {
                        content: 'Message ' + k,
                        project: {
                            connect: { id: i },
                        },
                        person_Message_requesterIdToPerson: {
                            connect: { id: p + 1 },
                        },
                        person_Message_submitterIdToPerson: {
                            connect: { id: p + 2 },
                        },
                    },
                });
            }
            for (let n = 1; n <= NB_DISCOVERIES / NB_PROJECTS; n++) {
                var k = ((i - 1) * NB_DISCOVERIES) / NB_PROJECTS + n;
                var p = Math.floor(Math.random() * (NB_MESSAGES / NB_PROJECTS - 1) +
                    ((i - 1) * NB_MESSAGES) / NB_PROJECTS);
                console.log(p);
                const discovery = yield context_1.prisma.discovery.create({
                    data: {
                        title: 'Discovery ' + k,
                        project: {
                            connect: { id: i },
                        },
                        chunks: {
                            create: {
                                message: {
                                    connect: { id: p + 1 },
                                },
                                project: {
                                    connect: { id: i },
                                },
                            },
                        },
                    },
                });
            }
        }
    });
}
main()
    .catch((e) => {
    throw e;
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield context_1.prisma.$disconnect();
}));
//# sourceMappingURL=script.js.map