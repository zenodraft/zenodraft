import * as commander from 'commander'
import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import { deposition_delete } from '../../lib/deposition/delete'



export const deposition_delete_command = () => {
    return new commander.Command()
        .name('delete')
        .arguments('<id>')
        .description('delete draft deposition with id <id>', {
            id: 'deposition id'
        })
        .action(async (id, opts, self) => {
            const {sandbox, verbose} = self.parent.parent._optionValues
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await deposition_delete(access_token, sandbox, id, verbose)
            } catch (e) {
                console.error(e.message)
            }
        })
}
