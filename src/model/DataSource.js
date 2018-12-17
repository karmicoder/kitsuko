import ApiRequest from './ApiRequest';

export default class DataSource {
  constructor(src) {
    Object.assign(this, src);
    this._data = null;

    if (!(this.request instanceof ApiRequest)) {
      this.request = new ApiRequest(this.request);
    }
  }

  get data() {
    return this._data;
  }

  get meta() {
    return this._meta;
  }

  get rowCount() {
    return this.meta ? this.meta.rows : 0;
  }

  receiveResponse(resp) {
    this._data = resp.data;
    this._meta = resp.meta;
  }
}
