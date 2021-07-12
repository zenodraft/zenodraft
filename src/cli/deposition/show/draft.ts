import { deposition_show_draft } from '../../../lib/deposition/show/draft'
import { helpers_get_access_token_from_environment } from '../../../lib/helpers/get-access-token-from-environment'
import * as commander from 'commander'



export const deposition_show_draft_command = () => {
    return new commander.Command()
        .name('draft')
        .arguments('<collection_id>')
        .description('get the draft deposition id of the collection with id <collection_id>', {
            collection_id: 'id of the collection for which we want to retrieve the draft id'
        })
        .action(async (collection_id, opts, self) => {
            const { sandbox, verbose } = self.parent.parent.parent._optionValues
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                const draft_id = await deposition_show_draft(access_token, sandbox, collection_id, verbose)
                console.log(draft_id)
            } catch (e) {
                console.log('')
                console.error(e.message)
            }

        })
}
