import { Duration } from '../types/time.types';
import { convertDurationIntoMs } from '../helpers/duration';
class Task {
  private _durationMs!: number;

  constructor(durationMs: Duration, private _onFinish: Function) {
    this._durationMs = convertDurationIntoMs(durationMs);
  }

  get durationMs() {
    return this._durationMs;
  }

  get onFinish() {
    return this._onFinish;
  }
}

export { Task };
