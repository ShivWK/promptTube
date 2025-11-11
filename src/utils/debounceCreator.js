function debounceCreator(func, delay) {
  let timer = null;

  return (...args) => {
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay)
  }
}

export default debounceCreator;