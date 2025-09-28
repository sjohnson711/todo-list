import TodoListItem from "./TodoList/TodoListItem";
import styles from "./TodoList.module.css";

function TodoList({ todos, onCompleteTodo, onUpdateTodo }) {
  const filteredTodoList = todos.filter((todo) => !todo.isCompleted);
  console.log(todos);

  if (todos.length === 0) {
    return <p>Add Todo Above...</p>;
  }
  return (
    <ul className={styles.ul}>
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
