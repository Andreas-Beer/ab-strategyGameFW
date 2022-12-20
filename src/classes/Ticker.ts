import { createObservable, Observable } from '../helpers/observer';

type TickerEvents = 'error' | 'tick';

const TICK_DURATION = 100;
const TICK_DRIFT_THRESHOLD = 100;
let lastTick = Date.now();
let gameDuration = 0;
let expected = Date.now() + TICK_DURATION;

function tick() {
  const now = Date.now();
  const duration = now - lastTick;
  const drift = now - expected; // the drift (positive for overshooting)
  const nextTick = Math.max(0, TICK_DURATION - drift);
  lastTick = now;

  console.log('tick!');

  if (drift > TICK_DURATION && drift - TICK_DURATION > TICK_DRIFT_THRESHOLD) {
    // something really bad happened. Maybe the browser (tab) was inactive?
    // possibly special handling to avoid futile "catch up" run
    console.log('Ticker.js - drift too high! - OH no !', { drift: drift });
    return;
  }

  gameDuration += duration;
  expected += TICK_DURATION;

  setTimeout(tick, nextTick);
}

class Ticker {
  private listeners: Record<TickerEvents, Observable[]> = {
    error: [],
    tick: [],
  };

  private observable = createObservable();

  constructor() {
    tick();
  }

  on(eventName: TickerEvents, eventHandler: (time: number) => void) {
    this.observable.add();
  }
}

export { Ticker };
