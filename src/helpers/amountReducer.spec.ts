import { expect } from 'chai';
import { amountReducer } from './amountReducer';

describe('helpers/amountReducer.ts', () => {
  it('should reduce the value in an adder', () => {
    const result = amountReducer('+2')(2);
    expect(result).to.be.be.equal(4);
  });

  it('should reduce the value in a substactor', () => {
    const result = amountReducer('-2')(4);
    expect(result).to.be.be.equal(2);
  });

  it('should reduce the value in a multiplicator', () => {
    const result = amountReducer('*2')(4);
    expect(result).to.be.be.equal(8);
  });

  it('should reduce the value in a divider', () => {
    const result = amountReducer('/2')(8);
    expect(result).to.be.be.equal(4);
  });

  it('should throw an error if the amount is not pareable', () => {
    const fn = () => amountReducer('?2')(8);
    expect(fn).to.throw(Error);
  });
});