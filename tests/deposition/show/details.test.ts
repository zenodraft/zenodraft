import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_show_details, helpers_get_access_token_from_environment } from '../../../dist/index'
import * as nock from 'nock'
import { define_token, define_reqheaders, mock_deposition } from '../../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show details', () => {
    test('shows details for deposition with id 123457', async () => {

        nock('https://sandbox.zenodo.org/api', { reqheaders }).get(`/deposit/depositions/${record_id}`).reply(200, mocked_data)
        const details = await deposition_show_details(access_token, sandbox, record_id)
        expect(details.conceptrecid).toEqual(concept_record_id)
    })
})

const sandbox = true
define_token(sandbox, 'faux_zenodo_sandbox_token')
const access_token = helpers_get_access_token_from_environment(sandbox)
const concept_record_id = '123456'
const record_id = '123457'
const mocked_data = mock_deposition({conceptrecid: concept_record_id})
const reqheaders = define_reqheaders()
