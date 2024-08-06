import "./styles.css"
import { useState } from "react"
import TodoList from "./TodoList"

const App = () => {
  const [newTodoName, setNewTodoName] = useState("")
  const [todos, setTodos] = useState([])

  const addNewTodo = () => {
    if (newTodoName === "") return
    setTodos(currentTodo => {
      return [
        ...currentTodo,
        { name: newTodoName, completed: false, id: crypto.randomUUID() },
      ]
    })
    setNewTodoName("")
  }

  const toggleTodo = (todoId, completed) => {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === todoId) return { ...todo, completed }
        return todo
      })
    })
  }

  const deleteTodo = todoId => {
    setTodos(currentTodo => {
      return currentTodo.filter(todo => todo.id !== todoId)
    })
  }

  return (
    <>
      <ul id="list">
        {todos.map(todo => {
          return (
            <TodoList
              key={todo.id}
              {...todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          )
        })}
      </ul>

      <div id="new-todo-form">
        <label htmlFor="todo-input">New Todo</label>
        <input
          type="text"
          id="todo-input"
          value={newTodoName}
          onChange={e => {
            setNewTodoName(e.target.value)
          }}
        />
        <button onClick={addNewTodo}>Add Todo</button>
      </div>
    </>
  )
}

export default App
