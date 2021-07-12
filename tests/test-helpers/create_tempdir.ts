import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'



export const create_tempdir = () => {
    if (process.env.CI === 'true') {
        // RUNNER_TEMP: The path to a temporary directory on the runner. This
        // directory is emptied at the beginning and end of each job. Note
        // that files will not be removed if the runner's user account does
        // not have permission to delete them.
        //
        // From: https://docs.github.com/en/actions/reference/environment-variables
        return fs.mkdtempSync(`${process.env.RUNNER_TEMP}${path.sep}zenodraft-testing.`)
    } else {
        return fs.mkdtempSync(`${os.tmpdir()}${path.sep}zenodraft-testing.`)
    }
}
