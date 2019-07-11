ember-fetch-service
==============================================================================

Alternative to `ember-ajax` that uses the `fetch` API provided by `ember-fetch` instead of `jQuery`.
Currently this addon has significantly less features then `ember-ajax`.


Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-fetch-service
```


Usage
------------------------------------------------------------------------------

This addon provides a `fetch` service that can be injected.
The `fetch` addon has a method `fetch` that implements the `fetch` API:

```
import { inject as service } from '@ember/service';

export default Component.extend({
  fetch: service(),
  actions: {
    async doSomething() {
      const res = await this.fetch.fetch('/data');
      console.log(await res.text());
    }
  }
});

```

## custom headers

To implement custom headers the `fetch` service can be overwritten:

```
// app/services/fetch.js

import Ember from 'ember';
import FetchService from 'ember-fetch-service/services/fetch';

export default FetchService.extend({
  session: Ember.inject.service(),
  headers: Ember.computed('session.authToken', {
    get() {
      let headers = {};
      const authToken = this.get('session.authToken');
      if (authToken) {
        headers['auth-token'] = authToken;
      }
      return headers;
    }
  })
});
```

Any headers specified with the `fetch()` call will overwrite headers specified on the service.


## using `ky`
`ember-fetch-service` can use [`ky`](https://github.com/sindresorhus/ky) to add a more high-level fetch api. This is opt-in and can be enabled with `ember generate ember-fetch-service-use-ky`.

This will

1. install `ember-auto-import`
2. install `ky`
3. generate a file `app/services/fetch.js` that imports `ky` and gives it to the `fetch` service

this will expose a `ky` property on the `fetch` service. The result object can be used like `ky`, and also exposes the additional shortcut methods allowing things like `this.fetch.ky.put(...)`.

However the `ky` property is only a proxy to the original `ky` and does *not* expose `create` or `extend`. Only the direct function call and the HTTP method named properties are supported.

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
