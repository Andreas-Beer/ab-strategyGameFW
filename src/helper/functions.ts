const findBy = (property: string) => (propertyValue: any) => (list: []) =>
  list.find((item) => item[property] === propertyValue);

const maybeError = (errMessage: string) => (mayBe?: any) =>
  mayBe ?? new Error(errMessage);

export { findBy, maybeError };
