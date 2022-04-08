import { file_delete } from '../../lib/file/delete'
import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import * as commander from 'commander'



export const file_delete_command = () => {
    return new commander.Command()
        .name('delete')
        .arguments('<record_id> <remote_filename>')
        .description('delete a file with filename <remote_filename> from draft deposition with id <record_id>', {
            record_id: 'record id',
            remote_filename: 'filename of the deposition file that is going to be deleted.'
        })
        .action(async (record_id, remote_filename, opts, self) => {
            const { sandbox, verbose } = self.parent.parent.opts()
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await file_delete(access_token, sandbox, record_id, remote_filename, verbose)
            } catch (e) {
                console.error(e.message)
            }
        })
}
