import { useState, useCallback } from "react"

const useArray = initialArr => {
  const [array, setArray] = useState(initialArr)

  const push = useCallback(element => {
    setArray(currentArray => [...currentArray, element])
  }, [])

  //   const replace = (index, element) => {
  //     setArray(currentArray => {
  //       return currentArray.map((e, i) => {
  //         if (i === index) return element
  //         return e
  //       })
  //     })
  //   }
  const replace = useCallback((index, element) => {
    setArray(currentArray => {
      return [
        ...currentArray.slice(0, index),
        element,
        ...currentArray.slice(index + 1)
      ]
    })
  }, [])

  const filter = useCallback(callback => {
    setArray(currentArray => {
      return currentArray.filter(callback)
    })
  }, [])

  //   const remove = index => {
  //     setArray(currentArray => {
  //       return currentArray.map((e, i) => {
  //         if (i === index) return
  //         return e
  //       })
  //     })
  //   }
  const remove = useCallback(index => {
    setArray(currentArray => {
      return [...currentArray.slice(0, index), ...currentArray.slice(index + 1)]
    })
  }, [])

  const clear = useCallback(() => {
    setArray([])
  }, [])

  const reset = useCallback(() => {
    setArray(initialArr)
  }, [initialArr])

  return { array, set: setArray, push, replace, filter, remove, clear, reset }
}

export default useArray
