let id = 0;

type Observer = Function;

function addObserver(list: Observer[], cb: Observer) {
  if (typeof cb !== 'function') {
    throw new Error(`${cb} is not a function`);
  }
  return [...list, cb];
}

function removeObserver(list: Observer[], cb: Observer) {
  return list.filter((fn) => fn !== cb);
}

function notifyObservers(list: Observer[], data?: unknown) {
  list.forEach((item) => item(data));
}

function createObservable() {}

const _test = {
  addObserver,
  removeObserver,
  notifyObservers,
};

export { _test, createObservable };
