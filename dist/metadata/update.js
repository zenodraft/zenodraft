"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata_update = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const fs = __importStar(require("fs"));
const get_access_token_from_environment_1 = require("../helpers/get-access-token-from-environment");
const get_api_1 = require("../helpers/get-api");
const path = __importStar(require("path"));
const metadata_update = (sandbox, id, filename, verbose = false) => __awaiter(void 0, void 0, void 0, function* () {
    if (verbose) {
        if (filename === undefined) {
            console.log(`clearing metadata from deposition with id ${id}...`);
        }
        else {
            console.log(`adding metadata from ${filename} to deposition with id ${id}...`);
        }
    }
    const access_token = get_access_token_from_environment_1.helpers_get_access_token_from_environment(sandbox);
    const api = get_api_1.helpers_get_api(sandbox);
    const endpoint = `/deposit/depositions/${id}`;
    const method = 'PUT';
    const headers = {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json'
    };
    const minimal_metadata_filename = path.join(__dirname, '..', '..', 'assets', '.zenodo.json.empty');
    const minimal_metadata = JSON.parse(fs.readFileSync(minimal_metadata_filename, 'utf8'));
    const user_metadata = filename === undefined ? {} : JSON.parse(fs.readFileSync(filename, 'utf8'));
    const metadata = Object.assign(Object.assign({}, minimal_metadata), user_metadata);
    const init = { method, headers, body: JSON.stringify({ metadata }) };
    let response;
    try {
        response = yield node_fetch_1.default(`${api}${endpoint}`, init);
        if (response.ok !== true) {
            console.debug(response);
            throw new Error('Response was not OK');
        }
    }
    catch (e) {
        throw new Error(`Something went wrong on ${method} to ${api}${endpoint}: ${response.status} - ${response.statusText} \n\n\n ${e}`);
    }
    try {
        const deposition = yield response.json();
        if (verbose) {
            console.log(`Updated record ${deposition.record_id}.`);
        }
    }
    catch (e) {
        throw new Error(`Something went wrong while retrieving the json. ${e}`);
    }
});
exports.metadata_update = metadata_update;
//# sourceMappingURL=update.js.map