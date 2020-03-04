export function* iterateIn(array, times) {
  for (let i = 0; i < array.length; i += times) {
    const ret = array.slice(i, i + times);
    yield ret;
  }
}
