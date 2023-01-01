import { expect } from 'chai';
import { ConfigDataFacade } from '../../data/configData/ConfigDataFacade';
import { PlayerDataFacade } from '../../data/playerData/PlayerDataFacade';
import { RequirementsSystem } from './Requirements.system';

describe('systems/requirements/requirements.test.ts', () => {
  let requirementsSystem: RequirementsSystem;

  beforeEach(() => {
    const playerDataFacade = new PlayerDataFacade({});
    const configDataFacade = new ConfigDataFacade({});
    requirementsSystem = new RequirementsSystem(
      configDataFacade,
      playerDataFacade,
    );
  });

  describe('check', () => {
    it.skip('should pass', () => {
      expect(true).to.be.false;
    });
  });
});
