import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { define_token, define_reqheaders, mock_deposition } from '../../test-helpers'
import { deposition_show_prereserved } from '../../../src/deposition/show/prereserved'
import { helpers_get_access_token_from_environment } from '../../../src/helpers/get-access-token-from-environment'
import * as nock from 'nock'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show prereserved', () => {

    test('shows prereserved doi for deposition with id \'123457\'', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const prereserved_doi = '10.5281/zenodo.123456'
        const record_id = '123457'
        const reqheaders = define_reqheaders()
        const mocked_data = mock_deposition({ prereserved_doi })
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${record_id}`)
            .times(1)
            .reply(200, mocked_data)
    
        const actual = await deposition_show_prereserved(access_token, sandbox, record_id)
        const expected = prereserved_doi
        expect(actual).toEqual(expected)
    })
})
