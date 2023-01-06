import { expect } from 'chai';
import Sinon, { SinonStubbedInstance } from 'sinon';
import { RequirementPlayerData } from './requirements.interfaces';
import {
  checkHasBuilding,
  checkHasItem,
  checkHasPlayerLevel,
  checkHasResourceAmount,
  checkRequirementsAgainstPlayerData,
} from './requirements.module';

describe('systems/requirements/requirements.module.ts', () => {
  let playerDataStub: SinonStubbedInstance<RequirementPlayerData>;

  beforeEach(() => {
    playerDataStub = Sinon.stub({
      getPlayerLevel: () => 1,
      getItems: () => [],
      getBuildings: (townId) => [],
      getResources: (townId) => [],
    });
    playerDataStub.getPlayerLevel.returns(10);
    playerDataStub.getItems.returns({ 1: 10, 2: 0 });
    playerDataStub.getBuildings.returns([
      { typeId: 1, level: 4 },
      { typeId: 1, level: 6 },
    ]);
    playerDataStub.getResources.returns({ 1: { amount: 10 } });
  });

  afterEach(() => {
    Sinon.reset();
  });

  describe('checkRequirementsAgainstPlayerData', () => {
    it('should return true if every requirement passes', () => {
      const result = checkRequirementsAgainstPlayerData({
        playerData: playerDataStub,
        requirements: [
          { type: 'playerLevel', level: 1 },
          { type: 'item', itemTypeId: 1, amount: 5 },
          { type: 'building', buildingTypeId: 1, level: 1 },
        ],
        townId: 1,
      });

      expect(result).to.be.true;
    });

    it('should respect the not value', () => {
      const result = checkRequirementsAgainstPlayerData({
        playerData: playerDataStub,
        requirements: [
          { type: 'playerLevel', level: 9999, not: true },
          { type: 'item', itemTypeId: 1, amount: 9999, not: true },
          { type: 'building', buildingTypeId: 1, level: 9999, not: true },
          { type: 'building', buildingTypeId: 9999, level: 1, not: true },
        ],
        townId: 1,
      });

      expect(result).to.be.true;
    });

    it('should return false if some of the requirement does not passes', () => {
      const result = checkRequirementsAgainstPlayerData({
        playerData: playerDataStub,
        requirements: [
          { type: 'playerLevel', level: 1 },
          { type: 'item', itemTypeId: 9999, amount: 10 },
          { type: 'building', buildingTypeId: 1, level: 0 },
        ],
        townId: 1,
      });

      expect(result).to.be.false;
    });
  });

  describe('checkHasPlayerLevel', () => {
    it('should return true if the player level is greater than or equal the requested level', () => {
      const result = checkHasPlayerLevel({
        playerData: playerDataStub,
        requirement: {
          type: 'playerLevel',
          level: 10,
        },
      });

      expect(result).to.be.true;
    });

    it('should return false if the player level is less than the requested level', () => {
      const result = checkHasPlayerLevel({
        playerData: playerDataStub,
        requirement: {
          type: 'playerLevel',
          level: 20,
        },
      });

      expect(result).to.be.false;
    });
  });

  describe('checkHasItem', () => {
    it('should return true if the amount of the item in stack is greater or equal than the requirement amount ', () => {
      const result = checkHasItem({
        playerData: playerDataStub,
        requirement: { type: 'item', itemTypeId: 1, amount: 10 },
      });
      expect(result).to.be.true;
    });

    it('if no amount was specified, 1 is the default', () => {
      const result1 = checkHasItem({
        playerData: playerDataStub,
        requirement: { type: 'item', itemTypeId: 1 },
      });
      expect(result1).to.be.true;

      const result2 = checkHasItem({
        playerData: playerDataStub,
        requirement: { type: 'item', itemTypeId: 2 },
      });
      expect(result2).to.be.false;
    });
    it('should return false if the amount of the item in stack is less than the requirement amount ', () => {
      const result = checkHasItem({
        playerData: playerDataStub,
        requirement: { type: 'item', itemTypeId: 1, amount: 100 },
      });
      expect(result).to.be.false;
    });
    it('should return false if the item is not in stock', () => {
      const result = checkHasItem({
        playerData: playerDataStub,
        requirement: { type: 'item', itemTypeId: 9999, amount: 100 },
      });
      expect(result).to.be.false;
    });
  });

  describe('checkHasBuilding', () => {
    it('should return true if the building is in the town', () => {
      const result = checkHasBuilding({
        playerData: playerDataStub,
        requirement: { type: 'building', buildingTypeId: 1, level: 1 },
        townId: 1,
      });
      expect(result).to.be.true;
    });

    it('should return true if there are multiple buildings with this id and one of the buildings has a level greater or equal than requested ', () => {
      const result = checkHasBuilding({
        playerData: playerDataStub,
        requirement: { type: 'building', buildingTypeId: 1, level: 6 },
        townId: 1,
      });
      expect(result).to.be.true;
    });

    it('should return false if the building is not the town', () => {
      const result = checkHasBuilding({
        playerData: playerDataStub,
        requirement: { type: 'building', buildingTypeId: 9999, level: 1 },
        townId: 1,
      });
      expect(result).to.be.false;
    });

    it('should return false if the building level is higher than the required level ', () => {
      const result = checkHasBuilding({
        playerData: playerDataStub,
        requirement: { type: 'building', buildingTypeId: 1, level: 9999 },
        townId: 1,
      });
      expect(result).to.be.false;
    });
  });

  describe('checkHasResourceAmount', () => {
    it('should return true if the resource amount fits', () => {
      const result = checkHasResourceAmount({
        playerData: playerDataStub,
        requirement: { type: 'resourceAmount', resourceId: 1, amount: 1 },
        townId: 1,
      });
      expect(result).to.be.true;
    });

    it('should return false if the resource does not exists', () => {
      const result = checkHasResourceAmount({
        playerData: playerDataStub,
        requirement: {
          type: 'resourceAmount',
          resourceId: 99999,
          amount: 10000,
        },
        townId: 1,
      });
      expect(result).to.be.false;
    });

    it('should return false if the resource amount does not fit', () => {
      const result = checkHasResourceAmount({
        playerData: playerDataStub,
        requirement: { type: 'resourceAmount', resourceId: 1, amount: 10000 },
        townId: 1,
      });
      expect(result).to.be.false;
    });
  });
});
