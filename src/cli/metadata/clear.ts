import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import { metadata_update } from '../../lib/metadata/update'
import * as commander from 'commander'



export const metadata_clear_command = () => {
    return new commander.Command()
        .name('clear')
        .arguments('<record_id>')
        .description('clear the metadata of an existing deposition with id <record_id>', {
            record_id: 'record id'
        })
        .action(async (record_id, opts, self) => {
            const { sandbox, verbose } = self.parent.parent.opts()
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await metadata_update(access_token, sandbox, record_id, undefined, verbose)
            } catch (e) {
                console.error(e.message)
            }
        })
}
