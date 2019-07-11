'use strict';

module.exports = {
  description: 'configures ember-fetch-service to use ky',
  afterInstall() {
    return this.addAddonsToProject({
      packages: [
        {name: 'ember-auto-import'}
      ]
    }).then(() => this.addPackagesToProject([
      {name: 'ky'},
    ]));
  }
};
