import { expect } from 'chai';
import { clamp } from './clamp';

console.clear();

describe.only('helpers/clamp.ts', () => {
  it('should return the original value if no max or min is passed', () => {
    expect(clamp(50)).to.be.eq(50);
    expect(clamp(-10)).to.be.eq(-10);
  });

  it('should clamp the value to the max value', () => {
    expect(clamp(100, { max: 90 })).to.be.eq(90);
    expect(clamp(10, { max: 0 })).to.be.eq(0);
    expect(clamp(0, { max: -10 })).to.be.eq(-10);
  });

  it('should clamp the value to the min value', () => {
    expect(clamp(-100, { min: 0 })).to.be.eq(0);
    expect(clamp(-100, { min: -10 })).to.be.eq(-10);
  });

  it('should clamp the value to the min and max value', () => {
    expect(clamp(100, { max: 90, min: 0 })).to.be.eq(90);
    expect(clamp(10, { max: 0, min: -10 })).to.be.eq(0);
    expect(clamp(0, { max: -10, min: -20 })).to.be.eq(-10);
    expect(clamp(-100, { min: 0, max: 100 })).to.be.eq(0);
    expect(clamp(-100, { min: -10, max: 100 })).to.be.eq(-10);
  });
});
