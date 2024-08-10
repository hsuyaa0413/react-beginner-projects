import "./styles.css"
import { useState, useRef } from "react"
import { checkEmail, checkPassword } from "./validators"

const RefForm = () => {
  const emailRef = useRef()
  const passwordRef = useRef()

  const [emailErrors, setEmailErrors] = useState([])
  const [passwordErrors, setPasswordErrors] = useState([])

  const [isAfterFirstSubmit, setIsAfterFirstSubmit] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setIsAfterFirstSubmit(true)

    const emailResults = checkEmail(emailRef.current.value)
    const passwordResults = checkPassword(passwordRef.current.value)

    setEmailErrors(emailResults)
    setPasswordErrors(passwordResults)

    if (emailResults.length === 0 && passwordResults.length === 0) {
      alert("Success!")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className={`form-group ${emailErrors.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="email">
          Email
        </label>
        <input
          className="input"
          type="email"
          id="email"
          ref={emailRef}
          onChange={
            isAfterFirstSubmit
              ? () => setEmailErrors(checkEmail(e.target.value))
              : undefined
          }
        />
        {emailErrors.length > 0 && (
          <div className="msg">{emailErrors.join(", ")}</div>
        )}
      </div>
      <div className={`form-group ${passwordErrors.length > 0 ? "error" : ""}`}>
        <label className="label" htmlFor="password">
          Password
        </label>
        <input
          className="input"
          type="password"
          id="password"
          ref={passwordRef}
          onChange={
            isAfterFirstSubmit
              ? () => setPasswordErrors(checkPassword(e.target.value))
              : undefined
          }
        />
        {passwordErrors.length > 0 && (
          <div className="msg">{passwordErrors.join(", ")}</div>
        )}
      </div>
      <button className="btn" type="submit">
        Submit
      </button>
    </form>
  )
}

export default RefForm
