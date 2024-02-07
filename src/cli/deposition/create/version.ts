import { deposition_create_version } from '../../../lib/deposition/create/version'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import { sandboxOption, verboseOption } from '../../../lib/helpers/options'
import { tokensHelpText } from '../../../lib/helpers/tokens-help-text'
import * as commander from 'commander'


export const deposition_create_version_command = () => {
    return new commander.Command()
        .name('version')
        .arguments('<concept_id>')
        .description('create a new draft deposition as a new version in an existing concept', {
            concept_id: 'id for the concept that the new deposition will be part of.'
        })
        .option(...sandboxOption)
        .option(...verboseOption)
        .action(async (concept_id, opts) => {
            const {sandbox, verbose} = opts
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const id = await deposition_create_version(access_token, sandbox, concept_id, verbose)
                console.log(id)
            } catch (e) {
                console.error(e.message)
                process.exit(-1)
            }
        })
        .addHelpText('after', tokensHelpText)
}
