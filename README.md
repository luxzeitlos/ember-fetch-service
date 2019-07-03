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


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
