import { helpers_get_access_token_from_environment } from '../../lib/helpers/get-access-token-from-environment'
import { metadata_update } from '../../lib/metadata/update'
import * as commander from 'commander'



export const metadata_update_command = () => {
    return new commander.Command()
        .name('update')
        .arguments('<version_id> <local_filename>')
        .description('update the metadata of an existing deposition with id <version_id> using the metadata from <local_filename>', {
            version_id: 'version id',
            local_filename: 'filename of file holding the metadata in Zenodo metadata format'
        })
        .action(async (version_id, local_filename, opts, self) => {
            const { sandbox, verbose } = self.parent.parent.opts()
            try {
                const access_token = helpers_get_access_token_from_environment(sandbox)
                await metadata_update(access_token, sandbox, version_id, local_filename, verbose)
            } catch (e) {
                console.error(e.message)
            }
        })
}
