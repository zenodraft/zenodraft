# `zenodraft`

## Outline of the CLI structure

- `zenodraft`
    - `deposition`
        - `create`
            - `in-existing-collection`: _create a new, empty draft deposition as a new version in an existing collection_
            - `in-new-collection`: _create a new, empty draft deposition in a new collection_
        - `delete`: _delete a draft deposition_
        - `get-details`: _get the details for a deposition_
        - `publish`: _publish a draft deposition_
    - `file`
        - `add`: _add a file to a draft deposition_
        - `delete`: _remove a file from a draft deposition_
    - `metadata`
        - `update`: _update the metadata for a deposition_

## Examples

```
CONCEPT_RECORD_ID=123456
RECORD_ID=123457

zenodraft --sandbox deposition create in-new-collection
zenodraft deposition create in-new-collection

zenodraft --sandbox deposition create in-existing-collection $CONCEPT_RECORD_ID
zenodraft deposition create in-existing-collection $CONCEPT_RECORD_ID

zenodraft --sandbox deposition delete $RECORD_ID
zenodraft deposition delete $RECORD_ID

zenodraft --sandbox deposition get-details $RECORD_ID
zenodraft deposition get-details $RECORD_ID

zenodraft --sandbox deposition publish $RECORD_ID
zenodraft deposition publish $RECORD_ID

zenodraft --sandbox file add $RECORD_ID file.txt
zenodraft file add $RECORD_ID file.txt

zenodraft --sandbox file delete $RECORD_ID file.txt
zenodraft file delete $RECORD_ID file.txt

zenodraft --sandbox metadata update $RECORD_ID
zenodraft metadata update $RECORD_ID
```


Create your personal access token at

- https://sandbox.zenodo.org/account/settings/applications/

Create a file named `.env` by 

```shell
cp example.env .env
```

and update its contents like so:

```text
ZENODO_SANDBOX_ACCESS_TOKEN=<your access token for zenodo sandbox>
ZENODO_ACCESS_TOKEN=
```

Requirements:

- node (I'm using v14, other versions may work)
- npm (I'm using v7, other versions may work)

Install the dependencies with

```shell
npm install
```

Generate the JavaScript from the TypeScript with

```shell
tsc -p tsconfig.json
```

Run the tool (note: will generate entries on Zenodo Sandbox https://sandbox.zenodo.org/deposit)

```shell
node build/index.js
```
