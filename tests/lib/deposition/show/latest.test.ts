import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_show_latest } from '../../../../src/lib/deposition/show/latest'
import { helpers_get_access_token_from_environment } from '../../../../src/lib/helpers/get-access-token-from-environment'
import * as nock from 'nock'
import { define_token, get_mocked_data } from '../../../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show latest', () => {

    test('shows latest id for depositions in concept with id \'150\'.', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const concept_id = '150'
        const latest_id = '151'
        const reqheaders = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
        const filename_mock = get_mocked_data(latest_id)
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .get(`/deposit/depositions/${latest_id}`)
            .times(1)
            .replyWithFile(200, filename_mock)
        const actual = await deposition_show_latest(access_token, sandbox, concept_id)
        const expected = latest_id
        expect(actual).toEqual(expected)
    })
})
