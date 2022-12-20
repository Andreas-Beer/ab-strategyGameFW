export function convertDurationIntoMs(duration: any) {
  if (typeof duration === 'number') {
    return duration;
  }

  if (typeof duration !== 'string') {
    throw Error('duration must be a string: ' + duration);
  }

  if (duration.endsWith('ms')) {
    return parseFloat(duration);
  }

  if (duration.endsWith('s')) {
    return parseFloat(duration) * 1000;
  }

  if (duration.endsWith('min')) {
    return parseFloat(duration) * 60 * 1000;
  }

  if (duration.endsWith('h')) {
    return parseFloat(duration) * 60 * 60 * 1000;
  }

  if (duration.endsWith('d')) {
    return parseFloat(duration) * 24 * 60 * 60 * 1000;
  }

  if (duration.endsWith('w')) {
    return parseFloat(duration) * 7 * 24 * 60 * 60 * 1000;
  }

  throw Error('unknown duration unit: ' + duration);
}
