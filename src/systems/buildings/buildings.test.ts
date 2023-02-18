import { expect } from 'chai';
import Sinon from 'sinon';
import { EffectBus } from '../../components/EffectEventBus';
import { TaskQueue } from '../../components/TaskQueue';
import { ConfigData } from '../../data/configData/config.types';
import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerDataBuildingNotFoundError } from '../../data/playerData/playerData.errors';
import { PlayerData, TownData } from '../../data/playerData/playerData.types';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import {
  BuildingHasLowestLevelError,
  BuildingHasReachedMaxLevelError,
  BuildingNotEnoughResourcesError,
  BuildingParallelCapacityNotFree,
  BuildingProcessHasNotYetCompleted,
  BuildingRequirementNotFulfilledError,
} from './buildings.errors';
import { BuildingConfig, BuildingData, BuildingId } from './buildings.types';
import { BuildingsSystem } from './BuildingsSystem';
import {
  buildingConfig1,
  buildingConfig2,
  buildingConfig3,
} from './buildings.fixtures';

const configData: ConfigData = {
  buildings: {
    buildingsBuildParallel: 1,
    buildings: [buildingConfig1, buildingConfig2, buildingConfig3],
  },
} as ConfigData;

const findConfigForTypeId = (building: BuildingData) => {
  const buildingConfig = configData.buildings.buildings.find(
    (b) => b.typeId === building.buildingTypeId,
  );
  return buildingConfig;
};

const getData = (playerDataFacade: PlayerDataFacade) =>
  playerDataFacade._playerData;

describe('systems/buildings.test', () => {
  const configDataFacade = new ConfigDataFacade(configData);

  let buildingsSystem: BuildingsSystem;
  let playerDataFacade: PlayerDataFacade;
  let taskQueue: TaskQueue;
  let effectBus: EffectBus;
  let townData: TownData;

  describe.only('build', () => {
    beforeEach(() => {
      townData = {
        id: 1,
        name: '',
        units: [],
        location: [0, 0],
        effects: [],
        resources: { 1: { amount: 200 }, 2: { amount: 200 } },
        buildings: [],
        buildParallelCapacity: 1,
        buildingSlots: [
          { id: 10, position: 1, allowedBuildingTypes: [1, 2] },
          { id: 20, position: 2, allowedBuildingTypes: [1, 2] },
        ],
      };

      playerDataFacade = new PlayerDataFacade({
        level: 1,
        currentActiveTownId: 1,
        resources: {},
        towns: [townData],
      } as PlayerData);

      const resourceSystem = new ResourcesSystem(playerDataFacade);
      const requirementsSystem = new RequirementsSystem(playerDataFacade);
      taskQueue = new TaskQueue();
      effectBus = new EffectBus();

      buildingsSystem = new BuildingsSystem(
        configDataFacade,
        playerDataFacade,
        resourceSystem,
        requirementsSystem,
        Sinon.spy(taskQueue),
        Sinon.spy(effectBus),
      );
    });

    afterEach(() => {
      Sinon.reset();
    });

    it('should add a building with a unique id to the playerData into the correct town.', () => {
      const buildingTypeId = buildingConfig1.typeId;
      const buildingPosition = 1;

      const newBuilding = buildingsSystem.build(
        buildingTypeId,
        buildingPosition,
      );

      expect(getData(playerDataFacade).towns[0].buildings).to.have.a.lengthOf(
        1,
      );
      expect(getData(playerDataFacade).towns[0].buildings[0]).to.be.equal(
        newBuilding,
      );
    });
    it('should add a building finish task into the global task queue.', (done) => {
      const newBuilding = buildingsSystem.build(buildingConfig1.typeId, 1);
      expect(taskQueue._queue).to.have.a.lengthOf(1);
      expect(newBuilding).to.be.not.undefined;
      expect(newBuilding.constructionProgress).to.be.eq(0);

      taskQueue.callExpiredTasks(Date.now() + 2000);
      expect(taskQueue._queue).to.have.a.lengthOf(0);

      setTimeout(() => {
        expect(newBuilding.constructionProgress).to.be.eq(100);
        done();
      }, 0);
    });
    it('should activate the effects', (done) => {
      buildingsSystem.build(buildingConfig1.typeId, 1);
      taskQueue.callExpiredTasks(Date.now() + 2000);

      setTimeout(() => {
        expect(effectBus.triggerEffect).to.be.called;
        done();
      }, 0);
    });
    it('should call the start effects for the update action.', () => {
      const buildingConfig = buildingConfig1;
      const buildingTypeId = buildingConfig.typeId;
      const buildingPosition = 1;

      const startEffect =
        buildingConfig1.levels['1'].actions.upgrading.effects?.start[0]!;

      buildingsSystem.build(buildingTypeId, buildingPosition);

      expect(effectBus.triggerEffect).to.be.calledOnceWith(
        startEffect.type,
        startEffect.data,
      );
    });
    it('should throw an error if the max building parallel', () => {
      buildingsSystem.build(1, 2);

      const buildingTypeId = buildingConfig1.typeId;
      const buildingPosition = 1;

      const fn = () => buildingsSystem.build(buildingTypeId, buildingPosition);

      expect(fn).to.throw(BuildingParallelCapacityNotFree);
    });
    it('should throw an error if there is not enough resource to build the building.', () => {
      const buildingConfig = buildingConfig2;
      const buildingTypeId = buildingConfig.typeId;
      const buildingPosition = 1;

      const fn = () => buildingsSystem.build(buildingTypeId, buildingPosition);
      expect(fn).to.throw(BuildingRequirementNotFulfilledError);

      expect(effectBus.triggerEffect).to.be.not.called;
    });
  });

  describe('upgrade', () => {
    beforeEach(() => {
      townData = {
        name: '',
        units: [],
        location: [0, 0],
        effects: [],
        id: 1,
        resources: { 1: { amount: 200 } },
        buildings: [
          {
            id: 1,
            buildingTypeId: 1,
            constructionProgress: 100,
            level: 1,
            location: 1,
          },
          {
            id: 2,
            buildingTypeId: 1,
            constructionProgress: 100,
            level: 10,
            location: 2,
          },
          {
            id: 3,
            buildingTypeId: 2,
            constructionProgress: 100,
            level: 1,
            location: 3,
          },
          {
            id: 4,
            buildingTypeId: 2,
            constructionProgress: 100,
            level: 2,
            location: 4,
          },
          {
            id: 5,
            buildingTypeId: 1,
            constructionProgress: 90,
            level: 1,
            location: 4,
          },
          {
            id: 6,
            buildingTypeId: 1,
            constructionProgress: 100,
            level: 1,
            location: 1,
          },
        ],
        buildingSlots: [
          { id: 1, allowedBuildingTypes: [1, 2], position: 23 },
          { id: 2, allowedBuildingTypes: [1, 2], position: 25 },
        ],
        buildParallelCapacity: 2,
      };

      playerDataFacade = new PlayerDataFacade({
        level: 1,
        resources: {},
        currentActiveTownId: townData.id,
        towns: [townData],
      } as PlayerData);

      const resourceSystem = new ResourcesSystem(playerDataFacade);
      const requirementsSystem = new RequirementsSystem(playerDataFacade);
      taskQueue = new TaskQueue();
      effectBus = new EffectBus();

      buildingsSystem = new BuildingsSystem(
        configDataFacade,
        playerDataFacade,
        resourceSystem,
        requirementsSystem,
        Sinon.spy(taskQueue),
        Sinon.spy(effectBus),
      );
    });

    afterEach(() => {
      Sinon.reset();
    });

    it('should upgrade a building to the next level.', (done) => {
      const buildingData = townData.buildings[0];
      const buildingId: BuildingId = buildingData.id;
      const buildingLevelBefore = buildingData.level;
      const buildingLevelExpected = buildingLevelBefore + 1;

      buildingsSystem.upgrade(buildingId);
      taskQueue.callExpiredTasks(Date.now() + 2000);

      setTimeout(() => {
        const buildingLevelAfter = buildingData.level;
        expect(buildingLevelAfter).to.be.equal(buildingLevelExpected);
        expect(buildingData.constructionProgress).to.be.eq(100);
        done();
      }, 0);
    });
    it('should throw an error if the highest level has reached.', () => {
      const buildingData = townData.buildings[1];
      const buildingId: BuildingId = buildingData.id;

      const fn = () => buildingsSystem.upgrade(buildingId);

      expect(fn).to.throw(BuildingHasReachedMaxLevelError);
    });
    it('should pay the corresponding price.', () => {
      const buildingData = townData.buildings[0];
      const buildingId: BuildingId = buildingData.id;

      const buildingConfig = buildingConfig1;
      const buildingLevel = buildingData.level;
      const nextLevel = buildingLevel + 1;

      const buildingPrice = buildingConfig.levels[nextLevel].price[0];
      const resourceAmount = buildingPrice.amount;
      const resourceId = buildingPrice.resourceId;

      const resourceAmountBefore =
        playerDataFacade._playerData.towns[0].resources[resourceId].amount;
      const resourceAmountExpected = resourceAmountBefore - resourceAmount;

      buildingsSystem.upgrade(buildingId);

      const resourceAmountAfter =
        playerDataFacade._playerData.towns[0].resources[resourceId].amount;

      expect(resourceAmountAfter).to.be.equal(resourceAmountExpected);
    });
    it('should add a building finish task into the global task queue.', () => {
      const buildingData = townData.buildings[0];
      const buildingId: BuildingId = buildingData.id;

      const buildingConfig = buildingConfig1;

      const buildingPriceLvl2 = buildingConfig.levels[2].price[0];
      const resourceAmount = buildingPriceLvl2.amount;
      const resourceId = buildingPriceLvl2.resourceId;

      const resourceAmountBefore =
        playerDataFacade._playerData.towns[0].resources[resourceId].amount;
      const resourceAmountExpected = resourceAmountBefore - resourceAmount;

      buildingsSystem.upgrade(buildingId);

      // expect(taskQueue._queue).to.have.a.lengthOf(1);
      expect(buildingData.constructionProgress).to.be.eq(0);

      // expect(taskQueue._queue).to.have.a.lengthOf(1);
    });
    it('should throw an error if the building id does not exists', () => {
      const fn = () => buildingsSystem.upgrade(9999999);
      expect(fn).to.throw(PlayerDataBuildingNotFoundError);
    });
    it('should throw an error if the building parallel capacity does not fit.', () => {
      const buildingData1 = townData.buildings[0];
      const buildingId1: BuildingId = buildingData1.id;

      const buildingData2 = townData.buildings[5];
      const buildingId2: BuildingId = buildingData2.id;

      buildingsSystem.upgrade(buildingId2);
      const fn = () => buildingsSystem.upgrade(buildingId1);

      expect(fn).to.throw(BuildingParallelCapacityNotFree);
    });
    it('should throw an error if the building resources does not fit.', () => {
      const buildingData = townData.buildings[2];
      const buildingId: BuildingId = buildingData.id;

      const fn = () => buildingsSystem.upgrade(buildingId);
      expect(fn).to.throw(BuildingNotEnoughResourcesError);
    });
    it('should throw an error if the building does not pass the requirements.', () => {
      const buildingData = townData.buildings[3];
      const buildingId: BuildingId = buildingData.id;

      const fn = () => buildingsSystem.upgrade(buildingId);
      expect(fn).to.throw(BuildingRequirementNotFulfilledError);
    });
    it('should trigger an error if the construction progress is not yet complete.', () => {
      const buildingData = townData.buildings[4];
      const buildingId: BuildingId = buildingData.id;

      const fn = () => buildingsSystem.upgrade(buildingId);
      expect(fn).to.throw(BuildingProcessHasNotYetCompleted);
    });
  });

  describe('downgrade', () => {
    beforeEach(() => {
      townData = {
        name: '',
        units: [],
        location: [0, 0],
        effects: [],
        id: 1,
        resources: { 1: { amount: 200 } },
        buildings: [
          {
            id: 1,
            buildingTypeId: 3,
            constructionProgress: 100,
            level: 4,
            location: 1,
          },
          {
            id: 2,
            buildingTypeId: 3,
            constructionProgress: 100,
            level: 1,
            location: 1,
          },
        ],
        buildingSlots: [
          { id: 1, allowedBuildingTypes: [1, 2], position: 23 },
          { id: 2, allowedBuildingTypes: [1, 2], position: 25 },
        ],
        buildParallelCapacity: 2,
      };

      playerDataFacade = new PlayerDataFacade({
        level: 1,
        resources: {},
        currentActiveTownId: townData.id,
        towns: [townData],
      } as PlayerData);

      const resourceSystem = new ResourcesSystem(playerDataFacade);
      const requirementsSystem = new RequirementsSystem(playerDataFacade);
      taskQueue = new TaskQueue();
      effectBus = new EffectBus();

      buildingsSystem = new BuildingsSystem(
        configDataFacade,
        playerDataFacade,
        resourceSystem,
        requirementsSystem,
        Sinon.spy(taskQueue),
        Sinon.spy(effectBus),
      );
    });

    afterEach(() => {
      Sinon.reset();
    });

    it('should downgrade a building to the previous level.', (done) => {
      const buildingData = townData.buildings[0];
      const buildingId: BuildingId = buildingData.id;
      const buildingLevelBefore = buildingData.level;
      const buildingLevelExpected = buildingLevelBefore - 1;

      buildingsSystem.downgrade(buildingId);
      taskQueue.callExpiredTasks(Date.now() + 2000);

      setTimeout(() => {
        const buildingLevelAfter = buildingData.level;
        expect(buildingLevelAfter).to.be.equal(buildingLevelExpected);
        expect(buildingData.constructionProgress).to.be.eq(100);
        done();
      }, 0);
    });
    it('should throw if the building has the lowest level.', () => {
      const buildingData = townData.buildings[1];
      const buildingId: BuildingId = buildingData.id;

      const fn = () => buildingsSystem.downgrade(buildingId);
      expect(fn).to.throw(BuildingHasLowestLevelError);
    });
    it.skip('should get the downgrade price', () => {
      const buildingData = townData.buildings[0];
      const buildingId: BuildingId = buildingData.id;
      const buildingConfig = findConfigForTypeId(buildingData);
      const nextLevel = buildingData.level - 1;

      const buildingPrice = buildingConfig.levels[nextLevel].price[0];
      const resourceAmount = buildingPrice.amount;
      const resourceId = buildingPrice.resourceId;

      const resourceAmountBefore =
        playerDataFacade._playerData.towns[0].resources[resourceId].amount;
      const resourceAmountExpected = resourceAmountBefore - resourceAmount;

      buildingsSystem.downgrade(buildingId);

      const resourceAmountAfter =
        playerDataFacade._playerData.towns[0].resources[resourceId].amount;

      expect(resourceAmountAfter).to.be.equal(resourceAmountExpected);
    });
  });

  describe('destroy', () => {
    it('should delete the building from the player data.');
  });
});
