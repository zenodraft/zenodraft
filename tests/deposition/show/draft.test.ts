import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_show_draft } from '../../../src/deposition/show/draft'
import { helpers_get_access_token_from_environment } from '../../../src/helpers/get-access-token-from-environment'
import * as nock from 'nock'
import { define_token, get_mocked_data } from '../../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show draft', () => {

    test('shows draft id for depositions in collection with id \'100\'.', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const concept_record_id = '100'
        const draft_id = '101'
        const reqheaders = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
        const filename_mock = get_mocked_data(draft_id)
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${draft_id}`)
            .times(1)
            .replyWithFile(200, filename_mock)
        const actual = await deposition_show_draft(access_token, sandbox, concept_record_id)
        const expected = draft_id
        expect(actual).toEqual(expected)
    })

    test('shows draft id for depositions in collection with id \'150\'.', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const concept_record_id = '150'
        const latest_id = '151'
        const draft_id = '152'
        const reqheaders = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
        const mock_latest = get_mocked_data(latest_id)
        const mock_draft = get_mocked_data(draft_id)
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${latest_id}`)
            .times(1)
            .replyWithFile(200, mock_latest)
        mocked_server
            .get(`/deposit/depositions/${draft_id}`)
            .times(1)
            .replyWithFile(200, mock_draft)
        const actual = await deposition_show_draft(access_token, sandbox, concept_record_id)
        const expected = draft_id
        expect(actual).toEqual(expected)
    })

})
