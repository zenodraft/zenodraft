import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { define_sandbox_token, define_reqheaders, mock_deposition } from '../test-helpers'
import { helpers_get_record_type } from '../../dist/index'
import * as nock from 'nock'


describe('helpers_get_record_type tests', () => {

    define_sandbox_token()
    const concept_record_id = '123456'
    const record_id = '123457'
    const reqheaders = define_reqheaders()
    const sandbox = true
    const mocked_data = mock_deposition({
        conceptrecid: concept_record_id
    })
    nock('https://sandbox.zenodo.org/api', { reqheaders }).get(`/deposit/depositions/${concept_record_id}`).reply(404, {}).persist()
    nock('https://sandbox.zenodo.org/api', { reqheaders }).get(`/deposit/depositions/${record_id}`).reply(200, mocked_data).persist()

    test('should throw because id uses invalid format', async () => {

        const throwfun = async () => {
            await helpers_get_record_type(sandbox, 'mumbojumbo123')
        }
        await expect(throwfun).rejects.toThrow()
        try {
            await throwfun()
        } catch (e) {
            expect(e.message).toBe('Deposition id has invalid format.')
        }
    })

    test('should throw because id can\'t be resolved', async () => {
        const id = '999'
        const throwfun = async () => {
            await helpers_get_record_type(sandbox, id)
        }
        await expect(throwfun).rejects.toThrow()
        try {
            await throwfun()
        } catch (e) {
            expect(e.message).toBe(`Can\'t determine record type of id ${id}.`)
        }
    })

    test('should return \'collection\'', async () => {
        const actual = await helpers_get_record_type(sandbox, concept_record_id)
        const expected = 'collection'
        expect(actual).toBe(expected)
    })

    test('should return \'deposition\'', async () => {
        const actual = await helpers_get_record_type(sandbox, record_id)
        const expected = 'deposition'
        expect(actual).toBe(expected)
    })

})
