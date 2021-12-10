import express from 'express';
import cors from 'cors';
import routes from '@routes';
import config from '@config';

export default async ({ app }) => {

  // Useful if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
  // It shows the real origin IP in the heroku or Cloudwatch logs
  app.enable('trust proxy');
  
  // The magic package that prevents frontend developers going nuts
  // Alternate description:
  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(express.json())
  // Load API routes
  app.use(config.api.prefix, routes());

  /// catch 404 and forward to error handler
  app.use('*', (_req, _res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });
}