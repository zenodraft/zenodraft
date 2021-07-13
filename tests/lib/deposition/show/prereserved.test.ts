import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { define_token, get_mocked_data } from '../../../test-helpers'
import { deposition_show_prereserved } from '../../../../src/lib/deposition/show/prereserved'
import { helpers_get_access_token_from_environment } from '../../../../src/lib/helpers/get-access-token-from-environment'
import * as nock from 'nock'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show prereserved', () => {

    test('shows prereserved doi for deposition with id \'101\'', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const draft_id = '101'
        const prereserved_doi = `10.5072/zenodo.${draft_id}`
        const reqheaders = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
        const filename_mock = get_mocked_data(draft_id)
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${draft_id}`)
            .times(1)
            .replyWithFile(200, filename_mock)
        const actual = await deposition_show_prereserved(access_token, sandbox, draft_id)
        const expected = prereserved_doi
        expect(actual).toEqual(expected)
    })
})
