import Base from 'ember-fetch-service/services/fetch';
import ky from 'ky';

export default Base.extend({ kyRef: ky });
