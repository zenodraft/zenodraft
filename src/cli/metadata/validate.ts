import { metadata_validate } from '../../lib/metadata/validate'
import { verboseOption } from '../../lib/helpers/options'
import { tokensHelpText } from '../../lib/helpers/tokens-help-text'
import * as commander from 'commander'


export const metadata_validate_command = () => {
    return new commander.Command()
        .name('validate')
        .arguments('<local_filename>')
        .description('Validate the metadata from <local_filename>.', {
            local_filename: 'filename of file holding the metadata in Zenodo metadata format'
        })
        .option(...verboseOption)
        .action((local_filename, opts) => {
            const { verbose } = opts
            try {
                metadata_validate(local_filename, verbose)
            } catch (e) {
                console.error(e.message)
                process.exit(-1)
            }
        })
        .addHelpText('after', tokensHelpText)
}
