const checkEmail = email => {
  const errors = []

  if (email.length === 0) {
    errors.push("Required")
  }
  if (!email.endsWith("@webdevsimplified.com")) {
    errors.push("Must end with @webdevsimplified.com")
  }

  return errors
}

const checkPassword = password => {
  const errors = []

  if (password.length < 10) {
    errors.push("Must Be 10 characters or longer")
  }
  if (!password.match(/[a-z]/)) {
    errors.push("Must include a lowercase letter")
  }
  if (!password.match(/[A-Z]/)) {
    errors.push("Must include a uppercase letter")
  }
  if (!password.match(/[0-9]/)) {
    errors.push("Must include a number")
  }

  return errors
}

export { checkEmail, checkPassword }
