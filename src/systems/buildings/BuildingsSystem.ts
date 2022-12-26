import Router from '@koa/router';
import Application from 'koa';

import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { BaseSystem, withKoaRouter } from '../base';
import { ResourcesSystem } from '../resources';
import { buildingsRouter } from './buildings.routes';

export class BuildingsSystem extends BaseSystem implements withKoaRouter {
  constructor(
    configData: ConfigDataFacade,
    private resourcesSystem: ResourcesSystem,
  ) {
    super(configData);
  }
  get routes(): Router<Application.DefaultState, Application.DefaultContext> {
    return buildingsRouter;
  }
}
