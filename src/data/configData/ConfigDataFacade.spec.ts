import { BuildingConfig } from '../../types/building.types';
import { ConfigData } from '../../types/config.types';
import { ItemConfig } from '../../types/item.types';
import { UnitConfig } from '../../types/units.types';

import { expect, use } from 'chai';
import sinonChai from 'sinon-chai';
import { ConfigNotFoundError } from './ConfigDataFacade';
use(sinonChai);

const buildingIdSuccess = 1;
const itemIdSuccess = 2;
const unitIdSuccess = 3;
const idFail = 999;

const fakeConfig: ConfigData = {
  buildings: {
    buildingsBuildParallel: 1,
    buildings: [{ typeId: buildingIdSuccess } as BuildingConfig],
  },
  items: [{ typeId: itemIdSuccess } as ItemConfig],
  units: [{ typeId: unitIdSuccess } as UnitConfig],
};

describe('classes/Config.ts', () => {
  let config = new ConfigFacade(fakeConfig);
  describe('constructor', () => {
    it('should create a config wrapper', () => {
      expect(config).to.be.not.undefined;
    });
  });
  describe('findBuildingByTypeId', () => {
    it('should be defined', () => {
      expect(config.findBuildingConfigByTypeId).to.be.not.undefined;
    });
    it('should get the building config for the given type Id', () => {
      const buildingConfig =
        config.findBuildingConfigByTypeId(buildingIdSuccess);
      expect(buildingConfig.typeId).to.be.eq(buildingIdSuccess);
    });
    it('should throw an error if the type id does not belong to a building.', () => {
      expect(() => config.findBuildingConfigByTypeId(idFail)).to.be.throw(
        ConfigNotFoundError,
      );
    });
  });
  describe('findItemConfigByTypeId', () => {
    it('should be defined', () => {
      expect(config.findItemConfigByTypeId).to.be.not.undefined;
    });
    it('should return the correct item config', () => {
      const itemConfig = config.findItemConfigByTypeId(itemIdSuccess);
      expect(itemConfig.typeId).to.be.eq(itemIdSuccess);
    });
    it('should throw an error if the type id does not belong to an item', () => {
      expect(() => config.findItemConfigByTypeId(idFail)).to.throw(
        ConfigNotFoundError,
      );
    });
  });
  describe('findUnitConfigByTypeId', () => {
    it('should be defined', () => {
      expect(config.findUnitConfigByTypeId).to.be.not.undefined;
    });
    it('should return the correct unit config', () => {
      const unitConfig = config.findUnitConfigByTypeId(unitIdSuccess);
      expect(unitConfig.typeId).to.be.eq(unitIdSuccess);
    });
    it('should throw an error if the type id does not belong to an unit', () => {
      expect(() => config.findUnitConfigByTypeId(idFail)).to.throw(
        ConfigNotFoundError,
      );
    });
  });
});
