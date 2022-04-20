import { file_delete } from '../../lib/file/delete'
import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import { sandboxOption, verboseOption } from '../../lib/helpers/options'
import { tokensHelpText } from '../../lib/helpers/tokens-help-text'
import * as commander from 'commander'


export const file_delete_command = () => {
    return new commander.Command()
        .name('delete')
        .arguments('<version_id> <remote_filename>')
        .description('delete a file with filename <remote_filename> from draft deposition with id <version_id>', {
            version_id: 'version id',
            remote_filename: 'filename of the deposition file that is going to be deleted.'
        })
        .option(...sandboxOption)
        .option(...verboseOption)
        .action(async (version_id, remote_filename, opts) => {
            const { sandbox, verbose } = opts
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await file_delete(access_token, sandbox, version_id, remote_filename, verbose)
            } catch (e) {
                console.error(e.message)
            }
        })
        .addHelpText('after', tokensHelpText)

}
