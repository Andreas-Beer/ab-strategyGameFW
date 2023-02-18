import { expect } from 'chai';
import Sinon, { SinonStubbedInstance } from 'sinon';
import { TownData } from '../../data/playerData/playerData.types';
import { RequirementPlayerData } from './requirements.interfaces';
import {
  checkHasBuilding,
  checkHasItem,
  checkHasPlayerLevel,
  checkHasResources,
  checkRequirementsAgainstPlayerData,
} from './requirements.module';

describe('systems/requirements/requirements.module.ts', () => {
  let playerDataStub: SinonStubbedInstance<RequirementPlayerData>;
  let townData: TownData = {};

  beforeEach(() => {
    playerDataStub = Sinon.stub({
      getPlayerLevel: () => 1,
      getItems: () => [],
      getBuildings: (townData) => [],
      getResources: (townData) => [],
      getCurrentActiveTown: () => townData,
    });
    playerDataStub.getPlayerLevel.returns(10);
    playerDataStub.getItems.returns({ 1: 10, 2: 0 });
    playerDataStub.getBuildings.returns([
      { buildingTypeId: 1, level: 4 },
      { buildingTypeId: 1, level: 6 },
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
          { type: 'has/playerLevel', data: { playerLevel: 1 } },
          { type: 'has/item', data: { itemTypeId: 1, amount: 2 } },
          {
            type: 'has/building',
            data: { buildingTypeId: 1, buildingLevel: 1, amount: 2 },
          },
        ],
      });

      expect(result).to.be.true;
    });
    it('should respect the not value', () => {
      const result = checkRequirementsAgainstPlayerData({
        playerData: playerDataStub,
        requirements: [
          { type: 'has/playerLevel', data: { playerLevel: 9999 }, not: true },
          {
            type: 'has/item',
            data: { itemTypeId: 1, amount: 9999 },
            not: true,
          },
          {
            type: 'has/building',
            data: { buildingTypeId: 1, buildingLevel: 10, amount: 1 },
            not: true,
          },
          {
            type: 'has/building',
            data: { buildingTypeId: 9999, buildingLevel: 1, amount: 1 },
            not: true,
          },
        ],
      });

      expect(result).to.be.true;
    });
    it('should return false if some of the requirement does not passes', () => {
      const result = checkRequirementsAgainstPlayerData({
        playerData: playerDataStub,
        requirements: [
          { type: 'has/item', data: { itemTypeId: 9999, amount: 10 } },
        ],
      });

      expect(result).to.be.false;
    });
  });

  describe('checkHasPlayerLevel', () => {
    it('should return true if the player level is greater than or equal the requested level', () => {
      const result = checkHasPlayerLevel({
        playerData: playerDataStub,
        requirement: {
          type: 'has/playerLevel',
          data: { playerLevel: 10 },
        },
        townData,
      });

      expect(result).to.be.true;
    });
    it('should return false if the player level is less than the requested level', () => {
      const result = checkHasPlayerLevel({
        playerData: playerDataStub,
        requirement: {
          type: 'has/playerLevel',
          data: { playerLevel: 20 },
        },
        townData,
      });

      expect(result).to.be.false;
    });
  });

  describe('checkHasItem', () => {
    it('should return true if the amount of the item in stack is greater or equal than the requirement amount ', () => {
      const result = checkHasItem({
        playerData: playerDataStub,
        requirement: { type: 'has/item', data: { itemTypeId: 1, amount: 10 } },
        townData,
      });
      expect(result).to.be.true;
    });
    it('should return false if the amount of the item in stack is less than the requirement amount ', () => {
      const result = checkHasItem({
        playerData: playerDataStub,
        requirement: { type: 'has/item', data: { itemTypeId: 1, amount: 100 } },
        townData,
      });
      expect(result).to.be.false;
    });
    it('should return false if the item is not in stock', () => {
      const result = checkHasItem({
        playerData: playerDataStub,
        requirement: {
          type: 'has/item',
          data: { itemTypeId: 9999, amount: 100 },
        },
        townData,
      });
      expect(result).to.be.false;
    });
  });

  describe('checkHasBuilding', () => {
    it('should return true if the building is in the town', () => {
      const result = checkHasBuilding({
        playerData: playerDataStub,
        requirement: {
          type: 'has/building',
          data: { buildingTypeId: 1, buildingLevel: 1, amount: 1 },
        },
        townData,
      });
      expect(result).to.be.true;
    });
    it('should return true if there are multiple buildings with this id and one of the buildings has a level greater or equal than requested ', () => {
      const result = checkHasBuilding({
        playerData: playerDataStub,
        requirement: {
          type: 'has/building',
          data: { buildingTypeId: 1, buildingLevel: 6, amount: 1 },
        },
        townData,
      });
      expect(result).to.be.true;
    });
    it('should return false if the building is not the town', () => {
      const result = checkHasBuilding({
        playerData: playerDataStub,
        requirement: {
          type: 'has/building',
          data: { buildingTypeId: 9999, buildingLevel: 1, amount: 1 },
        },
        townData,
      });
      expect(result).to.be.false;
    });
    it('should return false if the building level is higher than the required level ', () => {
      const result = checkHasBuilding({
        playerData: playerDataStub,
        requirement: {
          type: 'has/building',
          data: { buildingTypeId: 1, buildingLevel: 10, amount: 1 },
        },
        townData,
      });
      expect(result).to.be.false;
    });
  });

  describe('checkHasResourceAmount', () => {
    it('should return true if the resource amount fits', () => {
      const result = checkHasResources({
        playerData: playerDataStub,
        requirement: {
          type: 'has/resources',
          data: { resourceTypeId: 1, amount: 1 },
        },
        townData,
      });
      expect(result).to.be.true;
    });
    it('should return false if the resource does not exists', () => {
      const result = checkHasResources({
        playerData: playerDataStub,
        requirement: {
          type: 'has/resources',
          data: { resourceTypeId: 99999, amount: 10000 },
        },
        townData,
      });
      expect(result).to.be.false;
    });
    it('should return false if the resource amount does not fit', () => {
      const result = checkHasResources({
        playerData: playerDataStub,
        requirement: {
          type: 'has/resources',
          data: { resourceTypeId: 1, amount: 10000 },
        },
        townData,
      });
      expect(result).to.be.false;
    });
  });
});
