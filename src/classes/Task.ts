class Task {
  constructor(private _durationMs: number, private _onFinish: Function) {}

  get durationMs() {
    return this._durationMs;
  }

  get onFinish() {
    return this._onFinish;
  }
}

export { Task };
