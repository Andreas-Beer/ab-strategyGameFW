import { ConfigData } from '../../data/configData/config.types';
import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerData } from '../../data/playerData/playerData.types';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { ResourcesSystem } from '../resources';
import { BuildingConfig } from './building.types';
import { BuildingsSystem } from './BuildingsSystem';

const buildingConfig1: BuildingConfig = {
  typeId: 1,
  levels: {
    1: {
      duration: '1min',
      price: [{ resourceId: 1, amount: 10 }],
      requirements: [{ type: 'playerLevel', level: 1 }],
      effects: [
        { type: 'modify/resource/2', amount: 10 },
        { type: 'modify/capacity/2', amount: 100 },
      ],
    },
  },
};

const configData: ConfigData = {
  buildings: { buildingsBuildParallel: 1, buildings: [buildingConfig1] },
} as ConfigData;

describe('system/buildings.test', () => {
  describe('build', () => {
    it.skip('should add a building with a unique id to the playerData into the correct town.', () => {
      // const playerData: PlayerData = {
      //   towns: [{ id: 1, resources: { 1: 200 }, buildings: [] }],
      // } satisfies PlayerData;
      // const configDataFacade = new ConfigDataFacade(configData);
      // const playerDataFacade = new PlayerDataFacade({});
      // const resourceSystem = new ResourcesSystem(
      //   configDataFacade,
      //   playerDataFacade,
      // );
      // const buildingsSystem = new BuildingsSystem(
      //   configDataFacade,
      //   playerDataFacade,
      //   resourceSystem,
      // );
      // buildingsSystem.build({
      //   buildingTypeId: buildingConfig1.typeId,
      //   townId: 1,
      //   position: 1,
      // });
    });
    it.skip('should add a building finish task into the global task queue.', () => {});
    it.skip('should remove the necessary resources from the playerData.', () => {});
    it.skip('should throw an error if there is not enough resource to build the building.', () => {});
    it.skip('should throw an error if the requirement does not fit.', () => {});
  });

  describe('upgrade', () => {
    it.skip('should upgrade a building to the next level.', () => {});
    it.skip('should throw an error if the highest level has reached.', () => {});
    it.skip('should throw an error if the requirement does not fit.', () => {});
  });

  describe('downgrade', () => {
    it.skip('should downgrade a building to the previous level.', () => {});
    it.skip('should delete the building from the player data if the level was the lowest.', () => {});
  });

  describe('destroy', () => {
    it.skip('should delete the building from the player data.', () => {});
  });
});
