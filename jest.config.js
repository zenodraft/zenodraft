module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        // "src/cli/**/*.ts",
        "src/lib/**/*.ts"        
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
        "**/tests/cli/**/*.test.ts",
        "**/tests/lib/**/*.test.ts"        
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    verbose: true
}
