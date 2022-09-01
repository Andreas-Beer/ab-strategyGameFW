/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

export default {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
