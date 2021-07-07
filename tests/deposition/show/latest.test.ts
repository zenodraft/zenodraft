import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { deposition_show_latest } from '../../../dist/index'
import * as nock from 'nock'
import { DepositionsResponse } from '../../../src/helpers/zenodo-response-types'

afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show latest', () => {
    test('shows latest draft id for depositions in collection with id 123456', async () => {
        const mocked_data: DepositionsResponse = {
            conceptrecid: concept_record_id,
            files: [
                {
                    filename: 'unused'
                }
            ],
            links: {
                bucket: 'unused',
                latest: 'unused',
                latest_draft: `https://sandbox.zenodo.org/api/records/${record_id}`
            },
            metadata: {
                prereserve_doi: {
                    doi: 'unused'
                }
            },
            record_id
        }
        const sandbox = true
        nock('https://sandbox.zenodo.org/api', { reqheaders }).get(`/deposit/depositions/${record_id}`).reply(200, mocked_data).persist()
        const actual = await zenodraft.deposition_show_latest(sandbox, concept_record_id)
        const expected = record_id
        expect(actual).toEqual(expected)
    })
})


if (process.env.ZENODO_SANDBOX_ACCESS_TOKEN === undefined) {
    process.env.ZENODO_SANDBOX_ACCESS_TOKEN = 'faux_zenodo_sandbox_token'
}
const concept_record_id = '123456'
const record_id = '123457'
const reqheaders = {
    'Authorization': `Bearer ${process.env.ZENODO_SANDBOX_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
}
