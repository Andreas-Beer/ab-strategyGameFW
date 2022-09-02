const fromNullable = (x) => (x != null ? Right(x) : Left());
const maybeError = (msg?) => (x) => x ? Right(x) : Left(new Error(msg));
const identity = (x) => x;

const Right = <T extends any>(x: T) => ({
  chain: (f: Function) => f(x),
  map: (f: Function) => Right(f(x)),
  fold: (f?: Function, g?: Function) => g && g(x),
  toString: () => `Right(${x})`,
});

const Left = <T extends any>(x?: T) => ({
  chain: (f: Function) => Left(x),
  map: (f: Function) => Left(x),
  fold: (f: Function, g?: Function) => f(x),
  toString: () => `Left(${x})`,
});

const Id = <T extends any>(x: T) => ({
  map: (fn: Function) => Id(fn(x)),
  fold: (fn: Function) => fn(x),
  chain: (fn: Function) => fn(x),
  toString: () => `Id(${x})`,
});

const Err = <T extends Error, U extends any>(x: T) => ({
  get error() {
    return x;
  },

  map: (fn: (error: T) => U) => Err(x),
  fold: (fn: (val: T) => any) => fn(x),
  toString: () => `Err(${x})`,
});

const Maybe = <T extends any>(x: T) => ({
  get value() {
    return x;
  },

  map: (fn: (val: T) => any) => {
    const result = fn(x);
    if (result instanceof Error) {
      return Err(result);
    }
    return Maybe(result);
  },

  fold: (fn: (val: T) => any) => fn(x),

  toString: () => `Maybe(${x})`,
});

export { Maybe, Left, Right, Err, maybeError, identity };
