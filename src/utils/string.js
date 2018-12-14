export function stringCoalesce(...args) {
  for (let arg of args) {
    if (typeof arg === 'string' && arg !== '') {
      return arg;
    }
  }
  return null;
}
