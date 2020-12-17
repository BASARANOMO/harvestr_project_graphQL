import { Message } from '@prisma/client'
import { createContext } from './context'

const context = createContext()

async function main() {
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
   // bug to fix
   const chunks = await context.prisma.chunk.findMany({
       where: { discovery: { project: { id: 1 } } }
    }).message()

    console.log(chunks)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await context.prisma.$disconnect()
    })