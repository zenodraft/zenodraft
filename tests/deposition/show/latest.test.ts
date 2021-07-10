import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_show_latest } from '../../../src/deposition/show/latest'
import { helpers_get_access_token_from_environment } from '../../../src/helpers/get-access-token-from-environment'
import * as nock from 'nock'
import { define_token, define_reqheaders, get_mocked_data } from '../../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show latest', () => {

    test('shows latest draft id for depositions in collection with id \'100\'.', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const concept_record_id = '100'
        const draft_id = '101'
        const reqheaders = define_reqheaders({json: true, token: access_token})
        const filename_mock = get_mocked_data(draft_id)
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${draft_id}`)
            .times(1)
            .replyWithFile(200, filename_mock)
        const actual = await deposition_show_latest(access_token, sandbox, concept_record_id)
        const expected = draft_id
        expect(actual).toEqual(expected)
    })
})
