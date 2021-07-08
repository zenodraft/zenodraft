import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_show_latest } from '../../../src/deposition/show/latest'
import { helpers_get_access_token_from_environment } from '../../../src/helpers/get-access-token-from-environment'
import * as nock from 'nock'
import { define_token, define_reqheaders, mock_deposition } from '../../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show latest', () => {

    test('shows latest draft id for depositions in collection with id \'123456\'.', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const concept_record_id = '123456'
        const record_id = '123457'
        const reqheaders = define_reqheaders()
        const mocked_data = mock_deposition({
            conceptrecid: concept_record_id,
            latest_draft: `https://sandbox.zenodo.org/api/records/${record_id}`
        })
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${record_id}`)
            .times(1)
            .reply(200, mocked_data)
        const actual = await deposition_show_latest(access_token, sandbox, concept_record_id)
        const expected = record_id
        expect(actual).toEqual(expected)
    })
})

