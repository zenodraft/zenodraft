import { test, expect } from '@jest/globals'
import { helpers_get_access_token_from_environment } from '../../../src/lib//helpers/get-access-token-from-environment'
import { define_token, create_tempdir, remove_tempdir } from '../../test-helpers'
import * as fs from 'fs'



let temporary_directory: string

afterEach(() => {
    remove_tempdir(temporary_directory)
})


beforeEach( async () => {
    temporary_directory = create_tempdir()
    process.chdir(temporary_directory)
})


describe('zenodo sandbox access token tests', () => {

    const sandbox = true

    test('should throw if zenodo sandbox access token can\'t be determined', () => {
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
        const token = 'faux_zenodo_sandbox_token'
        fs.writeFileSync('.env', `ZENODO_SANDBOX_ACCESS_TOKEN=${token}`, 'utf8')
        const actual = helpers_get_access_token_from_environment(sandbox)
        const expected = token
        expect(actual).toBe(expected)
    })

    test('should return zenodo sandbox access token from environment variable', () => {
        const token = 'faux_zenodo_sandbox_token'
        define_token(sandbox, token)
        const actual = helpers_get_access_token_from_environment(sandbox)
        const expected = token
        expect(actual).toBe(expected)
    })

})


describe('zenodo access token tests', () => {

    const sandbox = false

    test('should throw if zenodo access token can\'t be determined', () => {

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
        const token = 'faux_zenodo_token'
        fs.writeFileSync('.env', `ZENODO_ACCESS_TOKEN=${token}`, 'utf8')
        const actual = helpers_get_access_token_from_environment(sandbox)
        const expected = token
        expect(actual).toBe(expected)
    })


    test('should return zenodo access token from environment variable', () => {
        const token = 'faux_zenodo_token'
        define_token(sandbox, token)
        const actual = helpers_get_access_token_from_environment(sandbox)
        const expected = token
        expect(actual).toBe(expected)
    })

})
