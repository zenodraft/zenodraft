import { deposition_show_details } from '../../../lib/deposition/show/details'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import { sandboxOption, verboseOption } from '../../../lib/helpers/options'
import { tokensHelpText } from '../../../lib/helpers/tokens-help-text'
import * as commander from 'commander'


export const deposition_show_details_command = () => {
    return new commander.Command()
        .name('details')
        .arguments('<version_id>')
        .description('get details pertaining to deposition with id <version_id>', {
            version_id: 'id of the deposition that you want to show the details of'
        })
        .option(...sandboxOption)
        .option(...verboseOption)
        .action(async (version_id, opts) => {
            const { sandbox, verbose } = opts
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const details = await deposition_show_details(access_token, sandbox, version_id, verbose)
                console.log(JSON.stringify(details, null, 4))
            } catch (e) {
                console.error(e.message)
                process.exit(-1)
            }
        })
        .addHelpText('after', tokensHelpText)
}
