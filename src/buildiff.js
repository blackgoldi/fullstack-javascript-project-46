const isObject = value =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const buildDiff = (obj1, obj2) => {
  const keys = new Set([...Object.keys(obj1), ...Object.keys(obj2)].sort((a, b) => a.localeCompare(b)))
  console.log(keys)
  return Array.from(keys).map((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (!Object.hasOwn(obj2, key)) {
      return { type: 'removed', key, value: value1 }
    }
    if (!Object.hasOwn(obj1, key)) {
      return { type: 'added', key, value: value2 }
    }

    if (isObject(value1) && isObject(value2)) {
      return {
        type: 'nested',
        key,
        children: buildDiff(value1, value2),
      }
    }

    if (value1 !== value2) {
      return {
        type: 'changed',
        key,
        oldValue: value1,
        newValue: value2,
      }
    }

    return { type: 'unchanged', key, value: value1 }
  })
}

export default buildDiff
