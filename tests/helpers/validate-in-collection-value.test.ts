import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { helpers_validate_in_collection_value } from '../../dist/index'
import * as nock from 'nock'
import { DepositionsResponse } from '../../src/helpers/zenodo-response-types'

afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('helpers validate in collection value', () => {
    test('validates id 123456 is a collection id', async () => {
        const mocked_data: DepositionsResponse = {
            conceptrecid: concept_record_id,
            files: [
                {
                    filename: 'unused'
                }
            ],
            links: {
                bucket: 'unused',
                latest: 'unused'
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
        await zenodraft.helpers_validate_in_collection_value(sandbox, concept_record_id)
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
