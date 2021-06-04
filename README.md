Functionality (works for either Zenodo or Zenodo Sandbox):

- [`create_empty_deposition_in_existing_collection`](src/create-empty-deposition-in-existing-collection.ts): create a new draft deposition in a new collection
- [`add_file_to_deposition`](src/add-file-to-deposition.ts): upload files to an existing draft deposition
- [`update_deposition_metadata`](src/update-deposition-metadata.ts): update a deposition's metadata
- [`delete_draft_deposition`](src/delete-draft-deposition.ts): delete a draft of a deposition
- [`publish_draft_deposition`](src/publish-draft-deposition.ts): publish a pre-existing draft of a deposition
- [`get_deposition_details`](src/get-deposition-details.ts): get details for a deposition


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
