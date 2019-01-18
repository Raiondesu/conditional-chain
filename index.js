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
    try (f) {
      var res

      try {
        res = cond(f(value))

        res.catch = function catchF() {
          return cond(value)
        }
      } catch (e) {
        res = cond(value)

        res.catch = function catchF(f) {
          return f(e, value)
        }
      } finally {
        return res
      }
    },
    chain: chain,
    pipe: chain,
    end() { return value },
    get _() { return value; }
  }
}
