import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import Pretender from 'pretender';
import ky from 'ky';

module('Unit | Service | fetch', function(hooks) {
  setupTest(hooks);

  let server;
  hooks.beforeEach(function() {
    server = new Pretender();
  });
  hooks.afterEach(function() {
    server.shutdown();
  });

  test('it can fetch a simple text', async function(assert) {
    let service = this.owner.lookup('service:fetch');

    server.get('/network', () => [200, {}, 'hello network']);
    const req = await service.fetch('/network');

    assert.equal(req.status, 200, 'Status code is ok');
    assert.equal(await req.text(), 'hello network', 'Status code is ok');
  });

  test('it can fetch an error', async function(assert) {
    let service = this.owner.lookup('service:fetch');

    server.get('/network', () => [500, {}, '']);
    const req = await service.fetch('/network');

    assert.equal(req.status, 500, 'Status code is ok');
  });


  test('it can send headers', async function(assert) {
    let service = this.owner.lookup('service:fetch');
    server.get('/network', request => [
      request.requestHeaders['a-header'] === 'a-value' ? 200 : 500,
      {},
      ''
    ]);

    const req = await service.fetch('/network', {
      headers: { 'A-Header': 'a-value' },
    });

    assert.equal(req.status, 200, 'Status code is ok');
  });

  test('it attaches headers from the service', async function(assert) {
    let service = this.owner.lookup('service:fetch');
    service.set('headers', {
      'Service-Header': 'service-header-val',
    });

    server.get('/network', request => [
      request.requestHeaders['service-header'] === 'service-header-val' ? 200 : 500,
      {},
      ''
    ]);

    const req = await service.fetch('/network');
    assert.equal(req.status, 200, 'Status code is ok');
  });

  test('it correctly merges the headers', async function(assert) {
    let service = this.owner.lookup('service:fetch');
    service.set('headers', {
      'Service-Header': 'service-header-val',
    });

    server.get('/network', request => [
      request.requestHeaders['a-header'] === 'a-value' &&
      request.requestHeaders['service-header'] === 'service-header-val'
        ? 200 : 500,
      {},
      ''
    ]);

    const req = await service.fetch('/network', {
      headers: { 'A-Header': 'a-value' },
    });

    assert.equal(req.status, 200, 'Status code is ok');
  });

  test('it correctly overwrites a header', async function(assert) {
    let service = this.owner.lookup('service:fetch');
    service.set('headers', {
      'a-header': 'one',
    });

    server.get('/network', request => [
      request.requestHeaders['a-header'] === 'two' ? 200 : 500,
      {},
      ''
    ]);

    const req = await service.fetch('/network', {
      headers: { 'a-header': 'two' },
    });

    assert.equal(req.status, 200, 'Status code is ok')
  });

  test('it can ky a simple text', async function(assert) {
    let service = this.owner.lookup('service:fetch');
    service.set('kyRef', ky);

    server.get('/network', () => [200, {}, 'hello network']);
    // const req = await service.ky('/network');
    const req = await ky('/network');

    assert.equal(req.status, 200, 'Status code is ok');
    assert.equal(await req.text(), 'hello network', 'Status code is ok');
  });
});
