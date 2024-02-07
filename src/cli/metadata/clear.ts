import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import { metadata_update } from '../../lib/metadata/update'
import { sandboxOption, verboseOption } from '../../lib/helpers/options'
import { tokensHelpText } from '../../lib/helpers/tokens-help-text'
import * as commander from 'commander'



export const metadata_clear_command = () => {
    return new commander.Command()
        .name('clear')
        .arguments('<version_id>')
        .description('clear the metadata of an existing deposition with id <version_id>', {
            version_id: 'id of the deposition whose metadata you want to clear'
        })
        .option(...sandboxOption)
        .option(...verboseOption)
        .action(async (version_id, opts) => {
            const { sandbox, verbose } = opts
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await metadata_update(access_token, sandbox, version_id, undefined, verbose)
            } catch (e) {
                console.error(e.message)
                process.exit(-1)
            }
        })
        .addHelpText('after', tokensHelpText)

}
