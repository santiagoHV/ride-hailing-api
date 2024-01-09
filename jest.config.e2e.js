module.exports = {
    rootDir: 'test',
    testRegex: '.e2e-spec.ts$',
    coverageDirectory: '../coverage/e2e',
    coverageReporters: ['lcov', 'text'],
    setupFilesAfterEnv: ['./e2e/setup.ts'],
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/app/$1',
      },
    globals: {
        'ts-jest': {
            tsconfig: '<rootDir>/tsconfig.e2e.json',
        },
    },
}