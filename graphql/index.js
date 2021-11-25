import { makeExecutableSchema } from '@graphql-tools/schema'

// SCHEMAS
import typeDefs from './schema'
// RESOLVERS
import resolvers from './resolvers'

const globalSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

export default globalSchema
