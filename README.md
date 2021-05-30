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

```shell
npm install
tsc -p tsconfig.json
node build/index.js
```
