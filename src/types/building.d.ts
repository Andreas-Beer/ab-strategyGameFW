type BuildingTypeId = number;

type BuildingLevelConfig = {
  price: Price[];
  requirements: Requirement[];
  duration: Duration;
  effects: EffectConfig[];
};

type BuildingConfig = {
  typeId: BuildingTypeId;
  levels: {
    [key: number]: BuildingLevelConfig;
  };
  controller?: { name: string; config?: any };
};

type BuildingData = {
  id: number;
  buildingTypeId: BuildingTypeId;
  level: number;
  location: number;
  constructionProgress: number;
  content?: any;
};
