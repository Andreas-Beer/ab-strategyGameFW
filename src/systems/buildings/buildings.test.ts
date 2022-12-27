import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { ResourcesSystem } from '../resources';
import { BuildingsSystem } from './BuildingsSystem';

describe('system/buildings.test', () => {
  describe('build', () => {
    it.skip('should add a building to the playerData.', () => {
      const configDataFacade = new ConfigDataFacade({});
      const playerDataFacade = new PlayerDataFacade({});
      const resourceSystem = new ResourcesSystem(
        configDataFacade,
        playerDataFacade,
      );

      const buildingsSystem = new BuildingsSystem(
        configDataFacade,
        playerDataFacade,
        resourceSystem,
      );

      buildingsSystem.build();
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
