import Router from '@koa/router';
import { getConfigData } from '../../data/configData/configData';

const buildingsRouter = new Router();

buildingsRouter.get('/buildings', async (ctx, next) => {
  const config = await getConfigData();
  ctx.body = config.configData.buildings;
});

export { buildingsRouter };
