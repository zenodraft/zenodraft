import { afterAll, afterEach, beforeEach, describe, test } from '@jest/globals'
import { define_token, get_mocked_data, remove_tempdir, create_tempdir } from '../test-helpers'
import { file_add } from './../../src/file/add'
import { helpers_get_access_token_from_environment } from '../../src/helpers/get-access-token-from-environment'
import * as fs from 'fs'
import * as nock from 'nock'
import * as path from 'path'



afterAll(nock.restore)

afterEach(nock.cleanAll)

let temporary_directory: string

afterEach(() => {
    remove_tempdir(temporary_directory)
})


beforeEach( async () => {
    temporary_directory = create_tempdir()
    process.chdir(temporary_directory)
    const filename = path.join(temporary_directory, 'thefile.txt')
    fs.writeFileSync(filename, 'example file contents\n', 'utf8')
})


describe('deposition file add', () => {

    test('adds a file to deposition with id \'111\'.', async () => {
        const sandbox = true
        define_token(sandbox, 'faux_zenodo_sandbox_token')
        const access_token = helpers_get_access_token_from_environment(sandbox)
        const draft_id = '111'
        const with_file_id = '121'
        const reqheaders_get = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/json'
        }
        const reqheaders_put = {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'text/plain; charset=utf-8',
            'Content-Length': '22'
        }
        const draft_mock = get_mocked_data(draft_id)
        const with_file_mock = get_mocked_data(with_file_id)
        let mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders: reqheaders_get })
        mocked_server
            .get(`/deposit/depositions/${draft_id}`)
            .times(1)
            .replyWithFile(200, draft_mock)
        mocked_server = nock('https://sandbox.zenodo.org/api', { reqheaders: reqheaders_put })
            .put('/files/f8ca0657-db78-4b19-a50a-1b23125d4637/thefile.txt')
            .times(1)
            .replyWithFile(200, with_file_mock)
        await file_add(access_token, sandbox, draft_id, 'thefile.txt')
    })

})
