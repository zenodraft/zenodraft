# CLI Usage

## Overview

```shell
zenodraft [--sandbox] deposition create concept
zenodraft [--sandbox] deposition create version <concept_id>
zenodraft [--sandbox] deposition delete <record_id>
zenodraft [--sandbox] deposition publish <record_id>
zenodraft [--sandbox] deposition show details <record_id>
zenodraft [--sandbox] deposition show draft <concept_id>
zenodraft [--sandbox] deposition show files <record_id>
zenodraft [--sandbox] deposition show latest <concept_id>
zenodraft [--sandbox] deposition show prereserved <record_id>
zenodraft [--sandbox] file add <record_id> <local filename>
zenodraft [--sandbox] file delete <record_id> <remote filename>
zenodraft [--sandbox] metadata clear <record_id>
zenodraft [--sandbox] metadata update <record_id> <local filename>
```

## Examples

The usage examples below differentiate between an identifier for the concept `CONCEPT_ID` and
the identifier for a depostion `RECORD_ID`.

```shell
CONCEPT_ID=123456
RECORD_ID=123457
```

You can get these numbers from the Zenodo page of your deposition:

![zenodo-versions-widget](/img/zenodo-versions-widget.png)

All commands require an access token, [see the section in the main README](README.md#access-tokens).

### Creating new draft depositions

As the first version in a new concept:

```shell
zenodraft --sandbox deposition create concept
zenodraft deposition create concept
```

As a new version in an existing concept:

```shell
zenodraft --sandbox deposition create version $CONCEPT_ID
zenodraft deposition create version $CONCEPT_ID
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

### Getting the id of a draft deposition in a concept

```shell
zenodraft --sandbox deposition show draft $CONCEPT_ID
zenodraft deposition show draft $CONCEPT_ID
```

Either returns the id of the draft deposition, or an empty string in case there is no draft deposition in the concept.

Typical usage in automation is to capture the printed value like so:

```shell
RECORD_ID=$(zenodraft --sandbox deposition show draft $CONCEPT_ID)
RECORD_ID=$(zenodraft deposition show draft $CONCEPT_ID)
```

### Getting the list of filenames of a deposition

```shell
zenodraft --sandbox deposition show files $RECORD_ID
zenodraft deposition show files $RECORD_ID
```

### Getting the deposition id for the latest published version in a concept

```shell
zenodraft --sandbox deposition show latest $CONCEPT_ID
zenodraft deposition show latest $CONCEPT_ID
```

Either returns the id of the latest published deposition in the concept, or an empty string in case there are no published depositions in the concept.

Typical usage in automation is to capture the printed value like so:

```shell
RECORD_ID=$(zenodraft --sandbox deposition show latest $CONCEPT_ID)
RECORD_ID=$(zenodraft deposition show latest $CONCEPT_ID)
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

The file needs to be a valid JSON file in Zenodo metadata format. A JSONschema for the upload metadata file is available
here: https://github.com/zenodraft/zenodo-upload-metadata-schema. Use https://jsonlint.com/ to check if your document is
valid JSON, then use a JSONschema linter like https://jsonschemalint.com to check if the JSON is compliant with the
aforementioned schema.
