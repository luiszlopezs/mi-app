const express = require('express');
const app = express();

const VERSION = process.env.APP_VERSION || 'dev';

app.get('/', (req, res) => {
  res.send(`<h1>Hola c1/c2</h1><p>Versión: ${VERSION}</p>`);
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', version: VERSION });
});

module.exports = app;