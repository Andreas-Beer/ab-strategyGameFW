import { expect } from 'chai';
import { getConfigData } from '../../data/configData/configData';
import { getPlayerData } from '../../data/playerData/playerData';
import { ResourcesSystem } from './ResourcesSystem';

describe.only('systems/resources.test', () => {
  describe('increase', () => {
    it('should increase the amount of the given resource id by the given amount', async () => {
      const configData = await getConfigData(1);
      const playerData = await getPlayerData(1);

      console.log('configData', configData);
      console.log('playerData', playerData);

      const resId = 1;
      const resAmount = 10;

      const resAmountBefore = playerData._playerData.resources[resId];

      const resourcesSystem = new ResourcesSystem(configData, playerData);
      resourcesSystem.increase(1, 10);

      const resAmountAfter = playerData._playerData.resources[resId];

      expect(resAmountAfter).to.be.eq(resAmountBefore + resAmount);
    });
  });
});
