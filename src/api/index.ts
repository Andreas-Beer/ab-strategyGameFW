import Koa from 'koa';
import Application from 'koa';
import Router from '@koa/router';

function createApi(
  routesList: Router<Application.DefaultState, Application.DefaultContext>[],
) {
  const app = new Koa();

  for (const route of routesList) {
    app.use(route.routes()).use(route.allowedMethods());
  }

  app.listen(3000);
}

export { createApi };
