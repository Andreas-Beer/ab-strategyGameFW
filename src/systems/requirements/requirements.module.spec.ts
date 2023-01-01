import { expect } from 'chai';
import Sinon from 'sinon';
import { I_RequirementSystemData } from './requirements.interfaces';
import { checkHasItem, checkHasPlayerLevel } from './requirements.module';

console.clear();

describe('systems/requirements.module.ts', () => {
  let playerDataStub: I_RequirementSystemData;

  beforeEach(() => {
    playerDataStub = Sinon.stub({
      getPlayerLevel: () => 1,
      getItems: () => [],
    });
    playerDataStub.getPlayerLevel.returns(10);
    playerDataStub.getItems.returns({ 1: 10, 2: 0 });
  });

  afterEach(() => {
    Sinon.reset();
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
});
