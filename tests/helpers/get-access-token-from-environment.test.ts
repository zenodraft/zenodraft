import { test, expect } from '@jest/globals'
import { helpers_get_access_token_from_environment } from '../../dist/index'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { define_sandbox_token, define_token } from '../test-helpers'



let temporary_directory: string

afterEach(() => {
    fs.rmdirSync(temporary_directory, { recursive: true })
})


beforeEach(() => {
    temporary_directory = fs.mkdtempSync(`${os.tmpdir()}${path.sep}zenodraft-testing.`)
    process.chdir(temporary_directory)
})



describe('zenodo sandbox access token tests', () => {

    test('should throw if zenodo sandbox access token can\'t be determined', () => {
        const sandbox = true
        const throwfun = () => {
            helpers_get_access_token_from_environment(sandbox)
        }
        expect(throwfun).toThrow()
        try {
            throwfun()
        } catch (e) {
            expect(e.message).toBe('Could not read ZENODO_SANDBOX_ACCESS_TOKEN from file named .env nor from environment variables.')
        }
    })

    test('should return zenodo sandbox access token from env file', () => {
        fs.writeFileSync('.env', 'ZENODO_SANDBOX_ACCESS_TOKEN=faux_zenodo_sandbox_token', 'utf8')
        const sandbox = true
        const actual = helpers_get_access_token_from_environment(sandbox)
        const expected = 'faux_zenodo_sandbox_token'
        expect(actual).toBe(expected)
    })

    test('should return zenodo sandbox access token from environment variable', () => {
        const sandbox = true
        define_sandbox_token()
        const actual = helpers_get_access_token_from_environment(sandbox)
        const expected = 'faux_zenodo_sandbox_token'
        expect(actual).toBe(expected)
    })

})


describe('zenodo access token tests', () => {

    test('should throw if zenodo access token can\'t be determined', () => {
        const sandbox = false
        const throwfun = () => {
            helpers_get_access_token_from_environment(sandbox)
        }
        expect(throwfun).toThrow()
        try {
            throwfun()
        } catch (e) {
            expect(e.message).toEqual('Could not read ZENODO_ACCESS_TOKEN from file named .env nor from environment variables.')
        }
    })


    test('should return zenodo access token from env file', () => {
        fs.writeFileSync('.env', 'ZENODO_ACCESS_TOKEN=faux_zenodo_token', 'utf8')
        const sandbox = false
        const actual = helpers_get_access_token_from_environment(sandbox)
        const expected = 'faux_zenodo_token'
        expect(actual).toBe(expected)
    })


    test('should return zenodo access token from environment variable', () => {
        const sandbox = false
        define_token()
        const actual = helpers_get_access_token_from_environment(sandbox)
        const expected = 'faux_zenodo_token'
        expect(actual).toBe(expected)
    })

})
