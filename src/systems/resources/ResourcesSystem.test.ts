import { expect } from 'chai';
import { ConfigData } from '../../data/configData/config.types';
import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { ResourcesSystem } from './ResourcesSystem';

const resId = 1;
const townId = 1;

let configData: ConfigDataFacade;
let playerData: PlayerDataFacade;
let resourcesSystem: ResourcesSystem;

describe('systems/resources.test', () => {
  beforeEach(async () => {
    configData = new ConfigDataFacade({} as ConfigData);
    playerData = new PlayerDataFacade({
      resources: {
        1: { amount: 100, max: 1000 },
      },
      towns: [
        {
          id: 1,
          resources: {
            1: { amount: 200, max: 202 },
          },
        },
      ],
    });
    resourcesSystem = new ResourcesSystem(playerData);
  });

  describe('find', () => {
    it('should find the resource by id', async () => {
      const searchedResource = resourcesSystem.find(resId);
      expect(searchedResource).to.be.deep.eq(
        playerData.getGlobalResources()[resId],
      );
    });
    it('should returns a freezed obj', async () => {
      const searchedResource = resourcesSystem.find(resId);
      expect(() => (searchedResource.amount = 1))
        .to.throw(TypeError)
        .with.property('message')
        .include('Cannot assign to read only property');
    });
  });

  describe('increaseAmount', () => {
    it('should increase the amount of the given resource id by the given amount', async () => {
      const resAmount = 10;
      const resAmountBefore = resourcesSystem.find(resId).amount;
      resourcesSystem.increaseAmount(resId, resAmount);
      const resAmountAfter = resourcesSystem.find(resId).amount;

      expect(resAmountAfter).to.be.eq(resAmountBefore + resAmount);
    });
    it('should increase the amount of the given resource id by the given amount in the given town', async () => {
      const resAmount = 100;

      const resAmountBefore =
        playerData.findTownById(townId).resources[resId].amount;

      resourcesSystem.increaseAmount(resId, resAmount, { townId });

      const resAmountAfter =
        playerData.findTownById(townId).resources[resId].amount;

      const increasedAmount = resAmountBefore + resAmount;
      const clampedAmount =
        playerData.findTownById(townId).resources[resId].max ?? increasedAmount;
      const expectedAmount = Math.min(increasedAmount, clampedAmount);

      expect(resAmountAfter).to.be.eq(expectedAmount);
    });
  });

  describe('decreaseAmount', () => {
    it('should decrease the amount of the given resource id by the given amount', async () => {
      const resAmount = 10;

      const resAmountBefore = resourcesSystem.find(resId).amount;
      expect(resAmountBefore).to.be.above(10);
      resourcesSystem.decreaseAmount(resId, resAmount);
      const resAmountAfter = resourcesSystem.find(resId).amount;

      expect(resAmountAfter).to.be.eq(resAmountBefore - resAmount);
    });
    it('should decrease the amount of the given resource id by the given amount in the given town', async () => {
      const resAmount = 10;

      const resAmountBefore = resourcesSystem.find(resId, { townId }).amount;
      resourcesSystem.decreaseAmount(resId, resAmount, { townId });
      const resAmountAfter = resourcesSystem.find(resId, { townId }).amount;

      expect(resAmountAfter).to.be.eq(resAmountBefore - resAmount);
    });
  });

  describe('increaseMaxLimit', () => {
    it('should increase the max limit of a resource', () => {
      const limitAmount = 10;

      const resMaxLimitBefore = resourcesSystem.find(resId).max;
      resourcesSystem.increaseMaxLimit(resId, limitAmount);
      const resMaxLimitAfter = resourcesSystem.find(resId).max;

      expect(resMaxLimitAfter).to.be.eq(resMaxLimitBefore! + limitAmount);
    });
    it('should increase the max limit of a resource of the correct town', () => {
      const limitAmount = 10;

      const resMaxLimitBefore = resourcesSystem.find(resId, { townId }).max;
      resourcesSystem.increaseMaxLimit(resId, limitAmount, { townId });
      const resMaxLimitAfter = resourcesSystem.find(resId, { townId }).max;

      expect(resMaxLimitAfter).to.be.eq(resMaxLimitBefore! + limitAmount);
    });
  });

  describe('decreaseMaxLimit', () => {
    it('should decrease the max limit of a resource', () => {
      const limitAmount = 10;

      const resMaxLimitBefore = resourcesSystem.find(resId).max;
      resourcesSystem.decreaseMaxLimit(resId, limitAmount);
      const resMaxLimitAfter = resourcesSystem.find(resId).max;

      expect(resMaxLimitAfter).to.be.eq(resMaxLimitBefore! - limitAmount);
    });
    it('should decrease the max limit of a resource of the correct town', () => {
      const limitAmount = 10;

      const resMaxLimitBefore = resourcesSystem.find(resId, { townId }).max;
      resourcesSystem.decreaseMaxLimit(resId, limitAmount, { townId });
      const resMaxLimitAfter = resourcesSystem.find(resId, { townId }).max;

      expect(resMaxLimitAfter).to.be.eq(resMaxLimitBefore! - limitAmount);
    });
  });

  describe('modifyAmount', () => {
    it('should increase the amount', () => {
      const resAmount = 10;
      const resAmountBefore = resourcesSystem.find(resId).amount;
      resourcesSystem.modifyAmount(resId, `+${10}`);
      const resAmountAfter = resourcesSystem.find(resId).amount;

      expect(resAmountAfter).to.be.eq(resAmountBefore + resAmount);
    });
  });
});
