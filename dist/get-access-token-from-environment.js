import * as dotenv from 'dotenv';
export var get_access_token_from_environment = function (sandbox) {
    if (sandbox) {
        return dotenv.config().parsed.ZENODO_SANDBOX_ACCESS_TOKEN;
    }
    else {
        return dotenv.config().parsed.ZENODO_ACCESS_TOKEN;
    }
};
//# sourceMappingURL=get-access-token-from-environment.js.map