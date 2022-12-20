export type Observer = Function;

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

class Observable {
  private observersList: Function[] = [];

  add(observer: Observer) {
    this.observersList = addObserver(this.observersList, observer);
  }
  remove(observer: Observer) {
    this.observersList = removeObserver(this.observersList, observer);
  }
  notify(data?: unknown) {
    notifyObservers(this.observersList, data);
  }
}

const _test = {
  addObserver,
  removeObserver,
  notifyObservers,
};

export { _test, Observable };
