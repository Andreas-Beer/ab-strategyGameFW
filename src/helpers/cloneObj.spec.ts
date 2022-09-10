import { expect } from 'chai';
import { cloneObj } from './cloneObj';

describe('helpers/cloneObj.ts', () => {
  it('should deep clone an object', () => {
    const original = { a: { b: { c: 1 } } };
    const cloned = cloneObj(original);
    cloned.a.b.c = 42;
    expect(original.a.b.c).to.be.eq(1);
  });
});
