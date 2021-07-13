import { deposition_show_details } from '../../../lib/deposition/show/details'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import * as commander from 'commander'



export const deposition_show_details_command = () => {
    return new commander.Command()
        .name('details')
        .arguments('<id>')
        .description('get details pertaining to deposition with id <id>', {
            id: 'deposition id'
        })
        .action(async (id, opts, self) => {
            const { sandbox, verbose } = self.parent.parent.parent.opts()
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const details = await deposition_show_details(access_token, sandbox, id, 'deposition', verbose)
                console.log(JSON.stringify(details, null, 4))
            } catch (e) {
                console.error(e.message)
            }

        })
}
