import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_create_in_new_collection } from '../../../src/deposition/create/in-new-collection'
import { helpers_get_access_token_from_environment } from '../../../src/helpers/get-access-token-from-environment'
import * as nock from 'nock'
import { define_token, define_reqheaders, get_mocked_data } from '../../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition create in-new-collection', () => {

    test('creates new depostion with id \'101\' in new collection', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const draft_id = '101'
        const reqheaders = define_reqheaders({token: access_token})
        const filename_mock = get_mocked_data(draft_id)
        const mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders })
            .post(`/deposit/depositions`)
            .times(1)
            .replyWithFile(200, filename_mock)
        const actual = await deposition_create_in_new_collection(access_token, sandbox)
        const expected = draft_id
        expect(actual).toEqual(expected)
    })
})
