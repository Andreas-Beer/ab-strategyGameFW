import { expect } from 'chai';
import Sinon from 'sinon';
import { TaskQueue } from '../../classes/TaskQueue';
import { ConfigData } from '../../data/configData/config.types';
import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerData, TownData } from '../../data/playerData/playerData.types';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import {
  BuildingNotEnoughResourcesError,
  BuildingParallelCapacityNotFree,
} from './buildings.errors';
import { BuildingConfigData } from './buildings.types';
import { BuildingsSystem } from './BuildingsSystem';

const getData = (playerDataFacade: PlayerDataFacade) =>
  playerDataFacade._playerData;

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

const buildingConfig2: BuildingConfigData = {
  typeId: 2,
  levels: {
    1: {
      duration: '1ms',
      price: [{ resourceId: 1, amount: 9999999999999 }],
      requirements: [{ type: 'playerLevel', level: 1 }],
      effects: [
        { type: 'modify/resource/2', amount: 10 },
        { type: 'modify/capacity/2', amount: 100 },
      ],
    },
  },
};

const configData: ConfigData = {
  buildings: {
    buildingsBuildParallel: 1,
    buildings: [buildingConfig1, buildingConfig2],
  },
} as ConfigData;

describe('systems/buildings.test', () => {
  describe('build', () => {
    let buildingsSystem: BuildingsSystem;
    let playerDataFacade: PlayerDataFacade;
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
        buildParallelCapacity: 1,
        buildingSlots: [
          { position: 1, allowedBuildingTypes: [1, 2] },
          { position: 2, allowedBuildingTypes: [1, 2] },
        ],
      };
      const configDataFacade = new ConfigDataFacade(configData);

      playerDataFacade = new PlayerDataFacade({
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
      const buildingTypeId = buildingConfig1.typeId;
      const buildingPosition = 1;
      const townId = 1;

      const newBuilding = buildingsSystem.build(
        buildingTypeId,
        buildingPosition,
        townId,
      );

      expect(getData(playerDataFacade).towns[0].buildings).to.have.a.lengthOf(
        1,
      );
      expect(getData(playerDataFacade).towns[0].buildings[0]).to.be.equal(
        newBuilding,
      );
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
    it('should throw an error if the max building parallel', () => {
      buildingsSystem.build(1, 2, 1);

      const buildingTypeId = buildingConfig1.typeId;
      const buildingPosition = 1;
      const townId = 1;

      const fn = () =>
        buildingsSystem.build(buildingTypeId, buildingPosition, townId);

      expect(fn).to.throw(BuildingParallelCapacityNotFree);
    });
    it('should remove the necessary resources from the playerData.', () => {
      const buildingConfig = buildingConfig1;
      const buildingTypeId = buildingConfig.typeId;
      const buildingPosition = 1;
      const townId = 1;

      const buildingPriceLvl1 = buildingConfig.levels[1].price[0];
      const resourceAmount = buildingPriceLvl1.amount;
      const resourceId = buildingPriceLvl1.resourceId;

      const resourceAmountBefore =
        playerDataFacade._playerData.towns[0].resources[resourceId].amount;
      const resourceAmountExpected = resourceAmountBefore - resourceAmount;

      buildingsSystem.build(buildingTypeId, buildingPosition, townId);

      const resourceAmountAfter =
        playerDataFacade._playerData.towns[0].resources[resourceId].amount;

      expect(resourceAmountAfter).to.be.equal(resourceAmountExpected);
    });
    it('should throw an error if there is not enough resource to build the building.', () => {
      const buildingConfig = buildingConfig2;
      const buildingTypeId = buildingConfig.typeId;
      const buildingPosition = 1;
      const townId = 1;

      const buildingPriceLvl1 = buildingConfig.levels[1].price[0];
      const resourceId = buildingPriceLvl1.resourceId;

      const fn = () =>
        buildingsSystem.build(buildingTypeId, buildingPosition, townId);

      const resourceAmountBefore =
        playerDataFacade._playerData.towns[0].resources[resourceId].amount;

      expect(fn).to.throw(BuildingNotEnoughResourcesError);

      const resourceAmountAfter =
        playerDataFacade._playerData.towns[0].resources[resourceId].amount;

      expect(resourceAmountAfter).to.be.equal(resourceAmountBefore);
    });
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
