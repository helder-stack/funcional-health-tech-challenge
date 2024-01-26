module.exports = {
    testEnviroment: "node",
    coverageProvider: "v8",
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.service.ts'], 
    coverageReporters: ['lcov', 'text', 'html'],
  };