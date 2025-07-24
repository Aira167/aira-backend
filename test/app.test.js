const { test } = require('node:test');
const assert = require('node:assert');

const app = require('../index');

test('app should be a function', () => {
  assert.strictEqual(typeof app, 'function');
});
