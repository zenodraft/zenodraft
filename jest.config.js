module.exports = {
    globals: {
        'ts-jest': {
            diagnostics: {
                ignoreCodes: [ 'TS151001' ]
            }
        }
    },
    testMatch: [
        "**/tests/**/*.[jt]s"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
}