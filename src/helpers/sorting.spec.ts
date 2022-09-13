import { expect } from 'chai';
import { ASC, DESC } from './sorting';

describe('helpers/sorting.ts', () => {
  describe('ASC', () => {
    it('should return a - b', () => {
      expect(ASC(2, 1)).to.be.eq(1);
    });
  });
  describe('DESC', () => {
    it('should return b - a', () => {
      expect(DESC(1, 2)).to.be.eq(1);
    });
  });
});
