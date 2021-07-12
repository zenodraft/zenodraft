import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import { metadata_update } from '../../lib/metadata/update'
import * as commander from 'commander'



export const metadata_clear_command = () => {
    return new commander.Command()
        .name('clear')
        .arguments('<id>')
        .description('clear the metadata of an existing deposition with id <id>', {
            id: 'deposition id'
        })
        .action(async (id, opts, self) => {
            const { sandbox, verbose } = self.parent.parent._optionValues
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await metadata_update(access_token, sandbox, id, undefined, verbose)
            } catch (e) {
                console.error(e.message)
            }
        })
}
