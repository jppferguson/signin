const express = require('express');

const app = express();
const path = require('path');

const root = `${__dirname}/../../`;

app.use(express.static(path.join(root, 'dist')));

let port = process.env.PORT || (process.argv[2] || 3000);
port = (typeof port !== 'number') ? port : 3000;

if (!module.parent) { app.listen(port); }

console.log(`Application started: http://localhost:${port}`); // eslint-disable-line no-console
