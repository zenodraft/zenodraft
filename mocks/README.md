| mock id         | type       | concept status | deposition status | saveable | publishable | from   | description |
| :--             | :--        | :--            | :--               | :--      | :--         | :--    | :--         |
| 100             | concept    | draft          | &nbsp;            | &nbsp;   | &nbsp;      | -      | &nbsp; |
| [101](101.json) | deposition | &nbsp;         | unsubmitted       | no       | no          | -      | deposition in a concept that did not previously exist |
| &nbsp;          | &nbsp;     | &nbsp;         | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| 110             | concept    | draft          | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| [111](111.json) | deposition | &nbsp;         | unsubmitted       | yes      | no          | 101    | 101 with metadata added |
| &nbsp;          | &nbsp;     | &nbsp;         | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| 120             | concept    | draft          | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| [121](121.json) | deposition | &nbsp;         | unsubmitted       | yes      | yes         | 111    | 111 with file added |
| &nbsp;          | &nbsp;     | &nbsp;         | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| 130             | concept    | no draft       | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| [131](131.json) | deposition | &nbsp;         | done              | yes      | yes         | 121    | 121 but published |
| &nbsp;          | &nbsp;     | &nbsp;         | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| 140             | concept    | no draft       | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| [141](141.json) | deposition | &nbsp;         | inprogress        | yes      | yes         | 131    | 131 but editing |
| &nbsp;          | &nbsp;     | &nbsp;         | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| 150             | concept    | draft          | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| [151](151.json) | deposition | &nbsp;         | done              | yes      | yes         | _131_  | &nbsp; |
| [152](152.json) | deposition | &nbsp;         | unsubmitted       | yes      | no          | 151    | 151.newversion(), with minimal metadata, and files removed |
| &nbsp;          | &nbsp;     | &nbsp;         | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| 160             | concept    | draft          | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| [161](161.json) | deposition | &nbsp;         | done              | yes      | yes         | _131_  | &nbsp; |
| [162](162.json) | deposition | &nbsp;         | unsubmitted       | yes      | yes         | 152    | 152 with file added |
| &nbsp;          | &nbsp;     | &nbsp;         | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| 170             | concept    | no draft       | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| [171](171.json) | deposition | &nbsp;         | done              | yes      | yes         | _131_  | &nbsp; |
| [172](172.json) | deposition | &nbsp;         | done              | yes      | yes         | 162    | 162 but published |
| &nbsp;          | &nbsp;     | &nbsp;         | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| 180             | concept    | no draft       | &nbsp;            | &nbsp;   | &nbsp;      | &nbsp; | &nbsp; |
| [181](181.json) | deposition | &nbsp;         | done              | yes      | yes         | _131_  | &nbsp; |
| [182](182.json) | deposition | &nbsp;         | inprogress        | yes      | yes         | 172    | 172 but editing |


- **saveable**: deposition has enough metadata to be saveable via Zenodo's frontend
- **publishable**: saveable + has at least one file
- when a concept is marked `draft`, all its depostions include the key `links.latest_draft` and `links.latest_draft_html`
