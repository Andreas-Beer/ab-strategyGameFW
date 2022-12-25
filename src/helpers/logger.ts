export function formatTimestamp(number: number) {
  const time = new Date(number);
  const stamp = time.toLocaleString('de-DE', { timeZone: 'UTC' });
  const ms = time.getMilliseconds();
  return `[${stamp}:${ms}]`;
}

export function createTimestamp() {
  const date = Date.now();
  return formatTimestamp(date);
}

export const logger = {
  log(...args: any[]) {
    console.log(createTimestamp(), ...args);
  },
};
