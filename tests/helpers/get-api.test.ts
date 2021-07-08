import { test, expect } from '@jest/globals'
import { helpers_get_api } from '../../src/helpers/get-api'

describe('get-api tests', () => {
    test('should return zenodo sandbox api', () => {
        const sandbox = true
        const actual = helpers_get_api(sandbox)
        const expected = 'https://sandbox.zenodo.org/api'
        expect(actual).toBe(expected)
    })

    test('should return zenodo api', () => {
        const sandbox = false
        const actual = helpers_get_api(sandbox)
        const expected = 'https://zenodo.org/api'
        expect(actual).toBe(expected)
    })
    
})
