import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_show_details } from '../../../dist/index'
import * as nock from 'nock'
import { define_sandbox_token, define_reqheaders, mock_deposition } from '../../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show details', () => {
    test('shows details for deposition with id 123457', async () => {
        const sandbox = true
        nock('https://sandbox.zenodo.org/api', { reqheaders }).get(`/deposit/depositions/${record_id}`).reply(200, mocked_data)
        const details = await deposition_show_details(sandbox, record_id)
        expect(details.conceptrecid).toEqual(concept_record_id)
    })
})


define_sandbox_token()
const concept_record_id = '123456'
const record_id = '123457'
const mocked_data = mock_deposition({conceptrecid: concept_record_id})
const reqheaders = define_reqheaders()
