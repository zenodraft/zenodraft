import { deposition_show_draft } from '../../../lib/deposition/show/draft'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import { sandboxOption, verboseOption } from '../../../lib/helpers/options'
import { tokensHelpText } from '../../../lib/helpers/tokens-help-text'
import * as commander from 'commander'


export const deposition_show_draft_command = () => {
    return new commander.Command()
        .name('draft')
        .arguments('<concept_id>')
        .description('Get the draft deposition id of the concept with id <concept_id>.', {
            concept_id: 'id of the concept for which we want to retrieve the draft id if there is one'
        })
        .option(...sandboxOption)
        .option(...verboseOption)
        .action(async (concept_id, opts) => {
            const { sandbox, verbose } = opts
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const draft_id = await deposition_show_draft(access_token, sandbox, concept_id, verbose)
                console.log(draft_id)
            } catch (e) {
                console.log('')
                console.error(e.message)
                process.exit(-1)
            }
        })
        .addHelpText('after', tokensHelpText)
}
