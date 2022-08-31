type BuildingConfig = {
  id: number;
  price: { [key: number]: Price[] };
  requirements: { [key: number]: Requirement[] };
  duration: { [key: number]: Duration };
  effects?: { [key: number]: EffectConfig[] };
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
