import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import { metadata_update } from '../../lib/metadata/update'
import { sandboxOption, verboseOption } from '../../lib/helpers/options'
import { tokensHelpText } from '../../lib/helpers/tokens-help-text'
import * as commander from 'commander'



export const metadata_update_command = () => {
    return new commander.Command()
        .name('update')
        .arguments('<version_id> <local_filename>')
        .description('update the metadata of an existing deposition with id <version_id> using the metadata from <local_filename>', {
            version_id: 'id of the deposition whose metadata you want to update',
            local_filename: 'filename of file holding the metadata in Zenodo metadata format'
        })
        .option(...sandboxOption)
        .option(...verboseOption)
        .action(async (version_id, local_filename, opts) => {
            const { sandbox, verbose } = opts
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await metadata_update(access_token, sandbox, version_id, local_filename, verbose)
            } catch (e) {
                console.error(e.message)
            }
        })
        .addHelpText('after', tokensHelpText)

}
