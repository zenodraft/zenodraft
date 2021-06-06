import * as dotenv from 'dotenv';
export var get_access_token_from_environment = function (sandbox) {
    if (sandbox) {
        var token = process.env.ZENODO_SANDBOX_ACCESS_TOKEN;
        if (token !== undefined) {
            return token;
        }
        else {
            try {
                return dotenv.config().parsed.ZENODO_SANDBOX_ACCESS_TOKEN;
            }
            catch (e) {
                throw new Error("Could not read ZENODO_SANDBOX_ACCESS_TOKEN from file named .env nor from environment variables. " + e);
            }
        }
    }
    else {
        var token = process.env.ZENODO_ACCESS_TOKEN;
        if (token !== undefined) {
            return token;
        }
        else {
            try {
                return dotenv.config().parsed.ZENODO_ACCESS_TOKEN;
            }
            catch (e) {
                throw new Error("Could not read ZENODO_ACCESS_TOKEN from file named .env nor from environment variables. " + e);
            }
        }
    }
};
//# sourceMappingURL=get-access-token-from-environment.js.map