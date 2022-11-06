type BuildingLevelConfig = {
  price: Price[];
  requirements: Requirement[];
  duration: Duration;
  effects: EffectConfig[];
};

type BuildingConfig = {
  id: number;
  levels: {
    [key: number]: BuildingLevelConfig;
  };
  controller?: { name: string; config?: any };
};

type BuildingData = {
  id: number;
  buildingTypeId: number;
  level: number;
  location: number;
  constructionProgress: number;
  content?: any;
};
