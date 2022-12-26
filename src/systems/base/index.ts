import Router from '@koa/router';
import Application from 'koa';
import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';

export interface withKoaRouter {
  get routes(): Router<Application.DefaultState, Application.DefaultContext>;
}

export class BaseSystem {
  constructor(
    protected configData: ConfigDataFacade,
    protected playerData: PlayerDataFacade,
  ) {}
}
