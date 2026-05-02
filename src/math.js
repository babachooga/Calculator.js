const factorial = (num) => {
  const iterator = (n, acc) => {
    if (n <= 1) {
      return acc
    }
    return iterator(n - 1, acc * n)
  }
  return iterator(num, 1)
}

export { factorial }
