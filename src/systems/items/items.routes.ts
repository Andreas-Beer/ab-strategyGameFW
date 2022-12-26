import Router from '@koa/router';
import { getConfigData } from '../../data/configData/configData';

const itemRouter = new Router();

itemRouter.get('/items', async (ctx, next) => {
  const config = await getConfigData();
  ctx.body = config.configData.items;
});

export { itemRouter };
