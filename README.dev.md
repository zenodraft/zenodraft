# Developer documentation

## Install

```
cd some-empty-dir
git clone https://github.com/zenodraft/zenodraft .
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

Make a file e.g. `index.js` with the following contents:

```javascript
// file: index.js
const zenodraft = require('zenodraft');
console.info(zenodraft);
```

```shell
node index.js
```

Should show something like:

```shell
{
  deposition_create_concept: [Getter],
  deposition_create_version: [Getter],
  deposition_delete: [Getter],
  deposition_publish: [Getter],
  deposition_show_details: [Getter],
  deposition_show_draft: [Getter],
  deposition_show_files: [Getter],
  deposition_show_prereserved: [Getter],
  file_add: [Getter],
  file_delete: [Getter],
  helpers_get_access_token_from_environment: [Getter],
  helpers_get_api: [Getter],
  metadata_update: [Getter],
  metadata_validate: [Getter]
}
```


### Using ES6 `import`


Make a file e.g. `index.mjs` with the following contents (you may use a
different filename but the extension needs to be `.mjs`):

```javascript
// file: index.mjs
import zenodraft from 'zenodraft';
console.info(zenodraft);
```

```shell
node index.mjs
```

Should show the same as listed above for `require`.

## For maintainers

Order of publishing

1. Preparation
2. Zenodo
3. GitHub
4. NPM

### Preparation

Before you begin, make sure that

1. everything that needs to be part of the release has been
pushed to GitHub and has been merged into the default branch `main`.
1. the citation metadata (e.g. dates, `version`) has been updated
1. the version indicators are consistent throughout the whole directory tree, e.g.
   - `CITATION.cff`
   - `Dockerfile`
   - `package-lock.json`
   - `package.json`
   - `README.md`
   - `tests/cli.test.ts`
   - possibly other files

Then, follow the steps below.

```shell
# Uninstall any globally installed versions of zenodraft
npm uninstall -g zenodraft

# Check that it's gone, should return empty
which zenodraft

# Delete any environment variables that store Zenodo / Zenodo Sandbox tokens
unset ZENODO_ACCESS_TOKEN
unset ZENODO_SANDBOX_ACCESS_TOKEN

# Make a temporary directory, change into it
cd $(mktemp -d --tmpdir zenodraft-preparation.XXXXXX)

# Clone the repo in the empty temporary directory
git clone https://github.com/zenodraft/zenodraft .

# Install dependencies
npm install

# Generate the JavaScript, package it up into a tarball
npm run all

# Verify the tarball has the right set of files
less zenodraft-*.tgz

# Make a new temporary directory
cd $(mktemp -d --tmpdir zenodraft-testing.XXXXXX)

# Install zenodraft globally using the tarball we just made
npm install -g ../zenodraft-preparation.XXXXXX/zenodraft-*.tgz

# Source the autocomplete script
TMPFILE=$(mktemp)
zenodraft-autocomplete > $TMPFILE
source $TMPFILE
```

1. Test whether the autocomplete functionality works correctly (see section [_Autocomplete_ from README.md](README.md#autocomplete)).
1. Test whether CLI commands work as expected (see section [_CLI usage_ from README.md](README.md#cli-usage)).
1. Test whether `zenodraft` can be used as a library (see section [_Library usage_ from README.md](README.md#library-usage)).

### Publishing to Zenodo

Manually triggering the `publishing.yml` workflow will send a snapshot of the repository to Zenodo.
As part of the process, the workflow will also update the citation metadata with the prereserved DOI
that Zenodo supplies, and commit it back to the repository.

Once the workflow finishes, log in to Zenodo to publish the deposition there.

### Publishing to GitHub

After the `publishing` workflow from the previous step finishes, check that the DOI has been updated,
then use GitHub's _Draft a new release_ button to make a release.

### Publishing to NPM

```shell
# Go back to the directory with the tarball
cd ../zenodraft-preparation.XXXXXX/zenodraft-*.tgz

# Log out of npm
npm logout

# Choose your identity and log in to npm
npm login

# FINAL STEP, THERE IS NO UNDO: publish the tarball to npmjs.com
npm publish zenodraft-*.tgz
```
