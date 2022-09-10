let id = 0;

function addObserver(list, observer: Function) {}
function removeObserver(list, observer: Function) {}
function notifyObservers(list) {}

function createObserverList() {}

const test = {
  addObserver,
  removeObserver,
  notifyObservers,
};

export { test };
