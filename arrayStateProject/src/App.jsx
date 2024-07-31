import { useState } from "react"

const INITIAL_VALUE = ["A", "B", "C"]

const App = () => {
  const [array, setArray] = useState(INITIAL_VALUE)
  const [value, setValue] = useState("")

  const removeFirst = () => {
    setArray(currentArray => {
      return currentArray.slice(1)
    })
  }

  const removeSpecific = letter => {
    setArray(currentArray => {
      return currentArray.filter(el => el !== letter)
    })
  }

  const addToStart = letter => {
    setArray(currentArray => {
      return [letter, ...currentArray]
    })
  }

  const addToEnd = letter => {
    setArray(currentArray => {
      return [...currentArray, letter]
    })
  }

  const clearALl = () => {
    setArray([])
  }

  const reset = () => {
    setArray(currentArray => {
      return INITIAL_VALUE
    })
  }

  const updateAToH = () => {
    setArray(currentArray => {
      return currentArray.map(el => {
        if (el === "A") return "H"

        return el
      })
    })
  }

  const addLetterAtIndex = (letter, index) => {
    setArray(currentArray => {
      return [
        ...currentArray.slice(0, index),
        letter,
        ...currentArray.slice(index)
      ]
    })
  }

  return (
    <>
      <button onClick={removeFirst}>Remove First Element</button>
      <br />
      <button onClick={() => removeSpecific("B")}>Remove All Bs</button>
      <br />
      <button onClick={() => addToStart("B")}>Add to the Start</button>
      <br />
      <button onClick={() => addToEnd("Z")}>Add to the End</button>
      <br />
      <button onClick={clearALl}>Clear</button>
      <br />
      <button onClick={reset}>Reset</button>
      <br />
      <button onClick={updateAToH}>Update A to H</button>
      <br />
      <button onClick={() => addLetterAtIndex("S", 4)}>Add S at 4</button>
      <br />
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <button onClick={() => addToStart(value)}>Add Value to Start</button>
      <br />
      <br />
      {array.join(",")}
    </>
  )
}

export default App
