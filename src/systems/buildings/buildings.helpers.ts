import { BuildingData } from './buildings.types';

export function isBuildingUnderConstruction(buildingData: BuildingData) {
  return buildingData.constructionProgress < 100;
}
