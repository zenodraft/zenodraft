# `zenodraft` as a library

## Using CommonJS `require`

Make a file e.g. `index.js` with the following contents:

```javascript
// file: index.js
const zenodraft = require('zenodraft');
console.info(zenodraft);
```

Running

```shell
$ node index.js
```

should output

```shell
{
  cli: [Getter],
  deposition_create_concept: [Getter],
  deposition_create_version: [Getter],
  deposition_delete: [Getter],
  deposition_publish: [Getter],
  deposition_show_details: [Getter],
  deposition_show_draft: [Getter],
  deposition_show_files: [Getter],
  deposition_show_prereserved: [Getter],
  file_add: [Getter],
  file_delete: [Getter],
  helpers_get_access_token_from_environment: [Getter],
  helpers_get_api: [Getter],
  metadata_update: [Getter]
}
```

## Using ES6 `import`

Make a file e.g. `index.mjs` with the following contents (you may use a different filename but the extension needs to be `.mjs`):

```javascript
// file: index.mjs
import zenodraft from 'zenodraft';
console.info(zenodraft);
```

Running

```shell
# node v14
node index.mjs

# node v12
node --experimental-modules index.mjs
```

should output the same as listed above for `require`.
