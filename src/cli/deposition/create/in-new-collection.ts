import { deposition_create_in_new_collection } from '../../../lib/deposition/create/in-new-collection'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import * as commander from 'commander'



export const deposition_create_in_new_collection_command = () => {
    return new commander.Command()
        .name('in-new-collection')
        .description('create a new draft deposition in a new collection')
        .action(async (opts, self) => {
            const { sandbox, verbose } = self.parent.parent.parent.opts()
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const id = await deposition_create_in_new_collection(access_token, sandbox, verbose)
                console.log(id)
            } catch (e) {
                console.error(e.message)
            }

        })
}
