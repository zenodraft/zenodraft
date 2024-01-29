import * as fs from 'fs'



export const remove_tempdir = (temporary_directory: string) => {
    if (process.env.CI === 'true') {
        // leave the temporary directory on the file system to
        // avoid problems related to uv_cwd
    } else {
        fs.rmSync(temporary_directory, { recursive: true })
    }
}
