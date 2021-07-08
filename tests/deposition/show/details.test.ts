import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { define_token, define_reqheaders, mock_deposition } from '../../test-helpers'
import { deposition_show_details } from '../../../src/deposition/show/details'
import { helpers_get_access_token_from_environment } from '../../../src/helpers/get-access-token-from-environment'
import * as nock from 'nock'

const sandbox = true
define_token(sandbox, 'faux_zenodo_sandbox_token')
const access_token = helpers_get_access_token_from_environment(sandbox)
const concept_record_id = '123456'
const record_id = '123457'
const reqheaders = define_reqheaders()
const mocked_data = mock_deposition({
    conceptrecid: concept_record_id,
    record_id
})


afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show details with expected type \'deposition\'', () => {

    test('should throw because id uses invalid format', async () => {
        const throwfun = async () => {
            await deposition_show_details(access_token, sandbox, 'mumbojumbo123', 'deposition')
        }
        await expect(throwfun).rejects.toThrow()
        try {
            await throwfun()
        } catch (e) {
            expect(e.message).toBe('id has invalid format.')
        }
    })

    test('should throw because id can\'t be resolved', async () => {
        const id = '999'
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${id}`)
            .times(2)
            .reply(404)
        const throwfun = async () => {
            await deposition_show_details(access_token, sandbox, id, 'deposition')
        }
        await expect(throwfun).rejects.toThrow()
        try {
            await throwfun()
        } catch (e) {
            expect(e.message).toBe(`Response was 404 - Not Found`)
        }
    })

    test(`should throw because record is not a deposition`, async () => {
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${concept_record_id}`)
            .times(2)
            .reply(404)
        const throwfun = async () => {
            await deposition_show_details(access_token, sandbox, concept_record_id, 'deposition')
        }
        await expect(throwfun).rejects.toThrow()
        try {
            await throwfun()
        } catch (e) {
            expect(e.message).toBe('Response was 404 - Not Found')
        }
    })

    test('should return deposition details for record_id', async () => {
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${record_id}`)
            .times(1)
            .reply(200, mocked_data)
        const actual = (await deposition_show_details(access_token, sandbox, record_id, 'deposition')).record_id
        const expected = record_id
        expect(actual).toBe(expected)
    })

})



describe('deposition show details with expected type \'collection\'', () => {

    test('should throw because id uses invalid format', async () => {
        const throwfun = async () => {
            await deposition_show_details(access_token, sandbox, 'mumbojumbo123', 'collection')
        }
        await expect(throwfun).rejects.toThrow()
        try {
            await throwfun()
        } catch (e) {
            expect(e.message).toBe('id has invalid format.')
        }
    })

    test('should throw because id can\'t be resolved', async () => {
        const id = '999'
        const id_next = (parseInt(id) + 1).toString()
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${id_next}`)
            .times(2)
            .reply(404)
        const throwfun = async () => {
            await deposition_show_details(access_token, sandbox, id, 'collection')
        }
        await expect(throwfun).rejects.toThrow()
        try {
            await throwfun()
        } catch (e) {
            expect(e.message).toBe(`Response was 404 - Not Found`)
        }
    })

    test(`should throw because record is not a collection`, async () => {
        const id_next = (parseInt(record_id) + 1).toString()
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${id_next}`)
            .times(2)
            .reply(404)
        const throwfun = async () => {
            await deposition_show_details(access_token, sandbox, record_id, 'collection')
        }
        await expect(throwfun).rejects.toThrow()
        try {
            await throwfun()
        } catch (e) {
            expect(e.message).toBe('Response was 404 - Not Found')
        }
    })


    test('should return deposition details for the deposition immediately following the collection record', async () => {
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${record_id}`)
            .times(1)
            .reply(200, mocked_data)
        const actual = (await deposition_show_details(access_token, sandbox, concept_record_id, 'collection')).record_id
        const expected = record_id
        expect(actual).toBe(expected)
    })
})
