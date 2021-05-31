export default {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**.js'],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'jest-environment-node',
  transform: {}
}
