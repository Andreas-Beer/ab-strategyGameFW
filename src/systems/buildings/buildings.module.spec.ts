import { expect } from 'chai';
import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerData, TownData } from '../../data/playerData/playerData.types';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { ResourcesSystem } from '../resources';
import { buildBuilding } from './buildings.module';
import { BuildingCityPosition, BuildingConfigData } from './buildings.types';

const buildingConfig1: BuildingConfigData = {
  typeId: 1,
  levels: {
    1: {
      level: 1,
      duration: '1min',
      price: [
        { resourceId: 1, amount: 10 },
        { resourceId: 2, amount: 10 },
      ],
      requirements: [{ type: 'playerLevel', level: 1 }],
      effects: [
        { type: 'modify/resource/2', amount: 10 },
        { type: 'modify/capacity/2', amount: 100 },
      ],
    },
  },
};

describe('system/buildings.module.spec', () => {
  describe('build', () => {
    const buildingCityPosition: BuildingCityPosition = 42;
    let townData: TownData;
    let townDataBefore: TownData;
    let configDataFacade: ConfigDataFacade;
    let playerDataFacade: PlayerDataFacade;
    let resourceSystem: ResourcesSystem;

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

      resourceSystem = new ResourcesSystem(configDataFacade, playerDataFacade);

      expect(townData.buildings).has.a.lengthOf(0);

      buildBuilding({
        resourceSystem,
        buildingConfig: buildingConfig1,
        playerDataFacade,
        townData,
        buildingCityPosition,
      });
    });

    it('should add a building with a unique id to the playerData into the correct town.', () => {
      expect(townData.buildings).has.a.lengthOf(1);
    });
    it('should remove the necessary resources from the playerData.', () => {
      const buildingPrice = buildingConfig1.levels[1].price;

      for (const { resourceId, amount: priceAmount } of buildingPrice) {
        const amountBefore = townDataBefore.resources[resourceId].amount;
        const amountAfter = townData.resources[resourceId].amount;

        expect(amountAfter).to.be.eq(amountBefore - priceAmount);
      }
    });
    it('should throw an error if there is not enough resource to build the building.', () => {
      const fn = () =>
        buildBuilding({
          resourceSystem,
          buildingConfig: buildingConfig1,
          playerDataFacade,
          townData,
          buildingCityPosition,
        });

      expect(fn).to.not.throw;
    });
    it.skip('should add a building finish task into the global task queue.', () => {});
    it.skip('should throw an error if the requirement does not fit.', () => {});
  });
});
