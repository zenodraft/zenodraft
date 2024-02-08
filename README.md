
<p align="center">
<img src="https://raw.githubusercontent.com/zenodraft/branding/main/zenodraft.png" height=200>
</p> 
<p align="center">
    <a href="https://github.com/zenodraft/zenodraft"><img src="https://img.shields.io/badge/github-repo-000.svg?logo=github&labelColor=gray&color=blue&style=flat-square" alt="github repo badge"></a>
    <a href="https://github.com/zenodraft/zenodraft/compare/0.14.0..HEAD"><img src="https://img.shields.io/github/commits-since/zenodraft/zenodraft/0.14.0" alt="commits since latest release"></a>
    <a href="https://github.com/zenodraft/zenodraft"><img src="https://img.shields.io/github/license/zenodraft/zenodraft?style=flat-square" alt="github license badge"></a>
    <a href="https://www.npmjs.com/package/zenodraft"><img src="https://img.shields.io/npm/v/zenodraft?style=flat-square" alt="npm version"></a>
    <a href="https://doi.org/10.5281/zenodo.5046392"><img src="https://img.shields.io/badge/DOI-10.5281%20%2F%20zenodo.5046392-blue.svg?style=flat-square" alt="DOI"></a>
    <a href="https://fair-software.eu"><img src="https://img.shields.io/badge/fair--software.eu-%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F-green?style=flat-square" alt="fair-software badge"></a>
    <a href="https://fairsoftwarechecklist.net/v0.2?f=31&a=32113&i=31300&r=113"><img src="https://fairsoftwarechecklist.net/badge.svg" alt="FAIR checklist badge">
</a>

</p>
<p align="center">
You are welcome to leave feedback at https://github.com/zenodraft/zenodraft/issues.
</p>
<br>
<br>

# CLI to manage depositions on Zenodo

## Features

Use the command line to

1. create depositions on Zenodo
1. add files to depositions on Zenodo
1. validate Zenodo metadata from a local file
1. update metadata to depositions on Zenodo
1. finalize/publish depositions on Zenodo

Everything also works on Zenodo Sandbox via the `--sandbox` flag. You'll need an access token for the platform you choose (see [below](#access-tokens)).

## Usage example

```shell
# make sure you have the access token available as the
# environment variable ZENODO_ACCESS_TOKEN

# create a new, draft version in a new concept:
zenodraft deposition create concept
123456

# upload a local file, e.g. yourfile.zip
zenodraft file add 123456 yourfile.zip

# create some metadata file in Zenodo metadata format, e.g.
echo -e '{
  "creators": [
    {
      "name": "Lastname, Firstname"
    }
  ],
  "title": "My deposition"
}' > .zenodo.json

# check that the metadata is valid (no output means you're
# good to go)
zenodraft metadata validate .zenodo.json

# update the metadata of the draft version
zenodraft metadata update 123456 .zenodo.json

# inspect the draft version on https://zenodo.org/deposit

# if all looks good, finalize the version by publishing it
zenodraft deposition publish 123456
```

Here is the result when viewed on Zenodo:

![zenodo-result](img/zenodo-deposition.png)

<br>
<br>

## CLI overview

```shell
zenodraft deposition create concept [--sandbox]
zenodraft deposition create version [--sandbox] <concept_id>
zenodraft deposition delete [--sandbox] <version_id>
zenodraft deposition publish [--sandbox] <version_id>
zenodraft deposition show details [--sandbox] <version_id>
zenodraft deposition show draft [--sandbox] <concept_id>
zenodraft deposition show files [--sandbox] <version_id>
zenodraft deposition show prereserved [--sandbox] <version_id>
zenodraft file add [--sandbox] <version_id> <local filename>
zenodraft file delete [--sandbox] <version_id> <remote filename>
zenodraft metadata clear [--sandbox] <version_id>
zenodraft metadata update [--sandbox] <version_id> <local filename>
```

Additionally, use `--version` to show zenodraft's version and use `--help` to show the help on any command.

For a complete overview of the command line interface, see section _CLI Usage_ [below](#cli-usage).

## Access tokens

To use `zenodraft`, a personal access token is required, one for each platform you plan on using.
`zenodraft` looks for the access token first in the environment variables named
`ZENODO_SANDBOX_ACCESS_TOKEN` and `ZENODO_ACCESS_TOKEN`, then in a file called
`.env`, which must reside in the directory from which you run `zenodraft`.
See <https://npmjs.com/package/dotenv> for details on how to format your `.env`
file correctly.

You can get your access tokens at

- https://sandbox.zenodo.org/account/settings/applications/ (Zenodo Sandbox; for testing and development)
- https://zenodo.org/account/settings/applications/ (Zenodo; for production)

## Install

Prerequisites:

- node >= v20
- npm >= v10

### System install (recommended)

Install system-wide with the `-g` flag:

```shell
# global install
npm install -g zenodraft

# this next command should now point to the program location
which zenodraft

# use the zenodraft cli like so
zenodraft --version
zenodraft --help
# etc
```

The main advantage of installing system-wide is that you get Bash autocomplete, see section _Autocomplete_ [below](#autocomplete).

### Project directory install

Install locally without `-g` flag and use `zenodraft` CLI via the
[`npx`](https://nodejs.dev/learn/the-npx-nodejs-package-runner) command. Note that this will create a `node_modules/`
directory, and that you don't get Bash autocomplete this way.

```shell
# local install
npm install zenodraft

# this next command returns empty for local installs
which zenodraft

# but you can still use the cli via npx
npx zenodraft --version
npx zenodraft --help
# etc
```

### No-install

[`npx`](https://nodejs.dev/learn/the-npx-nodejs-package-runner) allows for running executables without the need for
installation. Note that this will download and cache `zenodraft` from [npmjs.com](https://npmjs.com) if you don't already have it.

```shell
npx zenodraft --version
npx zenodraft --help
npx zenodraft deposition create concept --sandbox
# etc
```

### Docker

Building the docker container:

```shell
docker build -t zenodraft https://raw.githubusercontent.com/zenodraft/zenodraft/0.14.0/Dockerfile
```

Running the docker container:

```shell
docker run --rm zenodraft --help
docker run --rm zenodraft --version
docker run --rm                   \
   -e ZENODO_SANDBOX_ACCESS_TOKEN \
   zenodraft deposition show details --sandbox 123456
docker run --rm                   \
   -e ZENODO_SANDBOX_ACCESS_TOKEN \
   -v ${PWD}:/data                \
   zenodraft metadata update --sandbox 123456 .zenodo.json

# etc
```

## Autocomplete

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

Source this script to add autocomplete powers to the `zenodraft` program, for example using:
```
# Add autocomplete powers to zenodraft: 
TMPFILE=$(mktemp)
zenodraft-autocomplete > $TMPFILE
source $TMPFILE
```
You can make the change permanent by copying those 4 lines to the bottom of your `~/.bashrc`.

## CLI Usage

The usage examples below differentiate between an identifier for the concept `CONCEPT_ID` and
the identifier for a depostion `VERSION_ID`.

You can get these numbers from the Zenodo page of your deposition:

![zenodo-versions-widget](/img/zenodo-versions-widget.png)

### Creating new draft depositions

As the first version in a new concept:

```shell
zenodraft deposition create concept --sandbox 
zenodraft deposition create concept
```

As a new version in an existing concept:

```shell
zenodraft deposition create version --sandbox $CONCEPT_ID 
zenodraft deposition create version $CONCEPT_ID
```

These commands print the `VERSION_ID` of the created version if they finish successfully.

### Deleting a draft version

```shell
zenodraft deposition delete --sandbox $VERSION_ID
zenodraft deposition delete $VERSION_ID
```

### Publishing a draft version

```shell
zenodraft deposition publish --sandbox $VERSION_ID
zenodraft deposition publish $VERSION_ID
```

### Getting the details of a version

```shell
zenodraft deposition show details --sandbox $VERSION_ID
zenodraft deposition show details $VERSION_ID
```

### Getting the id of a draft version in a concept

```shell
zenodraft deposition show draft --sandbox $CONCEPT_ID
zenodraft deposition show draft $CONCEPT_ID
```

Either returns the id of the draft version, or an empty string in case there is no draft version in the concept.

Typical usage in automation is to capture the printed value like so:

```shell
VERSION_ID=$(zenodraft deposition show draft --sandbox $CONCEPT_ID)
VERSION_ID=$(zenodraft deposition show draft $CONCEPT_ID)
```

### Getting the list of filenames of a version

```shell
zenodraft deposition show files --sandbox $VERSION_ID
zenodraft deposition show files $VERSION_ID
```

### Getting the prereserved doi for a version:

```shell
zenodraft deposition show prereserved --sandbox $VERSION_ID
zenodraft deposition show prereserved $VERSION_ID
```

Returns the prereserved doi of the version with id `$VERSION_ID`.

Typical usage in automation is to capture the printed value like so:

```shell
PRERESERVED=$(zenodraft deposition show prereserved --sandbox $VERSION_ID)
PRERESERVED=$(zenodraft deposition show prereserved $VERSION_ID)
```

### Adding a local file to an existing draft version:

```shell
zenodraft file add --sandbox $VERSION_ID file.txt
zenodraft file add $VERSION_ID file.txt
```

### Removing a file from an existing draft version

```shell
zenodraft file delete --sandbox $VERSION_ID file.txt
zenodraft file delete $VERSION_ID file.txt
```

### Clearing a version's metadata

```shell
zenodraft metadata clear --sandbox $VERSION_ID
zenodraft metadata clear $VERSION_ID
```

### Updating a version with metadata from a local file

```shell
zenodraft metadata update --sandbox $VERSION_ID .zenodo.json
zenodraft metadata update $VERSION_ID .zenodo.json
```

### Validating the metadata from a local file

```shell
zenodraft metadata validate .zenodo.json
```

## Library usage

### Using CommonJS `require`

Make a file e.g. `index.js` with the following contents:

```javascript
// file: index.js
const zenodraft = require('zenodraft');
console.info(zenodraft);
```

Running

```shell
$ node index.js
```

should output

```shell
{
  cli: [Getter],
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
  metadata_update: [Getter]
  metadata_validate: [Getter]
}
```

### Using ES6 `import`

Make a file e.g. `index.mjs` with the following contents (you may use a different filename but the extension needs to be `.mjs`):

```javascript
// file: index.mjs
import zenodraft from 'zenodraft';
console.info(zenodraft);
```

Running

```shell
node index.mjs
```

should output the same as listed above for `require`.
