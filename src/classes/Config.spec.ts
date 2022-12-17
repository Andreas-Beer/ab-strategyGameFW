import { expect } from 'chai';
import { Config, ConfigNotFoundError } from './Config';

const buildingIdSuccess = 1;
const itemIdSuccess = 2;
const idFail = 999;

const fakeConfig: ConfigData = {
  buildings: {
    buildingsBuildParallel: 1,
    buildings: [{ typeId: buildingIdSuccess } as BuildingConfig],
  },
  items: [{ typeId: itemIdSuccess } as ItemConfig],
  units: [],
};

describe('classes/Config.ts', () => {
  let config = new Config(fakeConfig);
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
      const buildingConfigResult =
        config.findBuildingConfigByTypeId(buildingIdSuccess);
      expect(
        buildingConfigResult.success && buildingConfigResult.value.typeId,
      ).to.be.eq(buildingIdSuccess);
    });
    it('should throw an error if the type id does not belong to a building.', () => {
      const buildingConfigResult = config.findBuildingConfigByTypeId(idFail);
      expect(buildingConfigResult.value).to.be.instanceOf(ConfigNotFoundError);
    });
  });

  describe('findItemConfigByTypeId', () => {
    it('should be defined', () => {
      expect(config.findItemConfigByTypeId).to.be.not.undefined;
    });
    it('should return the correct itemConfig', () => {
      const itemConfigResult = config.findItemConfigByTypeId(itemIdSuccess);
      expect(
        itemConfigResult.success && itemConfigResult.value.typeId,
      ).to.be.eq(itemIdSuccess);
    });
  });
});
