import { expect } from 'chai';
import { BuildingData } from '../../systems/buildings/buildings.types';
import { PLayerDataBuildingNotFoundError } from './playerData.errors';
import { PlayerDataFacade } from './PlayerDataFacade';

describe('data/playerDataFacade.ts', () => {
  let building1: BuildingData;
  let towns = [{ buildings: [{ id: 10 }] }, { buildings: [{ id: 20 }] }];
  beforeEach(() => {
    building1 = {
      id: 1,
    };
    towns.push({ buildings: [building1] });
  });

  describe('findBuildingById', () => {
    it('should return the correct building', () => {
      const playerDataFacade = new PlayerDataFacade({ towns });
      const buildingId = building1.id;

      const building = playerDataFacade.findBuildingById(buildingId);

      expect(building).to.be.equal(building);
    });
    it('should throw an error if the building was not found', () => {
      const playerDataFacade = new PlayerDataFacade({ towns });
      const buildingId = 999999;

      const fn = () => playerDataFacade.findBuildingById(buildingId);

      expect(fn).to.be.throw(PLayerDataBuildingNotFoundError);
    });
  });
});
