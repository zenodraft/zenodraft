import { file_add } from '../../lib/file/add'
import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import * as commander from 'commander'



export const file_add_command = () => {
    return new commander.Command()
        .name('add')
        .arguments('<version_id> <local_filename>')
        .description('add a local file with filename <local_filename> to existing draft deposition with id <version_id>', {
            version_id: 'version id',
            local_filename: 'filename of the local file that is going to be added'
        })
        .action(async (version_id, local_filename, opts, self) => {
            const { sandbox, verbose } = self.parent.parent.opts()
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await file_add(access_token, sandbox, version_id, local_filename, verbose)
            } catch (e) {
                console.error(e.message)
            }
        })
}
