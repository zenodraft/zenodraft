
<p align="center">
<img src="https://raw.githubusercontent.com/zenodraft/branding/main/zenodraft.png" height=200>
</p> 
<p align="center">
Note: This project is a work in progress.
</p> 
<p align="center">
You are welcome to try it out and leave feedback at https://github.com/zenodraft/zenodraft/issues though.
</p>
<p align="center">
    <a href="https://github.com/zenodraft/zenodraft"><img src="https://img.shields.io/badge/github-repo-000.svg?logo=github&labelColor=gray&color=blue&style=flat-square" alt="github repo badge"></a>
    <a href="https://github.com/zenodraft/zenodraft"><img src="https://img.shields.io/github/license/zenodraft/zenodraft?style=flat-square" alt="github license badge"></a>
    <a href="https://www.npmjs.com/package/zenodraft"><img src="https://img.shields.io/npm/v/zenodraft?style=flat-square" alt="npm version"></a>
    <a href="https://doi.org/10.5281/zenodo.5046393"><img src="https://img.shields.io/badge/DOI-10.5281%20%2F%20zenodo.5046393-blue.svg?style=flat-square" alt="DOI"></a>
    <a href="https://fair-software.eu"><img src="https://img.shields.io/badge/fair--software.eu-%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8B-yellow?style=flat-square" alt="fair-software badge"></a>
</p>
<br>
<br>
    
## CLI to manage depositions on Zenodo or Zenodo Sandbox


### Features

1. Choose which platform you want to draft your deposition on (Zenodo or Zenodo Sandbox), and easily switch between them.
2. Choose to create your draft deposition as a new version in an existing collection, or as a new deposition in a new collection.
3. Upload local files to the draft deposition.
4. Attach metadata such as title, authors, and contributors to your deposition using information from a local file.
5. Choose to finalize the deposition, or leave the deposition as draft for you to inspect and publish manually by clicking the button on Zenodo or Zenodo Sandbox.

### Outline of the CLI structure

```plain
zenodraft [--sandbox] [--verbose]
├── deposition
│   ├── create
│   │   ├── in-existing-collection <collection_id>
│   │   └── in-new-collection
│   ├── delete <id>
│   ├── publish <id>
│   └── show
│       ├── details <id>
│       ├── latest <collection_id>
│       └── prereserved <id>
├── file
│   ├── add <id> <filename>
│   └── delete <id> <filename>
└── metadata
    ├── clear <id>
    └── update <id> <filename>
```

### Examples

The usage examples below differentiate between an identifier for the concept/collection `CONCEPT_RECORD_ID` and the identifier for a depostion `RECORD_ID`. All commands require an access token, [see below](#access-tokens).

```shell
CONCEPT_RECORD_ID=123456
RECORD_ID=123457
```

1. Create a new draft depostion as the first version in a new collection:

    ```shell
    zenodraft --sandbox deposition create in-new-collection
    zenodraft deposition create in-new-collection
    ```

1. Create a new draft deposition as the latest version in an existing collection:

    ```shell
    zenodraft --sandbox deposition create in-existing-collection $CONCEPT_RECORD_ID
    zenodraft deposition create in-existing-collection $CONCEPT_RECORD_ID
    ```

1. Delete a draft deposition:

    ```shell
    zenodraft --sandbox deposition delete $RECORD_ID
    zenodraft deposition delete $RECORD_ID
    ```

1. Publish a draft deposition:

    ```shell
    zenodraft --sandbox deposition publish $RECORD_ID
    zenodraft deposition publish $RECORD_ID
    ```

1. Get the details of a deposition:

    ```shell
    zenodraft --sandbox deposition show details $RECORD_ID
    zenodraft deposition show details $RECORD_ID
    ```

1. Get the deposition id for the latest draft:

    ```shell
    zenodraft --sandbox deposition show latest $CONCEPT_RECORD_ID
    zenodraft deposition show latest $CONCEPT_RECORD_ID
    ```

    Either returns the id of the latest draft deposition in the collection, or an empty string in case there are no draft depositions in the collection.
    
    Typical usage in automation is to capture the printed value like so:
    
    ```shell
    LATEST_ID=$(zenodraft --sandbox deposition show latest $CONCEPT_RECORD_ID)
    LATEST_ID=$(zenodraft deposition show latest $CONCEPT_RECORD_ID)
    ```

1. Get the prereserved doi for the latest draft:

    ```shell
    zenodraft --sandbox deposition show prereserved $RECORD_ID
    zenodraft deposition show prereserved $RECORD_ID
    ```

    Returns the prereserved doi of the draft deposition with id `$RECORD_ID`.
    
    Typical usage in automation is to capture the printed value like so:
    
    ```shell
    PRERESERVED=$(zenodraft --sandbox deposition show prereserved $RECORD_ID)
    PRERESERVED=$(zenodraft deposition show prereserved $RECORD_ID)
    ```

1. Add a local file to an existing draft deposition:

    ```shell
    zenodraft --sandbox file add $RECORD_ID file.txt
    zenodraft file add $RECORD_ID file.txt
    ```

1. Remove a file from an existing draft deposition:

    ```shell
    zenodraft --sandbox file delete $RECORD_ID file.txt
    zenodraft file delete $RECORD_ID file.txt
    ```

1. Clear a deposition's metadata:

    ```shell
    zenodraft --sandbox metadata clear $RECORD_ID 
    zenodraft metadata clear $RECORD_ID
    ```

1. Update a deposition with metadata from a local file:

    ```shell
    zenodraft --sandbox metadata update $RECORD_ID .zenodo.json
    zenodraft metadata update $RECORD_ID .zenodo.json
    ```


### Install

Requirements:

- node (I'm using v14, other versions may work)
- npm (I'm using v7, other versions may work)

Install globally with `-g` flag:

```shell
# global install
npm install -g git+https://github.com/zenodraft/zenodraft

# this next command should now point to the program location
which zenodraft

# use the zenodraft cli like so
zenodraft --version
zenodraft --help
```


Or install locally without `-g` flag:

```shell
# local install
npm install git+https://github.com/zenodraft/zenodraft

# this next command doesn't work for local installs
which zenodraft

# but you can still use the cli by explicitly pointing to it
node_modules/.bin/zenodraft --version
node_modules/.bin/zenodraft --help
```

### Docker 

Building the docker container:

```shell
docker build -t zenodraft https://raw.githubusercontent.com/zenodraft/zenodraft/0.9.1/Dockerfile
```

Running the docker container:
```shell
docker run --rm zenodraft --help
docker run --rm zenodraft --version
docker run --rm -e ZENODO_SANDBOX_ACCESS_TOKEN zenodraft --sandbox deposition create in-new-collection
# etc
```

### Autocomplete

An autocomplete script is bundled with the package as `assets/autocomplete.sh`. You can print it to the terminal as follows:

```
zenodraft-autocomplete
```

Which will print something like:

```shell
#/usr/bin/env bash
_zenodraft_completions()
{
    ...
}
complete -F _zenodraft_completions zenodraft
```

Source this script to add autocomplete powers to the zenodraft program, using something like:
```
# Add autocomplete powers to zenodraft: 
TMPFILE=$(mktemp)
zenodraft-autocomplete > $TMPFILE
source $TMPFILE
```
You can make the change permanent by copying those 4 lines to the bottom of your `~/.bashrc`.

### `zenodraft` as a library, using CommonJS `require`

Make a file e.g. `index.js` with the following contents:

```javascript
// file: index.js
const zenodraft = require('zenodraft').default;
console.info(zenodraft);
```

```shell
node index.js
```

### `zenodraft` as a library, using ES6 `import`

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

### Access tokens

To use `zenodraft`, a personal access token is required, one for each platform you plan on using.
`zenodraft` looks for the access token first in the environment variables named
`ZENODO_SANDBOX_ACCESS_TOKEN` and `ZENODO_ACCESS_TOKEN`, then in a file called
`.env`, which must reside in the directory from which you run `zenodraft`. 

You can create your own `.env` by copying the example env file, like so

```shell
cp example.env .env
```

and subsequently updating its contents.

Fill in the placeholders with values of your own, which you can get at

- Zenodo Sandbox: https://sandbox.zenodo.org/account/settings/applications/
- Zenodo: https://zenodo.org/account/settings/applications/
