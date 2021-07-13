import { deposition_create_in_existing_collection } from '../../../lib/deposition/create/in-existing-collection'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import * as commander from 'commander'



export const deposition_create_in_existing_collection_command = () => {
    return new commander.Command()
        .name('in-existing-collection')
        .arguments('<collection_id>')
        .description('create a new draft deposition as a new version in an existing collection', {
            collection_id: 'id for the collection that the new deposition will be part of.'
        })
        .action(async (collection_id, opts, self) => {
            const {sandbox, verbose} = self.parent.parent.parent.opts()
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const id = await deposition_create_in_existing_collection(access_token, sandbox, collection_id, verbose)
                console.log(id)
            } catch (e) {
                console.error(e.message)
            }
        })
}
