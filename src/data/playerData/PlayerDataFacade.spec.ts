import { expect } from 'chai';
import { BuildingData } from '../../systems/buildings/buildings.types';
import { PLayerDataBuildingNotFoundError } from './playerData.errors';
import { PlayerDataFacade } from './PlayerDataFacade';

describe('data/playerDataFacade.ts', () => {
  describe('queries', () => {
    let building1: BuildingData = {
      id: 1,
    };
    let towns = [
      { buildings: [{ id: 10 }, { id: 11 }, { id: 12 }] },
      { buildings: [{ id: 20 }] },
      {
        buildings: [{ id: 30 }, { id: 31 }, { id: 32 }, { id: 33 }, { id: 34 }],
      },
      { buildings: [{ id: 40 }] },
    ];
    towns.push({ buildings: [building1] });

    const playerDataFacade = new PlayerDataFacade({ towns });

    describe('findBuildingById', () => {
      it('should return the correct building', () => {
        const building = playerDataFacade.findBuildingById(building1.id);
        expect(building).to.be.equal(building);
      });
      it('should throw an error if the building was not found', () => {
        const fn = () => playerDataFacade.findBuildingById(999999);
        expect(fn).to.be.throw(PLayerDataBuildingNotFoundError);
      });
    });

    describe('findTownByBuildingId', () => {
      it('should return the searched town', () => {
        const town = playerDataFacade.findTownByBuildingId(building1.id);
      });
    });
  });
});
