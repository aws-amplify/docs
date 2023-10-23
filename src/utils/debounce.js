export function debounce(func, timeout = 200) {
  let timer;

  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}
