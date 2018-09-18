module.exports = {
    automock: false,
    coverageDirectory: './coverage',
    coverageReporters: ['text', 'json', 'lcov'],
    rootDir: './src',
    setupFiles: ['../config/setupTests.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    watchman: false,
};
