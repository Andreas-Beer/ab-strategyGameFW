import { expect } from 'chai';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { RequirementsSystem } from './Requirements.system';

describe('systems/requirements/requirements.test.ts', () => {
  let requirementsSystem: RequirementsSystem;

  beforeEach(() => {
    const playerDataFacade = new PlayerDataFacade({
      level: 5,
      items: { 1: 20 },
      currentActiveTownId: 1,
      towns: [{ id: 1, buildings: [{ typeId: 1, level: 3 }] }],
    });
    requirementsSystem = new RequirementsSystem(playerDataFacade);
  });

  describe('check', () => {
    it('should pass if the requirements fits', () => {
      const result = requirementsSystem.check([
        { type: 'has/playerLevel', data: { playerLevel: 1 } },
        { type: 'has/item', data: { itemTypeId: 1, amount: 10 } },
        {
          type: 'has/building',
          data: { buildingTypeId: 999, buildingLevel: 1, amount: 1 },
          not: true,
        },
      ]);

      expect(result).to.be.true;
    });
  });
});
