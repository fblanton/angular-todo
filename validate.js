module.exports = (action, input) => {
  switch (action) {
    case 'CREATE':
      const keys = Object.keys(input)
      return keys.length === 2 &&
             typeof input.completed !== 'undefined' &&
             typeof input.task !== 'undefined'
    default:
      return false
  }
}
