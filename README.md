
<p align="center">
<img src="https://raw.githubusercontent.com/zenodraft/branding/main/zenodraft.png" height=200>
</p> 
<p align="center">
    <a href="https://github.com/zenodraft/zenodraft"><img src="https://img.shields.io/badge/github-repo-000.svg?logo=github&labelColor=gray&color=blue&style=flat-square" alt="github repo badge"></a>
    <a href="https://github.com/zenodraft/zenodraft"><img src="https://img.shields.io/github/license/zenodraft/zenodraft?style=flat-square" alt="github license badge"></a>
    <a href="https://www.npmjs.com/package/zenodraft"><img src="https://img.shields.io/npm/v/zenodraft?style=flat-square" alt="npm version"></a>
    <a href="https://doi.org/10.5281/zenodo.5046392"><img src="https://img.shields.io/badge/DOI-10.5281%20%2F%20zenodo.5046392-blue.svg?style=flat-square" alt="DOI"></a>
    <a href="https://sonarcloud.io/dashboard?id=zenodraft_zenodraft"><img src="https://sonarcloud.io/api/project_badges/measure?project=zenodraft_zenodraft&metric=code_smells" alt="code smells badge"></a>
    <a href="https://sonarcloud.io/dashboard?id=zenodraft_zenodraft"><img src="https://sonarcloud.io/api/project_badges/measure?project=zenodraft_zenodraft&metric=coverage" alt="coverage"></a>
    <a href="https://fair-software.eu"><img src="https://img.shields.io/badge/fair--software.eu-%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F%20%20%E2%97%8F-green?style=flat-square" alt="fair-software badge"></a>
</p>
<p align="center">
You are welcome to leave feedback at https://github.com/zenodraft/zenodraft/issues.
</p>
<br>
<br>
    
## CLI to manage depositions on Zenodo

### Features

1. Create depositions on Zenodo
1. Add files to depositions on Zenodo
1. Update metadata to depositions on Zenodo
1. Finalize/publish depositions on Zenodo

Everything also works on Zenodo Sandbox via the `--sandbox` flag. You'll need access tokens for either platform (see below).

### Usage example

```shell
# make sure you have the access token available as the
# environment variable ZENODO_ACCESS_TOKEN

# create a new, draft deposition in a new collection:
zenodraft deposition create in-new-collection
1234567

# upload a local file, e.g. yourfile.zip
zenodraft file add 1234567 yourfile.zip 

# create some metadata file in Zenodo metadata format, e.g.
echo -e '{
  "creators": [
    {
      "name": "Lastname, Firstname"
    }
  ],
  "title": "My deposition"
}' > .zenodo.json

# update the metadata of the draft deposition
zenodraft metadata update 1234567 .zenodo.json

# inspect the draft deposition on https://zenodo.org/deposit

# if all looks good, finalize the deposition by publishing it
zenodraft deposition publish 1234567
```

Here is the result when viewed on Zenodo:
![[tag](img/zenodo-deposition.png)]

For a complete overview of the command line interface, see [here](README.cli-usage.md).

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

### Install

Requirements:

- node (I'm using v14, other versions may work)
- npm (I'm using v7, other versions may work)

Install globally with `-g` flag:

```shell
# global install
npm install -g zenodraft

# this next command should now point to the program location
which zenodraft

# use the zenodraft cli like so
zenodraft --version
zenodraft --help
```

Or install locally without `-g` flag (but note that [autocomplete](#Autocomplete) only works when `zenodraft` is installed globally):

```shell
# local install
npm install zenodraft

# this next command doesn't work for local installs
which zenodraft

# but you can still use the cli by explicitly pointing to it
node_modules/.bin/zenodraft --version
node_modules/.bin/zenodraft --help
```

### Docker 

Building the docker container:

```shell
docker build -t zenodraft https://raw.githubusercontent.com/zenodraft/zenodraft/0.11.0/Dockerfile
```

Running the docker container:
```shell
docker run --rm zenodraft --help
docker run --rm zenodraft --version
docker run --rm -e ZENODO_SANDBOX_ACCESS_TOKEN \
   zenodraft --sandbox deposition create in-new-collection
docker run --rm -e ZENODO_SANDBOX_ACCESS_TOKEN \
   zenodraft --sandbox deposition show details 123456
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

Source this script to add autocomplete powers to the `zenodraft` program, using something like:
```
# Add autocomplete powers to zenodraft: 
TMPFILE=$(mktemp)
zenodraft-autocomplete > $TMPFILE
source $TMPFILE
```
You can make the change permanent by copying those 4 lines to the bottom of your `~/.bashrc`.

