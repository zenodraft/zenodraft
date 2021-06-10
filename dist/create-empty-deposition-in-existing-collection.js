var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { get_deposition_details } from './get-deposition-details.js';
import fetch from 'node-fetch';
import { delete_deposition_file } from './delete-deposition-file.js';
import { update_deposition_metadata } from './update-deposition-metadata.js';
import { get_access_token_from_environment } from './get-access-token-from-environment.js';
import { get_api } from './get-api.js';
import { validate_in_collection_value } from './validate-in-collection-value.js';
export var create_empty_deposition_in_existing_collection = function (sandbox, collection_id, verbose) {
    if (verbose === void 0) { verbose = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var latest_id, new_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (verbose) {
                        console.log("creating a new, empty versioned deposition in existing collection...");
                    }
                    return [4 /*yield*/, validate_in_collection_value(sandbox, collection_id, verbose)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, get_id_for_latest_version_in_collection(sandbox, collection_id, verbose)];
                case 2:
                    latest_id = _a.sent();
                    return [4 /*yield*/, create_new_versioned_deposition(sandbox, latest_id, verbose)];
                case 3:
                    new_id = _a.sent();
                    return [4 /*yield*/, remove_files_from_draft(sandbox, new_id, verbose)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, update_deposition_metadata(sandbox, new_id, undefined, verbose)];
                case 5:
                    _a.sent();
                    return [2 /*return*/, new_id];
            }
        });
    });
};
var create_new_versioned_deposition = function (sandbox, latest_id, verbose) {
    if (verbose === void 0) { verbose = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var access_token, api, endpoint, method, headers, init, response, e_1, deposition, new_id, e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (verbose) {
                        console.log("creating a new version off of latest version in collection...");
                    }
                    access_token = get_access_token_from_environment(sandbox);
                    api = get_api(sandbox);
                    endpoint = "/deposit/depositions/" + latest_id + "/actions/newversion";
                    method = 'POST';
                    headers = {
                        'Authorization': "Bearer " + access_token
                    };
                    init = { method: method, headers: headers };
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("" + api + endpoint, init)];
                case 2:
                    response = _a.sent();
                    if (response.ok !== true) {
                        throw new Error();
                    }
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    console.debug(response);
                    throw new Error("Something went wrong on " + method + " to " + api + endpoint + ": " + response.status + " - " + response.statusText + " \n\n\n " + e_1);
                case 4:
                    _a.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, response.json()];
                case 5:
                    deposition = _a.sent();
                    new_id = deposition.links.latest_draft.split('/').slice(-1)[0];
                    if (verbose) {
                        console.log("created new record " + new_id);
                    }
                    console.log("" + new_id);
                    return [2 /*return*/, new_id];
                case 6:
                    e_2 = _a.sent();
                    throw new Error("Something went wrong while retrieving the json. " + e_2);
                case 7: return [2 /*return*/];
            }
        });
    });
};
var get_id_for_latest_version_in_collection = function (sandbox, collection_id, verbose) {
    if (verbose === void 0) { verbose = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var id, deposition, latest_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (verbose) {
                        console.log("getting id of the latest version in the collection...");
                    }
                    id = (parseInt(collection_id) + 1).toString();
                    return [4 /*yield*/, get_deposition_details(sandbox, id)];
                case 1:
                    deposition = _a.sent();
                    latest_id = deposition.links.latest.split('/').slice(-1)[0];
                    return [2 /*return*/, latest_id];
            }
        });
    });
};
var remove_files_from_draft = function (sandbox, id, verbose) {
    if (verbose === void 0) { verbose = false; }
    return __awaiter(void 0, void 0, void 0, function () {
        var deposition, filenames, _i, filenames_1, filename;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (verbose) {
                        console.log("removing any files from the newly drafted version...");
                    }
                    return [4 /*yield*/, get_deposition_details(sandbox, id)];
                case 1:
                    deposition = _a.sent();
                    filenames = deposition.files.map(function (file) { return file.filename; });
                    for (_i = 0, filenames_1 = filenames; _i < filenames_1.length; _i++) {
                        filename = filenames_1[_i];
                        delete_deposition_file(sandbox, id, filename);
                    }
                    return [2 /*return*/];
            }
        });
    });
};
//# sourceMappingURL=create-empty-deposition-in-existing-collection.js.map