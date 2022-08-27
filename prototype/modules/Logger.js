function createTimestamp() {
  const date = new Date();
  const stamp = date.toLocaleString("de-DE", {
    timeZone: "UTC",
  });
  const ms = date.getUTCMilliseconds();
  return `[${stamp}:${ms}]`;
}

export default class Logger {
  log(...args) {
    console.log(createTimestamp(), ...args);
  }
}
