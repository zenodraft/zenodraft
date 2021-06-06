# `zenodraft`

CLI to manage depositions on Zenodo or Zenodo Sandbox.

## Outline of the CLI structure

```plain
zenodraft [--sandbox]
├── deposition
│   ├── create
│   │   ├── in-existing-collection <collection_id>
│   │   └── in-new-collection
│   ├── delete <id>
│   ├── get-details <id>
│   └── publish <id>
├── file
│   ├── add <id> <filename>
│   └── delete <id> <filename>
└── metadata
    └── update <id>
```

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

## Install

Requirements:

- node (I'm using v14, other versions may work)
- npm (I'm using v7, other versions may work)

Install with

```shell
npm install -g git+https://github.com/jspaaks/zenodraft
which zenodraft    # should now point to the program
```

## Access tokens

To use `zenodraft`, a personal access token is required. These are stored in a file `.env`. Create it by making
a copy of the example file, like so

```shell
cp example.env .env
```

Then update its contents like so

```text
export ZENODO_SANDBOX_ACCESS_TOKEN=<your access token for zenodo sandbox>
export ZENODO_ACCESS_TOKEN=<your access token for zenodo>
```

Fill in the placeholders with values of your own, which you can get at

- Zenodo Sandbox: https://sandbox.zenodo.org/account/settings/applications/
- Zenodo: https://zenodo.org/account/settings/applications/

You only need tokens for the platforms you plan on using.
