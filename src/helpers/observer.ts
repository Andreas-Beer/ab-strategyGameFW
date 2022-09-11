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

function createObservable() {
  let observersList: Observer[] = [];

  return {
    add: (observer: Observer) => {
      observersList = addObserver(observersList, observer);
    },
    remove: (observer: Observer) => {
      observersList = removeObserver(observersList, observer);
    },
    notify: (data?: unknown) => {
      notifyObservers(observersList, data);
    },
  };
}

const _test = {
  addObserver,
  removeObserver,
  notifyObservers,
};

export { _test, createObservable };
