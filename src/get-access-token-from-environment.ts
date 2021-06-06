import * as dotenv from 'dotenv'


export const get_access_token_from_environment = (): string => {
    return dotenv.config().parsed!.ZENODO_SANDBOX_ACCESS_TOKEN
}
