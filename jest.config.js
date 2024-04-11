module.exports = {
    collectCoverage: false,
    collectCoverageFrom: [
        "src/cli/**/*.ts",
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
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    verbose: true
}
