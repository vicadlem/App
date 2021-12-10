import { Router } from 'express';
import { graphqlHTTP } from 'express-graphql';

/** SCHEMA AND RESOLVERS */
import globalSchema from '@graphql'

const route = Router();

export default (app) => {
  app.use('/graphql', route)

  // set routes and set middlewares, if u need user logged
  route.use(
    graphqlHTTP({
      schema: globalSchema,
      graphiql: true,
    })
  )
}