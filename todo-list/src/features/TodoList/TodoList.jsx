import TodoListItem from "./TodoListItem";

function TodoList({ todos, onCompleteTodo }) {
  const filteredTodoList = todos.filter((todo) => !todo.isCompleted);

  if (todos.length === 0) {
    return <p>Add todo above to get started</p>;
  }

  return (
    <ul>
      {filteredTodoList.map((todo) => (
        <TodoListItem
          key={todo.id}
          todo={todo}
          onCompleteTodo={onCompleteTodo}
          
        />
      ))}
    </ul>
  );
}

export default TodoList;
