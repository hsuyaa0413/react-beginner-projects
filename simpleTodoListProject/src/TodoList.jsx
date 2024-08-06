const TodoList = ({ id, name, completed, toggleTodo, deleteTodo }) => {
  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          type="checkbox"
          checked={completed}
          data-list-item-checkbox
          onChange={e => {
            toggleTodo(id, e.target.checked)
          }}
        />
        <span data-list-item-text>{name}</span>
      </label>
      <button onClick={() => deleteTodo(id)} data-button-delete>
        Delete
      </button>
    </li>
  )
}

export default TodoList
