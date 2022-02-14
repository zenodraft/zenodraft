# CLI Usage

## Outline of the CLI structure

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
│       ├── draft <collection_id>
│       ├── files <id>
│       ├── latest <collection_id>
│       └── prereserved <id>
├── file
│   ├── add <id> <local filename>
│   └── delete <id> <remote filename>
└── metadata
    ├── clear <id>
    └── update <id> <local filename>
```

## Examples

The usage examples below differentiate between an identifier for the concept/collection `CONCEPT_RECORD_ID` and
the identifier for a depostion `RECORD_ID`. All commands require an access token, [see the section in the main README](README.md#access-tokens).

```shell
CONCEPT_RECORD_ID=123456
RECORD_ID=123457
```

### Creating new draft depositions

As the first version in a new collection:

```shell
zenodraft --sandbox deposition create in-new-collection
zenodraft deposition create in-new-collection
```

As a new version in an existing collection:

```shell
zenodraft --sandbox deposition create in-existing-collection $CONCEPT_RECORD_ID
zenodraft deposition create in-existing-collection $CONCEPT_RECORD_ID
```

### Deleting a draft deposition

```shell
zenodraft --sandbox deposition delete $RECORD_ID
zenodraft deposition delete $RECORD_ID
```

### Publishing a draft deposition

```shell
zenodraft --sandbox deposition publish $RECORD_ID
zenodraft deposition publish $RECORD_ID
```

### Getting the details of a deposition

```shell
zenodraft --sandbox deposition show details $RECORD_ID
zenodraft deposition show details $RECORD_ID
```

### Getting the id of a draft deposition in a collection

```shell
zenodraft --sandbox deposition show draft $CONCEPT_RECORD_ID
zenodraft deposition show draft $CONCEPT_RECORD_ID
```

Either returns the id of the draft deposition, or an empty string in case there is no draft deposition in the collection.

Typical usage in automation is to capture the printed value like so:

```shell
DRAFT_ID=$(zenodraft --sandbox deposition show draft $CONCEPT_RECORD_ID)
DRAFT_ID=$(zenodraft deposition show draft $CONCEPT_RECORD_ID)
```

### Getting the list of filenames of a deposition

```shell
zenodraft --sandbox deposition show files $RECORD_ID
zenodraft deposition show files $RECORD_ID
```

### Getting the deposition id for the latest published version in a collection

```shell
zenodraft --sandbox deposition show latest $CONCEPT_RECORD_ID
zenodraft deposition show latest $CONCEPT_RECORD_ID
```

Either returns the id of the latest published deposition in the collection, or an empty string in case there are no published depositions in the collection.

Typical usage in automation is to capture the printed value like so:

```shell
LATEST_ID=$(zenodraft --sandbox deposition show latest $CONCEPT_RECORD_ID)
LATEST_ID=$(zenodraft deposition show latest $CONCEPT_RECORD_ID)
```

### Getting the prereserved doi for a deposition:

```shell
zenodraft --sandbox deposition show prereserved $RECORD_ID
zenodraft deposition show prereserved $RECORD_ID
```

Returns the prereserved doi of the deposition with id `$RECORD_ID`.

Typical usage in automation is to capture the printed value like so:

```shell
PRERESERVED=$(zenodraft --sandbox deposition show prereserved $RECORD_ID)
PRERESERVED=$(zenodraft deposition show prereserved $RECORD_ID)
```

### Adding a local file to an existing draft deposition:

```shell
zenodraft --sandbox file add $RECORD_ID file.txt
zenodraft file add $RECORD_ID file.txt
```

### Removing a file from an existing draft deposition

```shell
zenodraft --sandbox file delete $RECORD_ID file.txt
zenodraft file delete $RECORD_ID file.txt
```

### Clearing a deposition's metadata

```shell
zenodraft --sandbox metadata clear $RECORD_ID 
zenodraft metadata clear $RECORD_ID
```

### Updating a deposition with metadata from a local file

```shell
zenodraft --sandbox metadata update $RECORD_ID .zenodo.json
zenodraft metadata update $RECORD_ID .zenodo.json
```

The file needs to be a valid JSON file in Zenodo metadata format.

