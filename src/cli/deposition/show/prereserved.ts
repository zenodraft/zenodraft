import { deposition_show_prereserved } from '../../../lib/deposition/show/prereserved'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import { sandboxOption, verboseOption } from '../../../lib/helpers/options'
import { tokensHelpText } from '../../../lib/helpers/tokens-help-text'
import * as commander from 'commander'


export const deposition_show_prereserved_command = () => {
    return new commander.Command()
        .name('prereserved')
        .arguments('<version_id>')
        .description('get the prereserved doi of the draft deposition with id <version_id>', {
            version_id: 'id of the deposition whose prereserved doi we want to retrieve'
        })
        .option(...sandboxOption)
        .option(...verboseOption)
        .action(async (version_id, opts) => {
            const { sandbox, verbose } = opts
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const prereserved = await deposition_show_prereserved(access_token, sandbox, version_id, verbose)
                console.log(prereserved)
            } catch (e) {
                console.error(e.message)
            }
        })
        .addHelpText('after', tokensHelpText)
}
