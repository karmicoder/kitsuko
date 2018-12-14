export default class Pager {
  constructor(src) {
    Object.assign(this, src);
  }

  next() {
    this.offset += this.limit;
  }
}
