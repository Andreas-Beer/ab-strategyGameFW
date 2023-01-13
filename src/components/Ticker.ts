import { Observable } from '../helpers/observer';

type TickerEvents = 'error' | 'tick';

const TICK_DURATION = 100;
const TICK_DRIFT_THRESHOLD = 100;
let lastTick = Date.now();
let gameDuration = 0;
let expected = Date.now() + TICK_DURATION;

class Ticker {
  private listeners: Record<TickerEvents, Observable> = {
    error: new Observable(),
    tick: new Observable(),
  };

  getTickDuration() {
    return TICK_DURATION;
  }

  constructor() {
    this.tick();
  }

  on(eventName: TickerEvents, eventHandler: (time: number) => void) {
    this.listeners[eventName].add(eventHandler);
  }

  private tick() {
    const now = Date.now();
    const duration = now - lastTick;
    const drift = now - expected; // the drift (positive for overshooting)
    const nextTick = Math.max(0, TICK_DURATION - drift);
    lastTick = now;

    this.listeners.tick.notify(gameDuration);

    if (drift > TICK_DURATION && drift - TICK_DURATION > TICK_DRIFT_THRESHOLD) {
      // something really bad happened. Maybe the browser (tab) was inactive?
      // possibly special handling to avoid futile "catch up" run
      console.log('Ticker.js - drift too high! - OH no !', { drift: drift });
      this.listeners.error.notify({ time: now, gameDuration, drift });
    }

    gameDuration += duration;
    expected += TICK_DURATION;

    setTimeout(() => this.tick(), nextTick);
  }
}

export { Ticker };