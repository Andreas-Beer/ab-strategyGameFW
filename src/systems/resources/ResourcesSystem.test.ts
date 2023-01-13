import { expect } from 'chai';
import { ConfigData } from '../../data/configData/config.types';
import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { Amount } from '../../helpers/amountCalculator';
import { ResourcesSystem } from './ResourcesSystem';

const resId = 1;
const globalResId = 100;
const townId = 1;

let configData: ConfigDataFacade;
let playerData: PlayerDataFacade;
let resourcesSystem: ResourcesSystem;

describe('systems/resources.test', () => {
  beforeEach(async () => {
    configData = new ConfigDataFacade({} as ConfigData);
    playerData = new PlayerDataFacade({
      resources: {
        100: { amount: 100, max: 1000 },
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
      const searchedResource = resourcesSystem.find(globalResId);
      expect(searchedResource).to.be.deep.eq(
        playerData.getGlobalResources()[globalResId],
      );
    });
    it('should returns a freezed obj', async () => {
      const searchedResource = resourcesSystem.find(globalResId);
      expect(() => (searchedResource.amount = 1))
        .to.throw(TypeError)
        .with.property('message')
        .include('Cannot assign to read only property');
    });
  });

  describe('modifyAmount', () => {
    it('should increase the amount', () => {
      const resId = 100;
      const resAmount = 10;
      const amount: Amount = `+${10}`;
      const resAmountBefore = resourcesSystem.find(resId).amount;
      resourcesSystem.modifyAmount(resId, amount);
      const resAmountAfter = resourcesSystem.find(resId).amount;

      expect(resAmountAfter).to.be.eq(resAmountBefore + resAmount);
    });
  });
});
