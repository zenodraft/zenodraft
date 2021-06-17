# Developer documentation

## Install

```
git clone https://github.com/zenodraft/zenodraft
git checkout -b <new branch>
npm install

# do development

```

## npm run scripts

Clean up generated code from previous builds:

```
npm run clean
```

Transpile the TypeScript code from src to dist as CommonJS modules (`dist/**/*.js`) and as ES6 modules (`dist/**/*.mjs`):

```
npm run build
```

Package the contents from dist into a distributable tarball:

```
npm run pack
```

All of the above (clean, build, pack):

```
npm run all
```


## Local testing of the cli from the package

Assert tarball zenodraft-x.y.z.tgz has been created with `npm run pack`.

```
cd $(mktemp -d --tmpdir zenodraft.XXXXXX)
npm install path/to/the/tarball/zenodraft-x.y.z.tgz --force   # --force overrides caching
# you should now have a cli program node_modules/.bin/zenodraft, see if it's working
node_modules/.bin/zenodraft
node_modules/.bin/zenodraft --version
node_modules/.bin/zenodraft --help
```

## Local testing of the functionality from the package

### Using CommonJS `require`

Make a file e.g. `index.js` with the following contents:

```javascript
// file: index.js
const zenodraft = require('zenodraft').default;
console.info(zenodraft);
```

```shell
node index.js
```

Should show something like:

```shell
{
  add_file_to_deposition: [Function: add_file_to_deposition],
  cli: [Function: cli],
  create_empty_deposition_in_existing_collection: [Function: create_empty_deposition_in_existing_collection],
  create_empty_deposition_in_new_collection: [Function: create_empty_deposition_in_new_collection],
  delete_deposition_file: [Function: delete_deposition_file],
  delete_draft_deposition: [Function: delete_draft_deposition],
  get_access_token_from_environment: [Function: get_access_token_from_environment],
  get_api: [Function: get_api],
  get_deposition_details: [Function: get_deposition_details],
  get_latest_draft: [Function: get_latest_draft],
  publish_draft_deposition: [Function: publish_draft_deposition],
  update_deposition_metadata: [Function: update_deposition_metadata],
  validate_in_collection_value: [Function: validate_in_collection_value]
}
```


### Using ES6 `import`


Make a file e.g. `index.mjs` with the following contents (you may use a different filename but the extension needs to be `.mjs`):

```javascript
// file: index.mjs
import zenodraft from 'zenodraft';
console.info(zenodraft.default);
```

```shell
# node v14
node index.mjs

# node v12
node --experimental-modules index.mjs
```

Should show something like:

```shell
{
  add_file_to_deposition: [Function: add_file_to_deposition],
  cli: [Function: cli],
  create_empty_deposition_in_existing_collection: [Function: create_empty_deposition_in_existing_collection],
  create_empty_deposition_in_new_collection: [Function: create_empty_deposition_in_new_collection],
  delete_deposition_file: [Function: delete_deposition_file],
  delete_draft_deposition: [Function: delete_draft_deposition],
  get_access_token_from_environment: [Function: get_access_token_from_environment],
  get_api: [Function: get_api],
  get_deposition_details: [Function: get_deposition_details],
  get_latest_draft: [Function: get_latest_draft],
  publish_draft_deposition: [Function: publish_draft_deposition],
  update_deposition_metadata: [Function: update_deposition_metadata],
  validate_in_collection_value: [Function: validate_in_collection_value]
}
```
