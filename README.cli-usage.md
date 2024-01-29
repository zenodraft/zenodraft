# CLI Usage

The usage examples below differentiate between an identifier for the concept `CONCEPT_ID` and
the identifier for a depostion `VERSION_ID`.

You can get these numbers from the Zenodo page of your deposition:

![zenodo-versions-widget](/img/zenodo-versions-widget.png)

All commands require an access token, [see the section in the main README](README.md#access-tokens).

## Creating new draft depositions

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

## Deleting a draft version

```shell
zenodraft deposition delete --sandbox $VERSION_ID
zenodraft deposition delete $VERSION_ID
```

## Publishing a draft version

```shell
zenodraft deposition publish --sandbox $VERSION_ID
zenodraft deposition publish $VERSION_ID
```

## Getting the details of a version

```shell
zenodraft deposition show details --sandbox $VERSION_ID
zenodraft deposition show details $VERSION_ID
```

## Getting the id of a draft version in a concept

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

## Getting the list of filenames of a version

```shell
zenodraft deposition show files --sandbox $VERSION_ID
zenodraft deposition show files $VERSION_ID
```

## Getting the prereserved doi for a version:

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

## Adding a local file to an existing draft version:

```shell
zenodraft file add --sandbox $VERSION_ID file.txt
zenodraft file add $VERSION_ID file.txt
```

## Removing a file from an existing draft version

```shell
zenodraft file delete --sandbox $VERSION_ID file.txt
zenodraft file delete $VERSION_ID file.txt
```

## Clearing a version's metadata

```shell
zenodraft metadata clear --sandbox $VERSION_ID
zenodraft metadata clear $VERSION_ID
```

## Updating a version with metadata from a local file

```shell
zenodraft metadata update --sandbox $VERSION_ID .zenodo.json
zenodraft metadata update $VERSION_ID .zenodo.json
```

The file needs to be a valid JSON file in Zenodo metadata format. A JSONschema for the upload metadata file is available
here: https://github.com/zenodraft/zenodo-upload-metadata-schema. Use https://jsonlint.com/ to check if your document is
valid JSON, then use a JSONschema linter like https://jsonschemalint.com to check if the JSON is compliant with the
aforementioned schema.
