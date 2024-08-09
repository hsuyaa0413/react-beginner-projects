import { useState } from "react"
import { Child } from "./Child"

export default function App() {
  const [show, setShow] = useState(true)

  const childComponent = show ? <Child /> : null

  return (
    <>
      <button onClick={() => setShow(s => !s)}>Show/Hide</button>
      <br />
      <br />
      {childComponent}
    </>
  )
}
