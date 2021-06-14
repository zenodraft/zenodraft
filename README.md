
<p align="center">
<img src="https://github.com/zenodraft/branding/blob/main/zenodraft.png" height=200>
 </p>

# This project is a work in progress

CLI to manage depositions on Zenodo or Zenodo Sandbox.

## Outline of the CLI structure

```plain
zenodraft [--sandbox] [--verbose]
├── deposition
│   ├── create
│   │   ├── in-existing-collection <collection_id>
│   │   └── in-new-collection
│   ├── delete <id>
│   ├── details <id>
│   ├── latest <collection_id>
│   └── publish <id>
├── file
│   ├── add <id> <filename>
│   └── delete <id> <filename>
└── metadata
    ├── clear <id>
    └── update <id> <filename>
```

## Examples

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

1. Get the details of a deposition:

    ```shell
    zenodraft --sandbox deposition details $RECORD_ID
    zenodraft deposition details $RECORD_ID
    ```

1. Get the deposition id for the latest draft:

    ```shell
    zenodraft --sandbox deposition latest $CONCEPT_RECORD_ID
    zenodraft deposition latest $CONCEPT_RECORD_ID
    ```

    Either returns the id of the latest draft deposition in the collection, or an empty string in case there are no draft depositions in the collection.
    
    Typical usage in automation is to capture the printed value like so:
    
    ```shell
    LATEST_ID=$(zenodraft --sandbox deposition latest $CONCEPT_RECORD_ID)
    LATEST_ID=$(zenodraft deposition latest $CONCEPT_RECORD_ID)
    ```

1. Publish a draft deposition:

    ```shell
    zenodraft --sandbox deposition publish $RECORD_ID
    zenodraft deposition publish $RECORD_ID
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


## Install

Requirements:

- node (I'm using v14, other versions may work)
- npm (I'm using v7, other versions may work)

Install with

```shell
npm install -g git+https://github.com/jspaaks/zenodraft
which zenodraft       # should now point to the program
```

## Access tokens

To use `zenodraft`, a personal access token is required, one for each platform you plan on using. `zenodraft` looks for the access token first in the environment variables named `ZENODO_SANDBOX_ACCESS_TOKEN` and `ZENODO_ACCESS_TOKEN`, then in a file called `.env`, which must reside in the directory from which you run `zenodraft`. 

You can create your own `.env` by copying the example env file, like so

```shell
cp example.env .env
```

and subsequently updating its contents.

Fill in the placeholders with values of your own, which you can get at

- Zenodo Sandbox: https://sandbox.zenodo.org/account/settings/applications/
- Zenodo: https://zenodo.org/account/settings/applications/
