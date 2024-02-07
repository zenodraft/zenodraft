import { deposition_create_concept } from '../../../lib/deposition/create/concept'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import { sandboxOption, verboseOption } from '../../../lib/helpers/options'
import { tokensHelpText } from '../../../lib/helpers/tokens-help-text'
import * as commander from 'commander'



export const deposition_create_concept_command = () => {
    return new commander.Command()
        .name('concept')
        .description('Create a new draft deposition in a new concept.')
        .option(...sandboxOption)
        .option(...verboseOption)
        .action(async (opts) => {
            const { sandbox, verbose } = opts
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const id = await deposition_create_concept(access_token, sandbox, verbose)
                console.log(id)
            } catch (e) {
                console.error(e.message)
                process.exit(-1)
            }

        })
        .addHelpText('after', tokensHelpText)
}
