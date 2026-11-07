const { test, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('./app');

let server;
let base;

before(() => new Promise((resolve) => {
  server = app.listen(0, () => {
    base = `http://localhost:${server.address().port}`;
    resolve();
  });
}));

after(() => server.close());

test('GET /health responde 200 y status ok', async () => {
  const res = await fetch(`${base}/health`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.status, 'ok');
});

test('GET / muestra el título', async () => {
  const res = await fetch(`${base}/`);
  const text = await res.text();
  assert.ok(text.includes('Hola CI/CD'));
});