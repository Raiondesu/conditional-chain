module.exports = function cond(value) {
  function chain(f) {
    return cond(f(value))
  }

  return {
    if (condition, thenF, elseF) {
      return cond(condition ? thenF(value) : (
        elseF ? elseF(value) : value
      ))
    },
    chain: chain,
    pipe: chain,
    end: value
  }
}
