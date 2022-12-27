import Router from '@koa/router';

const buildingsRoutes = new Router();

buildingsRoutes.get('/buildings', async (ctx, next) => {});

export { buildingsRoutes };
