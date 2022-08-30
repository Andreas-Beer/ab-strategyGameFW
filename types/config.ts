type BuildingConfig = {
  id: number;
  price: Price[];
  requirements: Requirement;
};

type ItemConfig = {
  id: number;
  price: { [level: number]: Price[] };
};

type Config = {};
