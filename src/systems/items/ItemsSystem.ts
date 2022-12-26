import Router from '@koa/router';
import Application from 'koa';

import { BaseSystem, withKoaRouter } from '../base';
import { itemRouter } from './items.routes';

export class ItemsSystem extends BaseSystem implements withKoaRouter {
  get routes(): Router<Application.DefaultState, Application.DefaultContext> {
    return itemRouter;
  }
}
