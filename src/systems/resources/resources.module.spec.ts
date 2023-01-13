import { expect } from 'chai';
import { ResourceNotFoundError } from './resources.errors';
import { ResourcesPlayerData } from './resources.interfaces';

import { findResourceById, modifyResourceAmount } from './resources.module';
import { ResourcesData } from './resources.types';

const resourceId1 = 1;
const resourceId100 = 100;
const resourceId999999X = 999999;

describe('systems/resources/resources.module.ts', () => {
  let globalResourcesMock: ResourcesData;
  let resourceDataMock: ResourcesData;
  let resourceDataMockMax: ResourcesData;
  let resourceDataMockMin: ResourcesData;
  let amountBefore: number;
  let maxLimitBefore: number;
  let resourcesPlayerData: ResourcesPlayerData;

  const localResId = resourceId1;
  const globalResId = resourceId100;
  const amount = 20;

  beforeEach(() => {
    globalResourcesMock = {
      [globalResId]: { amount: 1000 },
      2: { amount: 1000 },
    };
    resourceDataMock = { [localResId]: { amount: 1000 }, 2: { amount: 1000 } };
    resourceDataMockMax = { [localResId]: { amount: 1000, max: 1005 } };
    resourceDataMockMin = { [localResId]: { amount: 1000, min: 0 } };
    amountBefore = resourceDataMock[localResId].amount;
    maxLimitBefore = resourceDataMockMax[localResId].max!;

    resourcesPlayerData = {
      getGlobalResources: () => globalResourcesMock,
      getCurrentActiveTown: () => ({ resources: resourceDataMock }),
    };
  });

  describe('FindResource', () => {
    it('should return the correct Resource', () => {
      const searchedResource = findResourceById({
        resourcesPlayerData,
        resourceId: localResId,
      });
      expect(searchedResource).to.be.eq(resourceDataMock[localResId]);
    });

    it('shouldReturn the global resource if the id matches a global resource', () => {
      const searchedResource = findResourceById({
        resourcesPlayerData,
        resourceId: globalResId,
      });
      expect(searchedResource).to.be.eq(globalResourcesMock[globalResId]);
    });

    it('should throw an ResourceNotFoundError if the resourceID is not in the playerData', () => {
      const fn = () =>
        findResourceById({
          resourcesPlayerData,
          resourceId: resourceId999999X,
        });

      expect(fn).to.throw(ResourceNotFoundError);
    });
  });

  describe('modifyResourceAmount', () => {
    it('should increase the amount of the resource', () => {
      modifyResourceAmount({
        calculator: (oldAmount) => oldAmount + amount,
        resourceData: resourceDataMock[localResId],
      });

      const amountAfter = resourceDataMock[localResId].amount;
      expect(amountAfter).to.be.eq(amountBefore + amount);
    });

    it('should increase the amount only to the limit', () => {
      modifyResourceAmount({
        calculator: (oldAmount) => oldAmount + amount,
        resourceData: resourceDataMockMax[localResId],
      });

      const amountAfter = resourceDataMockMax[localResId].amount;
      expect(amountAfter).to.be.eq(resourceDataMockMax[localResId].max);
    });

    it('should increase the amount above the limit if the shouldIgnoreLimit flag is set', () => {
      modifyResourceAmount({
        calculator: (oldAmount) => oldAmount + amount,
        resourceData: resourceDataMockMax[localResId],
        options: { shouldIgnoreLimit: true },
      });

      const amountAfter = resourceDataMockMax[localResId].amount;
      expect(amountAfter).to.be.eq(amountBefore + amount);
    });
  });
});
