import { EventEmitter } from 'stream';
import { EffectBus, isEventHandlerKey } from '../../components/EffectEventBus';
import { Task } from '../../components/Task';
import { TaskQueue } from '../../components/TaskQueue';
import { RequirementsSystem } from '../requirements/Requirements.system';
import { ResourcesSystem } from '../resources';
import { BuildingGuard } from './BuildingsGuards';
import {
  BuildingsConfigData,
  BuildingsPlayerData,
} from './buildings.interfaces';
import {
  createNewBuilding,
  createUniqueBuildingId,
  payBuildingPrice,
} from './buildings.module';
import {
  BuildingData,
  BuildingId,
  BuildingLevel,
  BuildingTownPosition,
  BuildingTypeId,
} from './buildings.types';

export class BuildingsSystem extends EventEmitter {
  private guard: BuildingGuard;

  constructor(
    private configData: BuildingsConfigData,
    private playerData: BuildingsPlayerData,
    private resourcesSystem: ResourcesSystem,
    private requirementsSystem: RequirementsSystem,
    private taskQueue: TaskQueue,
    private effectBus: EffectBus,
  ) {
    super();
    this.guard = new BuildingGuard(configData, playerData, requirementsSystem);
  }

  build(
    buildingTypeId: BuildingTypeId,
    buildingTownPosition: BuildingTownPosition,
  ): BuildingData {
    this.guard.thereAreFreeParallelCapacities();

    const newBuildingId = createUniqueBuildingId();
    const buildingConfig =
      this.configData.findBuildingConfigByTypeId(buildingTypeId);
    const townData = this.playerData.getCurrentActiveTown();
    const levelConfig = buildingConfig.levels[1];
    const buildingAction = levelConfig.actions.upgrading;

    this.guard.hasFulfilledTheRequirements(buildingAction.requirements);
    this.guard.placeIsValid(buildingTypeId, buildingTownPosition);

    const newBuilding = createNewBuilding(
      buildingConfig,
      buildingTownPosition,
      newBuildingId,
    );
    townData.buildings.push(newBuilding);

    const buildingStartEffects = buildingAction.effects?.start || [];
    const buildingFinishEffects = buildingAction.effects?.finish || [];

    for (const effect of buildingStartEffects) {
      if (isEventHandlerKey(effect.type)) {
        this.effectBus.triggerEffect(effect.type, effect.data);
      }
    }

    this.taskQueue.addTask(
      new Task(buildingAction.duration, () => {
        newBuilding.constructionProgress = 100;

        for (const effect of buildingFinishEffects) {
          if (isEventHandlerKey(effect.type)) {
            this.effectBus.triggerEffect(effect.type, effect.data);
          }
        }
      }),
    );

    return newBuilding;
  }

  upgrade(buildingId: BuildingId) {
    this.guard.thereAreFreeParallelCapacities();

    const building = this.playerData.findBuildingById(buildingId);
    const buildingConfig = this.configData.findBuildingConfigByTypeId(
      building.buildingTypeId,
    );
    const currentTownData = this.playerData.getCurrentActiveTown();
    const currentBuildingLevel = building.level;

    this.guard.hasCompletedItsProcess(building);
    this.guard.hasNotReachedItsMaxLevel(building);

    // Get next Level Specs
    const nextLevel = (currentBuildingLevel + 1) as BuildingLevel;
    const nextLevelConfig = buildingConfig.levels[nextLevel];
    const nextLevelDuration = nextLevelConfig.duration;
    const nextLevelRequirements = nextLevelConfig.requirements;
    const nextLevelPrice = nextLevelConfig.price;

    this.guard.hasFulfilledTheRequirements(nextLevelRequirements);

    // Pay Building Price
    payBuildingPrice({
      buildingPrices: nextLevelPrice,
      requirementsSystem: this.requirementsSystem,
      resourceSystem: this.resourcesSystem,
      townData: currentTownData,
    });

    // Reset Build Process
    building.constructionProgress = 0;

    // setTimeout for finish Event
    this.taskQueue.addTask(
      new Task(nextLevelDuration, () => {
        // trigger finish event
        building.constructionProgress = 100;
        building.level = nextLevel;
      }),
    );
  }

  downgrade(buildingId: BuildingId) {
    this.guard.thereAreFreeParallelCapacities();

    const building = this.playerData.findBuildingById(buildingId);
    const buildingConfig = this.configData.findBuildingConfigByTypeId(
      building.buildingTypeId,
    );
    const currentTownData = this.playerData.getCurrentActiveTown();
    const currentBuildingLevel = building.level;

    this.guard.hasCompletedItsProcess(building);
    this.guard.hasNotTheLowestLevel(building);

    // Get next Level Specs
    const nextLevel = (currentBuildingLevel - 1) as BuildingLevel;
    const nextLevelConfig = buildingConfig.levels[nextLevel];
    const nextLevelDuration = nextLevelConfig.duration;
    const nextLevelRequirements = nextLevelConfig.requirements;

    this.guard.hasFulfilledTheRequirements(nextLevelRequirements);

    // Reset Build Process
    building.constructionProgress = 0;

    // setTimeout for finish Event
    this.taskQueue.addTask(
      new Task(nextLevelDuration, () => {
        // trigger finish event
        building.constructionProgress = 100;
        building.level = nextLevel;
      }),
    );
  }
}
