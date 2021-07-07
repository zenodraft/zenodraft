module.exports = {
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
