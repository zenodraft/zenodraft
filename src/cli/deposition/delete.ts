import * as commander from 'commander'
import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import { deposition_delete } from '../../lib/deposition/delete'
import { sandboxOption, verboseOption } from '../../lib/helpers/options'
import { tokensHelpText } from '../../lib/helpers/tokens-help-text'


export const deposition_delete_command = () => {
    return new commander.Command()
        .name('delete')
        .arguments('<version_id>')
        .description('delete draft deposition with id <version_id>', {
            version_id: 'id of the draft deposition that you want to delete'
        })
        .option(...sandboxOption)
        .option(...verboseOption)
        .action(async (version_id, opts) => {
            const {sandbox, verbose} = opts
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await deposition_delete(access_token, sandbox, version_id, verbose)
            } catch (e) {
                console.error(e.message)
                process.exit(-1)
            }
        })
        .addHelpText('after', tokensHelpText)
}
