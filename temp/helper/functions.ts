const findBy = (property: string) => (propertyValue: any) => (list: any[]) =>
  list.find((item) => item[property] === propertyValue);

const maybeError = (error: Error) => (mayBe?: any) => mayBe ? mayBe : error;

const log =
  (id: string = "") =>
  (val: any) => (console.log(`[LOG ${id}] ------- `, val), val);

export { findBy, maybeError, log };
