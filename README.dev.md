# Developer documentation

## Install

```
git clone https://github.com/zenodraft/zenodraft
git checkout -b <new branch>
npm install
```

## npm run scripts

Clean up generated code from previous builds:

```
npm run clean
```

Transpile the TypeScript code from `src/` to `dist/` as CommonJS modules (`dist/**/*.js`) and as ES6 modules (`dist/**/*.mjs`):

```
npm run build
```

Package the contents from `dist/` into a distributable tarball:

```
npm pack
```

All of the above (clean, build, pack):

```
npm run all
```


## Local testing of the cli from the package

Assert tarball `zenodraft-x.y.z.tgz` has been created with `npm pack`.

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

In a new directory, make a file e.g. `index.js` with the following contents:

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
  cli: [Function: cli],
  deposition_create_in_existing_collection: [Function: deposition_create_in_existing_collection],
  deposition_create_in_new_collection: [Function: deposition_create_in_new_collection],
  deposition_delete: [Function: deposition_delete],
  deposition_publish: [Function: deposition_publish],
  deposition_show_details: [Function: deposition_show_details],
  deposition_show_latest: [Function: deposition_show_latest],
  deposition_show_prereserved: [Function: deposition_show_prereserved],
  file_add: [Function: file_add],
  file_delete: [Function: file_delete],
  helpers_get_access_token_from_environment: [Function: helpers_get_access_token_from_environment],
  helpers_get_api: [Function: helpers_get_api],
  helpers_validate_in_collection_value: [Function: helpers_validate_in_collection_value],
  metadata_update: [Function: metadata_update]
}
```


### Using ES6 `import`


In a new directory, make a file e.g. `index.mjs` with the following contents (you may use a different filename but the extension needs to be `.mjs`):

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
  cli: [Function: cli],
  deposition_create_in_existing_collection: [Function: deposition_create_in_existing_collection],
  deposition_create_in_new_collection: [Function: deposition_create_in_new_collection],
  deposition_delete: [Function: deposition_delete],
  deposition_publish: [Function: deposition_publish],
  deposition_show_details: [Function: deposition_show_details],
  deposition_show_latest: [Function: deposition_show_latest],
  deposition_show_prereserved: [Function: deposition_show_prereserved],
  file_add: [Function: file_add],
  file_delete: [Function: file_delete],
  helpers_get_access_token_from_environment: [Function: helpers_get_access_token_from_environment],
  helpers_get_api: [Function: helpers_get_api],
  helpers_validate_in_collection_value: [Function: helpers_validate_in_collection_value],
  metadata_update: [Function: metadata_update]
}
```
