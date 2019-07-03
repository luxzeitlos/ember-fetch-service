import Service from '@ember/service';
import fetch from 'fetch';

export default Service.extend({
  fetch(url, init = {}) {
    return fetch(url, {
      ...init,
      headers: {
        ...(this.headers || {}),
        ...(init.headers || {}),
      }
    });
  }
});
