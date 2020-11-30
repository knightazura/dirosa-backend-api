const assert = require('assert');
const app = require('../../src/app');

describe('\'halaqah\' service', () => {
  it('registered the service', () => {
    const service = app.service('halaqah');

    assert.ok(service, 'Registered the service');
  });
});
