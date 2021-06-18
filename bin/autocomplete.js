#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

(async () => {
    f = path.join(__dirname, '..', 'assets', 'autocomplete.sh');
    s = await fs.promises.readFile(f, 'utf-8');
    console.log(s);
})()
