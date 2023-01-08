import { expect, use } from 'chai';
import Sinon, { SinonStubbedInstance } from 'sinon';
import sinonChai from 'sinon-chai';
use(sinonChai);

import { TownData } from '../../data/playerData/playerData.types';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import {
  BuildingNotEnoughResourcesError,
  BuildingSlotIsNotFreeError,
  BuildingSlotNotFoundError,
} from './buildings.errors';
import {
  checkForFreeParallelBuildingCapacities,
  payBuildCosts,
  validateBuildingPlace,
} from './buildings.module';
import { BuildingConfigData } from './buildings.types';

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

  describe('validateBuildingPlace', () => {
    const townData: TownData = {
      buildings: [
        {
          id: 111111,
          level: 1,
          typeId: 1,
          constructionProgress: 100,
          location: 2,
        },
      ],
      buildingSlots: [
        {
          id: 1,
          position: 1,
          allowedBuildingTypes: [1],
        },
        {
          id: 2,
          position: 2,
          allowedBuildingTypes: [1],
        },
      ],
    };

    it('should pass if everything is correct', () => {
      const result = validateBuildingPlace({
        buildingTypeId: 1,
        buildingTownPosition: 1,
        townData,
      });

      expect(result).to.be.true;
    });

    it('should return false if the building is not the correct type', () => {
      const result = validateBuildingPlace({
        buildingTypeId: 2,
        buildingTownPosition: 1,
        townData,
      });

      expect(result).to.be.false;
    });

    it('should throw if the place has already a building', () => {
      const result = () =>
        validateBuildingPlace({
          buildingTypeId: 2,
          buildingTownPosition: 2,
          townData,
        });

      expect(result).to.throw(BuildingSlotIsNotFreeError);
    });

    it('should throw if the slot does not exist', () => {
      const result = () =>
        validateBuildingPlace({
          buildingTypeId: 2,
          buildingTownPosition: 999999999,
          townData,
        });

      expect(result).to.throw(BuildingSlotNotFoundError);
    });
  });

  describe('checkForFreeParallelBuildingCapacities', () => {
    it('should return true if the parallel building capacity has not yet been reached.', () => {
      const result = checkForFreeParallelBuildingCapacities({
        townData: {
          buildParallelCapacity: 1,
          buildings: [],
        },
      });

      expect(result).to.be.true;
    });

    it('should return false if the parallel building capacity has been reached.', () => {
      const result = checkForFreeParallelBuildingCapacities({
        townData: {
          buildParallelCapacity: 1,
          buildings: [{ constructionProgress: 0 }],
        },
      });

      expect(result).to.be.false;
    });
  });
});
