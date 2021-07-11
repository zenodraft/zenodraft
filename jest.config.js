module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        "src/**/*.ts"
    ],
    coverageReporters: ["text", "html", "lcov"],
    globals: {
        'ts-jest': {
            diagnostics: {
                ignoreCodes: [ 'TS151001' ]
            }
        }
    },
    testMatch: [
        "**/tests/**/*.test.ts"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    verbose: true
}
