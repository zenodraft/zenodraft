import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_show_latest } from '../../../dist/index'
import * as nock from 'nock'
import { define_sandbox_token, define_reqheaders, mock_deposition } from '../../test-helpers'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show latest', () => {
    test(`shows latest draft id for depositions in collection with id ${concept_record_id}`, async () => {
        const mocked_data = mock_deposition({
            conceptrecid: concept_record_id,
            latest_draft: `https://sandbox.zenodo.org/api/records/${record_id}`
        })
        const sandbox = true
        nock('https://sandbox.zenodo.org/api', { reqheaders }).get(`/deposit/depositions/${record_id}`).reply(200, mocked_data).persist()
        const actual = await deposition_show_latest(sandbox, concept_record_id)
        const expected = record_id
        expect(actual).toEqual(expected)
    })
})


define_sandbox_token()
const concept_record_id = '123456'
const record_id = '123457'
const reqheaders = define_reqheaders()
