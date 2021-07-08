#! /usr/bin/env node
const fs = require('fs');
const path = require('path');

(async () => {
    const f = path.join(__dirname, '..', 'assets', 'autocomplete.sh');
    const s = await fs.promises.readFile(f, 'utf-8');
    console.log(s);
})()
