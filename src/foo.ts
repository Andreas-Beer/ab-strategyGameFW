import { bar, foo } from "./mod";

export const foo1 = () => bar;

const foo2 = () => foo;

export default {
  foo2,
};

console.log("foo1", foo1());
console.log("foo2", foo2());
console.log("1 2 3");
