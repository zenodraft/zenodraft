import { deposition_show_latest } from '../../../lib/deposition/show/latest'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import * as commander from 'commander'



export const deposition_show_latest_command = () => {
    return new commander.Command()
        .name('latest')
        .arguments('<concept_id>')
        .description('get the deposition id of the latest version in the concept with id <concept_id>', {
            concept_id: 'id of the concept whose latest version id we want to retrieve'
        })
        .action(async (concept_id, opts, self) => {
            const { sandbox, verbose } = self.parent.parent.parent.opts()
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const latest_id = await deposition_show_latest(access_token, sandbox, concept_id, verbose)
                console.log(latest_id)
            } catch (e) {
                console.log('')
                console.error(e.message)
            }
        })
}
