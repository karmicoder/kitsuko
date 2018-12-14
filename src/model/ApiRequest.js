import Pager from './Pager';

const DEFAULTS = {
  method: 'get'
};

const SERIALIZED_FIELDS = [
  'filter',
  'sort',
  'page',
  'include',
  'animeId'
]

export default class ApiRequest {
  constructor(src) {
    Object.assign(this, DEFAULTS, src);

    if (this.page && !(this.page instanceof Pager)) {
      this.page = new Pager(this.page);
    }
  }

  get id() {
    return this.name || this.path;
  }
  /**
   * Generates an object that should be sent as the payload of the request.
   * If a property on {ApiRequest} should be sent in the request body (or querystring of get requests),
   * it should be defined here.
   * @return {Object} the request payload
   */
  payload() {
    const result = {};
    SERIALIZED_FIELDS.forEach((field) => {
      if (this[field] != null) {
        result[field] = this[field];
      }
    });
    return result;
  }

}
