import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_create_in_existing_collection } from '../../../src/deposition/create/in-existing-collection'
import { helpers_get_access_token_from_environment } from '../../../src/helpers/get-access-token-from-environment'
import * as nock from 'nock'
import { define_token, define_reqheaders, get_mocked_data } from '../../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition create in-existing-collection', () => {

    test('creates new depostion with id \'152\' in existing mock collection 150', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const concept_record_id = '150'
        const latest_id = '151'
        const draft_id = '152'
        const reqheaders = define_reqheaders({token: access_token})
        const filename_mock_latest = get_mocked_data(latest_id)
        const filename_mock_draft = get_mocked_data(draft_id)
        // 152 doesnt contain the list of filesnames, hence we use 162
        const filename_mock_162 = get_mocked_data('162')
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
        mocked_server
            .get(`/deposit/depositions/${latest_id}`)
            .times(1)
            .replyWithFile(200, filename_mock_latest)
        mocked_server
            .post(`/deposit/depositions/${latest_id}/actions/newversion`)
            .times(1)
            .replyWithFile(200, filename_mock_draft)
        mocked_server
            .get(`/deposit/depositions/${draft_id}`)
            .times(3)
            .replyWithFile(200, filename_mock_162)
        mocked_server
            .delete('/files/6df0abbd-bf21-491a-aabd-ef0b4e367846/README.md')
            .times(1)
            .reply(200)
        mocked_server
            .put(`/deposit/depositions/${draft_id}`)
            .times(1)
            .replyWithFile(200, filename_mock_draft)
        const actual = await deposition_create_in_existing_collection(access_token, sandbox, concept_record_id)
        const expected = draft_id
        expect(actual).toEqual(expected)
    })
})
