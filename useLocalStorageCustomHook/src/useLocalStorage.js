import { useEffect, useState } from "react"

const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key)

    if (localValue) return JSON.parse(localValue)

    if (typeof initialValue === "function") return initialValue()

    return initialValue
  })

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }, [value, key])

  return [value, setValue]
}

export default useLocalStorage
