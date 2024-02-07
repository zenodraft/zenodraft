import * as fs from 'fs'
import * as path from 'path'
import Ajv from 'ajv'
import addFormats from 'ajv-formats'


const load_metadata = (filename: string, add_minimal: boolean): object => {
    const user_metadata = JSON.parse(fs.readFileSync(filename, 'utf8'))
    const minimal_metadata_filename = path.join(__dirname, '..', '..', '..', 'assets', '.zenodo.json.empty')
    const minimal_metadata = JSON.parse(fs.readFileSync(minimal_metadata_filename, 'utf8'))
    return add_minimal === true ? {...minimal_metadata, ...user_metadata} : user_metadata
}

const load_schema = (): object => {
    const filename = path.join(__dirname, '..', '..', '..', 'assets', 'schema.json')
    return JSON.parse(fs.readFileSync(filename, 'utf8'))
}


export const metadata_validate = (filename: string, add_minimal: boolean = false, verbose = false): void => {
    const msg = `validating metadata from ${filename}...`
    if (verbose) {
        console.log(msg)
    }
    const ajv = new Ajv()
    addFormats(ajv)
    const schema = load_schema()
    const data = load_metadata(filename, add_minimal)
    const validate = ajv.compile(schema)
    const isvalid = validate(data)
    if (isvalid === false) {
        validate.errors.forEach(error => {
            console.log(error)
        })
        throw new Error('(errid 14) Validation error')
    }
    if (verbose) {
        console.log(`${msg}done`)
    }
}
