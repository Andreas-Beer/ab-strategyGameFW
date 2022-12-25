import { expect } from 'chai';
import { getConfigData } from './configData';

describe('data/configData.ts', () => {
  describe('set', () => {
    it('could be modified values', () => {
      const conf = getConfigData();
      expect(conf)
        .to.be.an('object')
        .include.keys('buildings', 'units', 'items');
    });
  });
});
