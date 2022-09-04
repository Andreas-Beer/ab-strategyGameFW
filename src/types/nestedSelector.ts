type Numbers = number | 0 | 1 | 2 | 3 | 4 | 5;
type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;
type NestedSelector<T extends object> = T extends any[]
  ? `${Numbers}` | `${Numbers}.${NestedSelector<ArrayElement<T>>}`
  : {
      [K in keyof T & string]: T[K] extends object
        ? `${K}` | `${K}.${NestedSelector<T[K]>}`
        : `${K}`;
    }[keyof T & string];
