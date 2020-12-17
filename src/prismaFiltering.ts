import { Message } from '@prisma/client'
import { createContext } from './context'

const context = createContext()

type MessageSelect = {
    id?: boolean
    title?: boolean
    content?: boolean
}

type MessageInclude = {
    submitter?: boolean | PersonArgs
}

type PersonArgs = {
    select?: PersonSelect | null
    include?: PersonInclude | null
}

type PersonSelect = {
    id?: boolean
    name?: boolean
    email?: boolean
}

type PersonInclude = {
    message_submitter?: boolean | FindManyMessageSubmittedArgs
}

type FindManyMessageSubmittedArgs = {
    select?: MessageSelect | null
    include?: MessageInclude | null
}

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
    /*
    const messageByChunk = await context.prisma.chunk.findMany({
       where: { discovery: { project: { id: 1 } } },
       select: {
           message: true
       }
    })
    */

   const submitters = await context.prisma.chunk.findMany({
    where: { discovery: { project: { id: 1 } } },
    select: {
        message: {
            include: { person_Message_submitterIdToPerson: true }
        }
    }
 })

    console.log(submitters)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await context.prisma.$disconnect()
    })