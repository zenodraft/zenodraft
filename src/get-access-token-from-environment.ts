import * as dotenv from 'dotenv'


export const get_access_token_from_environment = (sandbox: boolean): string => {
    if (sandbox) {
        return dotenv.config().parsed!.ZENODO_SANDBOX_ACCESS_TOKEN
    } else {
        return dotenv.config().parsed!.ZENODO_ACCESS_TOKEN
    }
}
