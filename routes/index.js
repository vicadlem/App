import { Router } from 'express';

import graphQL from '@routes/graphql';

export default () => {
  const app = Router();

  graphQL(app);

  return app
}