function TodoListItem({ todo, onCompleteTodo }) {
  return (
    <li>
      <form>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => onCompleteTodo(todo.id)}
        />
        <span>{todo.title}</span>
      </form>
    </li>
  );
}

export default TodoListItem;
