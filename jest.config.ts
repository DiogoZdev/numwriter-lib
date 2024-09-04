import type {Config} from 'jest';

const config: Config = {
  verbose: true, transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

export default config;