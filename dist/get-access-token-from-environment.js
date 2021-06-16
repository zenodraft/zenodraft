"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_access_token_from_environment = void 0;
const dotenv = require("dotenv");
const get_access_token_from_environment = (sandbox) => {
    if (sandbox) {
        const token = process.env.ZENODO_SANDBOX_ACCESS_TOKEN;
        if (token !== undefined) {
            return token;
        }
        else {
            try {
                return dotenv.config().parsed.ZENODO_SANDBOX_ACCESS_TOKEN;
            }
            catch (e) {
                throw new Error(`Could not read ZENODO_SANDBOX_ACCESS_TOKEN from file named .env nor from environment variables. ${e}`);
            }
        }
    }
    else {
        const token = process.env.ZENODO_ACCESS_TOKEN;
        if (token !== undefined) {
            return token;
        }
        else {
            try {
                return dotenv.config().parsed.ZENODO_ACCESS_TOKEN;
            }
            catch (e) {
                throw new Error(`Could not read ZENODO_ACCESS_TOKEN from file named .env nor from environment variables. ${e}`);
            }
        }
    }
};
exports.get_access_token_from_environment = get_access_token_from_environment;
