module.exports = {
    automock: false,
    coverageDirectory: './coverage',
    coverageReporters: ['text', 'json', 'lcov'],
    moduleNameMapper: {
      'babel-loader!react-live/src/components/Editor/Style': 'react-live/src/components/Editor/Style'
    },
    rootDir: './src',
    setupFiles: ['../config/setupTests.js'],
    snapshotSerializers: ['enzyme-to-json/serializer'],
    transformIgnorePatterns: [
        'node_modules/(?!react-live\/src\/(components\/Editor\/Style.js|constants/css.js))'
    ],
    watchman: false,
};
