import { deposition_create_concept } from '../../../lib/deposition/create/concept'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import * as commander from 'commander'



export const deposition_create_concept_command = () => {
    return new commander.Command()
        .name('concept')
        .description('create a new draft deposition in a new concept')
        .action(async (opts, self) => {
            const { sandbox, verbose } = self.parent.parent.parent.opts()
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const id = await deposition_create_concept(access_token, sandbox, verbose)
                console.log(id)
            } catch (e) {
                console.error(e.message)
            }

        })
}
