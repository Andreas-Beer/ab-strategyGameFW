export function getData<T>(data: any, selector: NestedSelector<T>) {
  const firstDot = selector.indexOf('.');
  const nextSelector = selector.slice(0, firstDot);
  const restSelectors = selector.slice(firstDot + 1);
  if (firstDot === -1) {
    return data[restSelectors];
  }
  return getData(data[nextSelector], restSelectors as NestedSelector<T>);
}

export function setData<T>(
  data: any,
  selector: NestedSelector<T>,
  newValue: any,
) {
  const LastDot = selector.lastIndexOf('.');
  const firstSelectors = selector.slice(0, LastDot);
  const restSelector = selector.slice(LastDot + 1);
  const context =
    LastDot === -1 ? data : getData(data, firstSelectors as NestedSelector<T>);
  context[restSelector] = newValue;
}
