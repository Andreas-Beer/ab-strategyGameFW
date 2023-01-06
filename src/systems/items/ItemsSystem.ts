import Router from '@koa/router';
import Application from 'koa';

import { itemRouter } from './items.routes';

export class ItemsSystem {
  get routes(): Router<Application.DefaultState, Application.DefaultContext> {
    return itemRouter;
  }
}
