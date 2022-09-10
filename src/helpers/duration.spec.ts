import { expect } from 'chai';
import { convertDurationIntoMs } from './duration';

const durationMsMap = {
  'weeks (w)': ['1w', 6.048e8],
  'days (d)': ['1d', 8.64e7],
  'hours (h)': ['1h', 3.6e6],
  'minutes (min)': ['1min', 60000],
  'seconds (s)': ['1s', 1000],
  'milliseconds (ms)': ['1ms', 1],
  'a number': [1, 1],
};

describe('helpers/duration.ts', () => {
  for (const [itMsg, [duration, expectedMs]] of Object.entries(durationMsMap)) {
    it(`should convert ${itMsg}`, () => {
      expect(convertDurationIntoMs(duration)).to.be.eq(expectedMs);
    });
  }
  it(`should throw an error if the argument has an unknown suffix`, () => {
    expect(() => convertDurationIntoMs('1fooo')).to.throw(Error);
  });
  it(`should throw an error if the argument is not a string or a number`, () => {
    expect(() => convertDurationIntoMs([])).to.throw(Error);
  });
});
