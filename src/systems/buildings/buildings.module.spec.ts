import { expect, use } from 'chai';
import Sinon, { SinonStub, SinonStubbedInstance } from 'sinon';
import sinonChai from 'sinon-chai';
import { TaskQueue } from '../../classes/TaskQueue';
use(sinonChai);

import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerData, TownData } from '../../data/playerData/playerData.types';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import { BuildingNotEnoughResourcesError } from './buildings.errors';
import { buildBuilding, payBuildCosts } from './buildings.module';
import { BuildingTownPosition, BuildingConfigData } from './buildings.types';

const buildingConfig1: BuildingConfigData = {
  typeId: 1,
  levels: {
    1: {
      duration: '1min',
      price: [
        { resourceId: 1, amount: 10 },
        { resourceId: 2, amount: 10 },
      ],
      requirements: [{ type: 'playerLevel', level: 1 }],
      events: {
        onFinish: {
          effects: [
            { type: 'modify/resource/2', amount: 10 },
            { type: 'modify/capacity/2', amount: 100 },
          ],
        },
      },
    },
  },
};

describe('systems/buildings.module.spec', () => {
  describe('buildBuilding', () => {
    const buildingCityPosition: BuildingTownPosition = 42;
    let townData: TownData;
    let townDataBefore: TownData;
    let configDataFacade: ConfigDataFacade;
    let playerDataFacade: PlayerDataFacade;
    let resourceSystem: ResourcesSystem;
    let requirementsSystem: RequirementsSystem;
    let taskQueue: TaskQueue;

    beforeEach(() => {
      townDataBefore = {
        id: 1,
        resources: { 1: { amount: 100 }, 2: { amount: 100 } },
        buildings: [],
      };
      townData = {
        id: 1,
        resources: { 1: { amount: 100 }, 2: { amount: 100 } },
        buildings: [],
      };

      playerDataFacade = new PlayerDataFacade({
        level: 1,
        towns: [townData],
      } as PlayerData);

      configDataFacade = new ConfigDataFacade({});

      taskQueue = new TaskQueue();

      resourceSystem = new ResourcesSystem(playerDataFacade);
      requirementsSystem = new RequirementsSystem(playerDataFacade);

      expect(townData.buildings).has.a.lengthOf(0);
    });

    it('should add a building with a unique id to the playerData into the correct town.', () => {
      buildBuilding({
        resourceSystem,
        requirementsSystem,
        buildingConfig: buildingConfig1,
        townData,
        buildingTownPosition: buildingCityPosition,
        taskQueue,
      });
      expect(townData.buildings).has.a.lengthOf(1);
    });
    it('should remove the necessary resources from the playerData.', () => {
      buildBuilding({
        resourceSystem,
        requirementsSystem,
        buildingConfig: buildingConfig1,
        townData,
        buildingTownPosition: buildingCityPosition,
        taskQueue,
      });
      const buildingPrice = buildingConfig1.levels[1].price;

      for (const { resourceId, amount: priceAmount } of buildingPrice) {
        const amountBefore = townDataBefore.resources[resourceId].amount;
        const amountAfter = townData.resources[resourceId].amount;

        expect(amountAfter).to.be.eq(amountBefore - priceAmount);
      }
    });
    it.skip('should throw an error if the requirement does not fit.', () => {});
    it.skip('should add a building finish task into the global task queue.', () => {});
  });

  describe('payBuildCosts', () => {
    let resourceSystemStub: SinonStubbedInstance<ResourcesSystem>;
    let requirementsSystemStub: SinonStubbedInstance<RequirementsSystem>;

    const buildingPrices = [
      { resourceId: 1, amount: 10 },
      { resourceId: 2, amount: 10 },
    ];

    beforeEach(() => {
      resourceSystemStub = Sinon.stub({
        decreaseAmount: () => {},
      });

      requirementsSystemStub = Sinon.stub({
        check: () => true,
      });
    });

    afterEach(() => {
      Sinon.reset();
    });

    it('should call the check method on the requirementsSystem', () => {
      requirementsSystemStub.check.returns(true);

      payBuildCosts({
        resourceSystem: resourceSystemStub,
        requirementsSystem: requirementsSystemStub,
        buildingPrices,
        townId: 1,
      });

      expect(requirementsSystemStub.check).to.be.calledOnce;
      expect(resourceSystemStub.decreaseAmount).to.be.calledTwice;
    });
    it('should call the decreaseAmount method for every resource in the price', () => {
      requirementsSystemStub.check.returns(true);

      payBuildCosts({
        resourceSystem: resourceSystemStub,
        requirementsSystem: requirementsSystemStub,
        buildingPrices,
        townId: 1,
      });

      expect(resourceSystemStub.decreaseAmount).to.be.calledTwice;
    });
    it('should throw if the price is higher than the resource capacity', () => {
      requirementsSystemStub.check.returns(false);

      const fn = () =>
        payBuildCosts({
          resourceSystem: resourceSystemStub,
          requirementsSystem: requirementsSystemStub,
          buildingPrices,
          townId: 1,
        });

      expect(fn).to.throw(BuildingNotEnoughResourcesError);
    });
  });
});
