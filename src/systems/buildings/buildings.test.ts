import { expect } from 'chai';
import Sinon from 'sinon';
import { TaskQueue } from '../../classes/TaskQueue';
import { ConfigData } from '../../data/configData/config.types';
import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerData, TownData } from '../../data/playerData/playerData.types';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import { BuildingConfigData } from './buildings.types';
import { BuildingsSystem } from './BuildingsSystem';

const buildingConfig1: BuildingConfigData = {
  typeId: 1,
  levels: {
    1: {
      duration: '1ms',
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

describe('systems/buildings.test', () => {
  describe('build', () => {
    let buildingsSystem: BuildingsSystem;
    let taskQueue: TaskQueue;
    let townData: TownData;

    beforeEach(() => {
      townData = {
        name: '',
        units: [],
        location: [0, 0],
        effects: [],
        id: 1,
        resources: { 1: { amount: 200 } },
        buildings: [],
      };
      const configDataFacade = new ConfigDataFacade(configData);

      const playerDataFacade = new PlayerDataFacade({
        level: 1,
        towns: [townData],
      } as PlayerData);

      const resourceSystem = new ResourcesSystem(playerDataFacade);

      const requirementsSystem = new RequirementsSystem(playerDataFacade);
      taskQueue = new TaskQueue();

      buildingsSystem = new BuildingsSystem(
        configDataFacade,
        playerDataFacade,
        resourceSystem,
        requirementsSystem,
        Sinon.spy(taskQueue),
      );
    });

    afterEach(() => {
      Sinon.reset();
    });

    it('should add a building with a unique id to the playerData into the correct town.', () => {
      buildingsSystem.build(buildingConfig1.typeId, 1, 1);
    });
    it('should add a building finish task into the global task queue.', () => {
      const newBuilding = buildingsSystem.build(buildingConfig1.typeId, 1, 1);
      expect(taskQueue._queue).to.have.a.lengthOf(1);
      expect(newBuilding).to.be.not.undefined;
      expect(newBuilding.constructionProgress).to.be.eq(0);

      taskQueue.callExpiredTasks(Date.now() + 2000);
      expect(taskQueue._queue).to.have.a.lengthOf(0);

      setTimeout(() => {
        expect(newBuilding.constructionProgress).to.be.eq(100);
      }, 0);
    });
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
