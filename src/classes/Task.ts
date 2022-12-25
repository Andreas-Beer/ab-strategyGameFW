import { Duration } from '../types/time.types';
import { convertDurationIntoMs } from '../helpers/duration';
class Task {
  private _durationMs!: number;

  constructor(durationMs: Duration, private _onFinish: Function) {
    const now = Date.now();
    const durationInMs = convertDurationIntoMs(durationMs);
    this._durationMs = now + durationInMs;
  }

  get durationMs() {
    return this._durationMs;
  }

  get onFinish() {
    return this._onFinish;
  }
}

export { Task };
