#!/usr/bin/env node
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
import commander from 'commander';
import { add_file_to_deposition } from './add-file-to-deposition.js';
import { create_empty_deposition_in_existing_collection } from './create-empty-deposition-in-existing-collection.js';
import { create_empty_deposition_in_new_collection } from './create-empty-deposition-in-new-collection.js';
import { delete_deposition_file } from './delete-deposition-file.js';
import { delete_draft_deposition } from './delete-draft-deposition.js';
import { get_deposition_details } from './get-deposition-details.js';
import { publish_draft_deposition } from './publish-draft-deposition.js';
import { update_deposition_metadata } from './update-deposition-metadata.js';
import { get_latest_draft } from './get-latest-draft.js';
var create = (function () {
    var create = new commander.Command('create');
    create.description('subcommands for creating a deposition');
    create
        .command('in-new-collection')
        .description('create a new draft deposition in a new collection')
        .action(function () {
        create_empty_deposition_in_new_collection(zenodraft.opts().sandbox, zenodraft.opts().verbose);
    });
    create
        .command('in-existing-collection')
        .arguments('<collection_id>')
        .description('create a new draft deposition as a new version in an existing collection', {
        collection_id: 'id for the collection that the new deposition will be part of.'
    })
        .action(function (collection_id) {
        create_empty_deposition_in_existing_collection(zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose);
    });
    return create;
})();
var deposition = (function () {
    var deposition = new commander.Command('deposition');
    deposition.description('subcommands for depositions');
    deposition
        .addCommand(create);
    deposition
        .command('delete')
        .arguments('<id>')
        .description('delete draft deposition with id <id>', {
        id: 'deposition id'
    })
        .action(function (id) {
        delete_draft_deposition(zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
    });
    deposition
        .command('details')
        .arguments('<id>')
        .description('get details pertaining to deposition with id <id>', {
        id: 'deposition id'
    })
        .action(function (id) { return __awaiter(void 0, void 0, void 0, function () {
        var details;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get_deposition_details(zenodraft.opts().sandbox, id, zenodraft.opts().verbose)];
                case 1:
                    details = _a.sent();
                    console.log(JSON.stringify(details, null, 4));
                    return [2 /*return*/];
            }
        });
    }); });
    deposition
        .command('latest')
        .arguments('<collection_id>')
        .description('get the latest draft deposition id of the collection with id <collection_id>', {
        collection_id: 'id of the collection whose latest draft we want to retrieve'
    })
        .action(function (collection_id) { return __awaiter(void 0, void 0, void 0, function () {
        var latest_draft_id;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, get_latest_draft(zenodraft.opts().sandbox, collection_id, zenodraft.opts().verbose)];
                case 1:
                    latest_draft_id = _a.sent();
                    console.log(latest_draft_id);
                    return [2 /*return*/];
            }
        });
    }); });
    deposition
        .command('publish')
        .arguments('<id>')
        .description('publish draft deposition with id <id>', {
        id: 'deposition id'
    })
        .action(function (id) {
        publish_draft_deposition(zenodraft.opts().sandbox, id, zenodraft.opts().verbose);
    });
    return deposition;
})();
var file = (function () {
    var file = new commander.Command('file');
    file.description('subcommands for files');
    file
        .command('add')
        .arguments('<id> <filename>')
        .description('add a local file with filename <filename> to existing deposition with id <id>', {
        id: 'deposition id',
        filename: 'filename of the local file that is going to be added'
    })
        .action(function (id, filename) {
        add_file_to_deposition(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
    });
    file
        .command('delete')
        .arguments('<id> <filename>')
        .description('delete a file with filename <filename> from draft deposition with id <id>', {
        id: 'deposition id',
        filename: 'filename of the deposition file that is going to be deleted.'
    })
        .action(function (id, filename) {
        delete_deposition_file(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
    });
    return file;
})();
var metadata = (function () {
    var metadata = new commander.Command('metadata');
    metadata.description('subcommands for metadata');
    metadata
        .command('update')
        .arguments('<id> <filename>')
        .description('update the metadata of an existing deposition with id <id> using the metadata from <filename>', {
        id: 'deposition id',
        filename: 'filename of file holding the metadata in Zenodo metadata format'
    })
        .action(function (id, filename) {
        update_deposition_metadata(zenodraft.opts().sandbox, id, filename, zenodraft.opts().verbose);
    });
    metadata
        .command('clear')
        .arguments('<id>')
        .description('clear the metadata of an existing deposition with id <id>', {
        id: 'deposition id'
    })
        .action(function (id) {
        update_deposition_metadata(zenodraft.opts().sandbox, id, undefined, zenodraft.opts().verbose);
    });
    return metadata;
})();
export var zenodraft = new commander.Command('zenodraft');
zenodraft
    .version('0.3.0')
    .description('CLI to manage depositions on Zenodo or Zenodo Sandbox.')
    .option('-s, --sandbox', 'run on zenodo sandbox instead of regular zenodo', false)
    .option('-v, --verbose', 'verbose mode', false)
    .addCommand(deposition)
    .addCommand(file)
    .addCommand(metadata)
    .parse(process.argv);
//# sourceMappingURL=cli.js.map