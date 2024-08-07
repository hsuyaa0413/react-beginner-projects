import "./styles.css"
import { createContext, useEffect, useReducer, useState } from "react"
import NewTodoForm from "./NewTodoForm"
import TodoList from "./TodoList"
import TodoFilterForm from "./TodoFilterForm"

const LOCAL_STORAGE_KEY = "TODOS"
export const TodoContext = createContext()

const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
}

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ]

    case ACTIONS.TOGGLE:
      return todos.map(todo => {
        if (todo.id === payload.id)
          return { ...todo, completed: payload.completed }

        return todo
      })

    case ACTIONS.DELETE:
      return todos.filter(todo => todo.id !== payload.id)

    case ACTIONS.UPDATE:
      return todos.map(todo => {
        if (todo.id === payload.id) {
          return { ...todo, name: payload.name }
        }
        return todo
      })

    default:
      throw new Error(`No action found for ${type}.`)
  }
}

function App() {
  const [filterName, setFilterName] = useState("")
  const [hideCompletedFilter, setHideCompletedFilter] = useState(false)

  const [todos, dispatch] = useReducer(reducer, [], initialValue => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (value == null) return initialValue

    return JSON.parse(value)
  })

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } })
  }

  function updateTodoName(id, name) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id, name } })
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } })
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } })
  }

  const filteredTodos = todos.filter(todo => {
    if (hideCompletedFilter && todo.completed) return false
    return todo.name.includes(filterName)
  })

  return (
    <TodoContext.Provider
      value={{
        todos: filteredTodos,
        addNewTodo,
        updateTodoName,
        deleteTodo,
        toggleTodo,
      }}
    >
      <TodoFilterForm
        name={filterName}
        setName={setFilterName}
        hideCompleted={hideCompletedFilter}
        setHideCompletedFilter={setHideCompletedFilter}
      />
      <TodoList />
      <NewTodoForm />
    </TodoContext.Provider>
  )
}

export default App
