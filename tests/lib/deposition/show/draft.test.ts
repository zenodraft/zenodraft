import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_show_draft } from '../../../../src/lib/deposition/show/draft'
import { helpers_get_access_token_from_environment } from '../../../../src/lib/helpers/get-access-token-from-environment'
import * as nock from 'nock'
import { define_token, get_mocked_data } from '../../../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show draft', () => {

    test('shows draft id for depositions in concept with id \'100\'.', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const concept_id = '100'
        const draft_id = '151'
        const reqheaders = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
        const mock_depositions = get_mocked_data('depositions')
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get('/deposit/depositions')
            .times(1)
            .replyWithFile(200, mock_depositions)
        const actual = await deposition_show_draft(access_token, sandbox, concept_id)
        const expected = draft_id
        expect(actual).toEqual(expected)
    })

})
