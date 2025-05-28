import { defaults } from 'ts-jest/presets';

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    ...defaults.transform,
  },
};
