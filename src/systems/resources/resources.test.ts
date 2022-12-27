import { expect } from 'chai';
import { getConfigData } from '../../data/configData/configData';
import { getPlayerData } from '../../data/playerData/playerData.helper';
import { ResourcesSystem } from './ResourcesSystem';

describe('systems/resources.test', () => {
  describe('increase', () => {
    it('should increase the amount of the given resource id by the given amount', async () => {
      const configData = await getConfigData(1);
      const playerData = await getPlayerData(1);

      const resId = 1;
      const resAmount = 10;

      const resAmountBefore = playerData._playerData.resources[resId];

      const resourcesSystem = new ResourcesSystem(configData, playerData);
      resourcesSystem.increase(resId, resAmount);

      const resAmountAfter = playerData._playerData.resources[resId];

      expect(resAmountAfter).to.be.eq(resAmountBefore + resAmount);
    });
  });
  describe('decrease', () => {
    it('should decrease the amount of the given resource id by the given amount', async () => {
      const configData = await getConfigData(1);
      const playerData = await getPlayerData(1);

      const resId = 1;
      const resAmount = 10;

      const resAmountBefore = playerData._playerData.resources[resId];
      expect(resAmountBefore).to.be.above(10);

      const resourcesSystem = new ResourcesSystem(configData, playerData);
      resourcesSystem.decrease(resId, resAmount);

      const resAmountAfter = playerData._playerData.resources[resId];

      expect(resAmountAfter).to.be.eq(resAmountBefore - resAmount);
    });
  });
});
