module.exports = function cond(value) {
  function chain(f) {
    return cond(f(value))
  }

  return {
    if (c, thenF, elseF) {
      var condition = typeof c === 'function' ? c(value) : c;

      return cond(condition ? thenF(value) : (
        elseF ? elseF(value) : value
      ))
    },
    chain: chain,
    pipe: chain,
    get end() { return value; },
    get result() { return value; }
  }
}
