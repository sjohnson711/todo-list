import TodoListItem from "./TodoListItem";

function TodoList({ todos, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todos.filter((todo) => !todo.isCompleted);

  if (todos.length === 0) {
    return <p>Add Todo Above...</p>;
  }
  return (
    <ul>
      {filteredTodoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
