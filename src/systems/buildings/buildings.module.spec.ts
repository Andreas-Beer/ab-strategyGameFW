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
  payBuildingPrice,
  validateBuildingPlace,
} from './buildings.module';

describe('systems/buildings.module.spec', () => {
  describe('payBuildingPrice', () => {
    let resourceSystemStub: SinonStubbedInstance<ResourcesSystem>;
    let requirementsSystemStub: SinonStubbedInstance<RequirementsSystem>;
    let townData: TownData;

    const buildingPrices = [
      { resourceId: 1, amount: 10 },
      { resourceId: 2, amount: 10 },
    ];

    beforeEach(() => {
      townData = {};

      resourceSystemStub = Sinon.stub({
        modifyAmount: () => {},
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

      payBuildingPrice({
        resourceSystem: resourceSystemStub,
        requirementsSystem: requirementsSystemStub,
        buildingPrices,
        townData,
      });

      expect(requirementsSystemStub.check).to.be.calledOnce;
      expect(resourceSystemStub.modifyAmount).to.be.calledTwice;
    });
    it('should call the modifyAmount method for every resource in the price', () => {
      requirementsSystemStub.check.returns(true);

      payBuildingPrice({
        resourceSystem: resourceSystemStub,
        requirementsSystem: requirementsSystemStub,
        buildingPrices,
        townData,
      });

      expect(resourceSystemStub.modifyAmount).to.be.calledTwice;
    });
    it('should throw if the price is higher than the resource capacity', () => {
      requirementsSystemStub.check.returns(false);

      const fn = () =>
        payBuildingPrice({
          resourceSystem: resourceSystemStub,
          requirementsSystem: requirementsSystemStub,
          buildingPrices,
          townData,
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
