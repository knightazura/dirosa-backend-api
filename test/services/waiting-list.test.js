const assert = require('assert');
const app = require('../../src/app');

describe('\'waiting-list\' service', () => {
  it('registered the service', () => {
    const service = app.service('waiting-list');

    assert.ok(service, 'Registered the service');
  });
});
