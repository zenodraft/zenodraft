| mock id         | type    | `"state"`   | `"submitted"` | description                                                |
| :--             | :--     | :--         | :--           | :--                                                        |
| 100             | concept | &nbsp;      | &nbsp;        |                                                            |
| [101](101.json) | version | unsubmitted | false         | deposition in a concept that did not previously exist      |
| [111](111.json) | version | unsubmitted | false         | 101 with metadata added                                    |
| [121](121.json) | version | unsubmitted | false         | 111 with file added                                        |
| [131](131.json) | version | done        | true          | 121 but published                                          |
| [141](141.json) | version | inprogress  | true          | 131 but editing                                            |
| [151](151.json) | version | unsubmitted | false         | 131.newversion(), with minimal metadata, and files removed |

Zenodo metadata file:

```json
{
    "access_right": "open",
    "creators": [
        "name": "Family name, Given names"
    ],
    "description": "This is the description",
    "license": "CC-BY-4.0",
    "title": "The title"
}
```

## `101.json..111.json`

Adding metadata:

1. adds `.metadata.creators` with value from metadata file
1. adds `.metadata.description` with value from metadata file
1. adds `.metadata.imprint_publisher` with value `"Zenodo"`
1. adds `.metadata.license` with value from metadata file
1. adds `.metadata.publication_date` using today's date
1. adds `.metadata.title` with value from metadata file
1. adds `.metadata.upload_type` with value `"other"`
1. changes `.title` with value from metadata file

## `111.json..121.json`

Adding a file:

1. changes `.files` from empty list to list of object with keys:
    1. `checksum`
    1. `filename`
    1. `filesize`
    1. `id`
    1. `links`
        1. `download`
        1. `se1f`

## `121.json..131.json`

Publishing a deposition:

1. adds `.conceptdoi`
1. adds `.doi`
1. adds `.doi_url`
1. changes `.files[].links.self` from deposition link to records link
1. changes `links.badge`
1. adds `links.conceptbadge`
1. adds `links.doi`
1. changes `links.files` from deposit link to records link
1. changes `links.html` from deposit link to records link
1. adds `links.latest` with a record link
1. adds `links.latest_html` with a record link
1. adds `links.parent_doi`
1. adds `links.record` with a record link
1. adds `links.record_html` with a record link
1. changes `links.self` from deposit link to records link
1. changes `.state` from `"unsubmitted"` to `"done"`
1. changes `.submitted` from `false` to `true`

## `131.json..141.json`

Editing a previously published deposition:

1. changes `.files[].self` from a records link to a depositions link
1. removes `.links.conceptbadge`
1. changes `.links.files` from a records link to a depositions link
1. changes `.links.html` from a records link to a depositions link
1. removes `.links.parent_doi`
1. changes `.links.self` from a records link to a depositions link
1. changes `.state` from `"done"` to `"inprogress"`

## `131.json..151.json`

Creating a new version of a previously published deposition:

1. removes `.doi`
1. removes `.doi_url`
1. changes `.files` to an empty list
1. changes `.links.badge`
1. changes `.links.bucket`
1. removes `.links.conceptbadge`
1. removes `.links.doi`
1. changes `.links.files` from a records link to a depositions link
1. changes `.links.html` from a records link to a depositions link
1. removes `.links.latest`
1. removes `.links.latest_html`
1. removes `.links.record`
1. removes `.links.record_html`
1. removes `.metadata.creators`
1. changes `.metadata.description`
1. removes `.metadata.doi`
1. changes `.metadata.title`
1. changes `.state` from `"done"` to `"unsubmitted"`
1. changes `.submitted` from `true` to `false`
1. changes `.title`
