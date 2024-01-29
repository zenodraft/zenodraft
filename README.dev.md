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

Transpile the TypeScript code from `src/` to `dist/` as CommonJS modules (`dist/**/*.js`) and as ES6
modules (`dist/**/*.mjs`):

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

## Testing

We use [Jest](https://jestjs.io/) for testing. Run the tests with

```
# all tests
npm run test

# individual test
npm run test test/some/test

# tests with converage
npm run coverage
```

Many tests use [_mocking_](https://en.wikipedia.org/wiki/Mock_object) to simulate server replies.
Our mocking library is [Nock](https://www.npmjs.com/package/nock). Typically, tests that use mocking
will insert simulated server replies using a pre-recorded reply from the `./mocks` directory.

## Local testing of the cli from the package

Assert tarball `zenodraft-x.y.z.tgz` has been created with `npm pack`.

```
cd $(mktemp -d --tmpdir zenodraft.XXXXXX)
npm install path/to/the/tarball/zenodraft-x.y.z.tgz --force   # --force overrides caching
# you should now have a cli program node_modules/.bin/zenodraft, see if it's working
npx zenodraft
npx zenodraft --version
npx zenodraft --help
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
  deposition_create_concept: [Function: deposition_create_concept],
  deposition_create_version: [Function: deposition_create_version],
  deposition_delete: [Function: deposition_delete],
  deposition_publish: [Function: deposition_publish],
  deposition_show_details: [Function: deposition_show_details],
  deposition_show_prereserved: [Function: deposition_show_prereserved],
  file_add: [Function: file_add],
  file_delete: [Function: file_delete],
  helpers_get_access_token_from_environment: [Function: helpers_get_access_token_from_environment],
  helpers_get_api: [Function: helpers_get_api],
  helpers_validate_in_concept_value: [Function: helpers_validate_in_concept_value],
  metadata_update: [Function: metadata_update]
}
```


### Using ES6 `import`


In a new directory, make a file e.g. `index.mjs` with the following contents (you may use a
different filename but the extension needs to be `.mjs`):

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

Should show the same as listed above for `require`.

## For maintainers

### Publishing to GitHub and Zenodo

Use GitHub's _Draft a new release_ button to prepare a release. On publishing the release, GitHub
will trigger the `publishing.yml` workflow, which in turn sends a snapshot of the release to Zenodo
using [_zenodraft GitHub Action_](https://github.com/marketplace/actions/zenodraft). As part of the
process, zenodraft will also update the GitHub release with updated citation metadata, specifically
the DOI.

### Publishing to NPM

Before you begin, make sure that everything that needs to be part of the release has been
pushed to GitHub and has been merged into the default branch `main`.

```shell
# uninstall any globally installed versions of zenodraft
npm uninstall -g zenodraft

# check that it's gone, should return empty
which zenodraft

# delete any environment variables that store Zenodo / Zenodo Sandbox tokens
unset ZENODO_ACCESS_TOKEN
unset ZENODO_SANDBOX_ACCESS_TOKEN

# log out of npm
npm logout

# make a temporary directory
cd $(mktemp -d --tmpdir zenodraft-release-prep.XXXXXX)

# clone the repo in the empty temporary directory
git clone https://github.com/zenodraft/zenodraft .

# Install dependencies
npm install

# Generate the JavaScript, package it up into a tarball
npm run all

# Install zenodraft globally
npm install -g zenodraft-*.tgz

# Open a new shell to get any new autocomplete related functionality
bash
```

Test the functionality of the release candidate.

```shell
# choose your identity and log in to npm
npm login

# FINAL STEP, THERE IS NO UNDO: publish the tarball to npmjs.com
npm publish zenodraft-*.tgz
```
