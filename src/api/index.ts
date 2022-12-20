import Koa, { HttpError } from 'koa';
import Router from '@koa/router';
import { Config, ConfigNotFoundError } from '../classes/Config';
import { getConfig } from '../data/configData';

const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = 'I AM ROOOOT';
});

router.get('/config', (ctx, next) => {
  const config = getConfig();
  ctx.body = config;
});

router.get('/config/buildings', (ctx, next) => {
  const config = getConfig();
  ctx.body = config.buildings.buildings;
});
router.get('/config/buildings/:id', (ctx, next) => {
  const config = new Config();
  const { id } = ctx.params;

  try {
    ctx.body = config.findBuildingConfigByTypeId(Number(id));
  } catch (err) {
    if (err instanceof ConfigNotFoundError) {
      ctx.status = 404;
      ctx.body = err.message;
    } else {
      ctx.body = err;
    }
  }
});

router.get('/config/items', (ctx, next) => {
  const config = getConfig();
  ctx.body = config.items;
});
router.get('/config/items/:id', (ctx, next) => {
  const config = new Config();
  const { id } = ctx.params;
  ctx.body = config.findItemConfigByTypeId(Number(id));
});

function createApi() {
  const app = new Koa();
  app.use(router.routes()).use(router.allowedMethods());
  app.listen(3000);
}

export { createApi };
