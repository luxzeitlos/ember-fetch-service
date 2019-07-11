import Service from '@ember/service';
import fetch from 'fetch';
import { computed } from '@ember/object';

function decorate(service, fn, ctx) {
  return (url, init = {}) => fn.call(ctx, url, {
    ...init,
    headers: {
      ...(service.headers || {}),
      ...(init.headers || {}),
    }
  })
}

export default Service.extend({
  fetch: computed(function() {
    return decorate(this, fetch, undefined);
  }),
  // fetch(url, init = {}) {
  //   return fetch(url, {
  //     ...init,
  //     headers: {
  //       ...(this.headers || {}),
  //       ...(init.headers || {}),
  //     }
  //   });
  // },
  ky: computed('kyRef', function() {
    const wrapper = decorate(this, this.kyRef, undefined);
    ['get', 'post', 'put', 'patch', 'head', 'delete'].forEach(key => {
      wrapper[key] = decorate(this, this.kyRef[key], this.kyRef);
    });
    return wrapper;
  }),
});
