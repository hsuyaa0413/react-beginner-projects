import { useState } from "react"

const FunctionComponent = () => {
  const [name, setName] = useState("John Doe")
  const [age, setAge] = useState(0)

  const decreaseAge = () => {
    setAge(currentAge => currentAge - 1)
  }

  const increaseAge = () => {
    setAge(currentAge => currentAge + 1)
  }

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={e => {
          setName(e.target.value)
        }}
      />
      <br />
      <br />
      <button onClick={decreaseAge}>-</button>
      {age}
      <button onClick={increaseAge}>+</button>

      <p>
        I am {name} and I'm {age} years old.
      </p>
    </>
  )
}

export default FunctionComponent
