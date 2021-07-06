import { test, expect } from '@jest/globals'
import zenodraft from '../../dist/zenodraft'

describe('get-api tests', () => {
    test('should return zenodo sandbox api', () => {
        const sandbox = true
        const actual = zenodraft.helpers_get_api(sandbox)
        const expected = 'https://sandbox.zenodo.org/api'
        expect(actual).toBe(expected)
    })

    test('should return zenodo api', () => {
        const sandbox = false
        const actual = zenodraft.helpers_get_api(sandbox)
        const expected = 'https://zenodo.org/api'
        expect(actual).toBe(expected)
    })
    
})
