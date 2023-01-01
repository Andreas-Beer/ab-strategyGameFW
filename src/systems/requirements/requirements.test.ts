import { expect } from 'chai';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { RequirementsSystem } from './Requirements.system';

describe('systems/requirements/requirements.test.ts', () => {
  let requirementsSystem: RequirementsSystem;

  beforeEach(() => {
    const playerDataFacade = new PlayerDataFacade({
      level: 5,
      items: { 1: 20 },
      towns: [{ id: 1, buildings: [{ typeId: 1, level: 3 }] }],
    });
    requirementsSystem = new RequirementsSystem(playerDataFacade);
  });

  describe('check', () => {
    it('should pass if the requirements fits', () => {
      const result = requirementsSystem.check(
        [
          { type: 'playerLevel', level: 1 },
          { type: 'item', itemTypeId: 1, amount: 10 },
          { type: 'building', buildingTypeId: 999, level: 1, not: true },
        ],
        1,
      );

      expect(result).to.be.true;
    });
  });
});
