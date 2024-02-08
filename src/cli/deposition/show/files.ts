import { deposition_show_files } from '../../../lib/deposition/show/files'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import { sandboxOption, verboseOption } from '../../../lib/helpers/options'
import { tokensHelpText } from '../../../lib/helpers/tokens-help-text'
import * as commander from 'commander'
import * as os from 'os'



export const deposition_show_files_command = () => {
    return new commander.Command()
        .name('files')
        .arguments('<version_id>')
        .description('Get the filenames for the files in deposition with id <version_id>.', {
            version_id: 'id of the deposition for which we want to retrieve the list of filenames'
        })
        .option(...sandboxOption)
        .option(...verboseOption)
        .action(async (version_id, opts) => {
            const {sandbox, verbose} = opts
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const filenames = await deposition_show_files(access_token, sandbox, version_id, verbose)
                console.log(filenames.join(os.EOL))
            } catch (e) {
                console.error(e.message)
                process.exit(-1)
            }

        })
        .addHelpText('after', tokensHelpText)
}
