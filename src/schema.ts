import { declarativeWrappingPlugin, makeSchema } from '@nexus/schema'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { createClassDeclaration } from 'typescript'
import * as typeDefs from './api/graphql'

export const schema = makeSchema({
  types: typeDefs,
  plugins: [
    nexusPrisma({ experimentalCRUD: true }),
    declarativeWrappingPlugin()
  ],
  outputs: {
    schema: __dirname + '../../generated/schema.graphql',
    typegen: __dirname + '../../node_modules/@types/nexus-typegen/index.d.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
