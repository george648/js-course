const clearObjectValues = (obj) => {
  for (let key in obj) {
    obj[key] = ''
  }
}

export default clearObjectValues