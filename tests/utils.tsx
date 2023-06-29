//Local storage mock
//taken from: https://robertmarshall.dev/blog/how-to-mock-local-storage-in-jest-tests/
const localStorageMock = function () {
  let store = {}

  return {
    getItem(key: string) {
      return store[key]
    },
    setItem(key: string, value: string) {
      store[key] = value
    },
    getAll() {
      return store
    },
    clear() {
      store = {}
    }
  }
}

export default localStorageMock
