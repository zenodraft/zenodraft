import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { define_token, get_mocked_data } from '../../../test-helpers'
import { deposition_show_details } from '../../../../src/lib/deposition/show/details'
import { helpers_get_access_token_from_environment } from '../../../../src/lib/helpers/get-access-token-from-environment'
import * as nock from 'nock'



const sandbox = true
define_token(sandbox, 'faux_zenodo_sandbox_token')
const access_token = helpers_get_access_token_from_environment(sandbox)
const reqheaders = {
    'Authorization': `Bearer ${access_token}`,
    'Content-Type': 'application/json'
}


afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show details with expected type \'deposition\' for mock concept 100', () => {

    const concept_id = '100'
    const draft_id = '101'
    const filename_mock = get_mocked_data(draft_id)

    test('should throw because id uses invalid format', async () => {
        const throwfun = async () => {
            await deposition_show_details(access_token, sandbox, 'mumbojumbo123')
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
            await deposition_show_details(access_token, sandbox, id)
        }
        await expect(throwfun).rejects.toThrow()
        try {
            await throwfun()
        } catch (e) {
            expect(e.message).toBe("(errid 8) Something went wrong on GET to https://sandbox.zenodo.org/api/deposit/depositions/999: 404 - Not Found")
        }
    })

    test(`should throw because record is not a version`, async () => {
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${concept_id}`)
            .times(2)
            .reply(404)
        const throwfun = async () => {
            await deposition_show_details(access_token, sandbox, concept_id)
        }
        await expect(throwfun).rejects.toThrow()
        try {
            await throwfun()
        } catch (e) {
            expect(e.message).toBe("(errid 8) Something went wrong on GET to https://sandbox.zenodo.org/api/deposit/depositions/100: 404 - Not Found")
        }
    })

    test('should return deposition details for draft_id', async () => {
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${draft_id}`)
            .times(1)
            .replyWithFile(200, filename_mock)
        const actual = (await deposition_show_details(access_token, sandbox, draft_id)).record_id.toString()
        const expected = draft_id
        expect(actual).toBe(expected)
    })

})
