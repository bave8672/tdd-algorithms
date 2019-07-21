module.exports = {
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
    globals: {
        'ts-jest': {
            tsConfigFile: 'tsconfig.json',
        },
    },
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': './node_modules/ts-jest/preprocessor.js',
    },
    testMatch: ['**/*.spec.ts'],
    testEnvironment: 'node',
};
