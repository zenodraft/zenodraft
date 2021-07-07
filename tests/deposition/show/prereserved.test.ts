import { afterAll, afterEach, describe, test, expect } from '@jest/globals'
import { define_sandbox_token, define_reqheaders } from '../../test-helpers'
import { deposition_show_prereserved } from '../../../dist/index'
import { mock_deposition } from '../../test-helpers/mock_deposition'
import * as nock from 'nock'



afterAll(nock.restore)

afterEach(nock.cleanAll)

describe('deposition show prereserved', () => {

    define_sandbox_token()
    const prereserved_doi = '10.5281/zenodo.123456'
    const record_id = '123457'
    const reqheaders = define_reqheaders()
    const mocked_data = mock_deposition({ prereserved_doi })
    const sandbox = true
    nock('https://sandbox.zenodo.org/api', { reqheaders }).get(`/deposit/depositions/${record_id}`).reply(200, mocked_data).persist()

    test(`shows prereserved doi for deposition with id ${record_id}`, async () => {
        const actual = await deposition_show_prereserved(sandbox, record_id)
        const expected = prereserved_doi
        expect(actual).toEqual(expected)
    })
})
