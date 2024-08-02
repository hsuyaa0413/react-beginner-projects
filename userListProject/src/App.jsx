import { useEffect, useState } from "react"
import User from "./User"

const App = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setLoading(true)
    const controller = new AbortController()
    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal
    })
      .then(res => {
        if (res.status === 200) return res.json()
        else {
          Promise.reject(res)
        }
      })
      .then(setUsers)
      .catch(e => {
        if (e?.name === "AbortError") return
        console.error(e)
      })
      .finally(() => {
        setLoading(false)
      })

    return () => {
      controller.abort()
    }
  }, [])

  return (
    <>
      <h1>User List</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <ul>
          {users.map(user => {
            return <User key={user.id} {...user} />
          })}
        </ul>
      )}
    </>
  )
}

export default App
