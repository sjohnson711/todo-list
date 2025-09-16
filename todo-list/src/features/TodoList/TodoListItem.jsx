import { useState, useEffect } from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel";
import ListStyles from "./TodoListitem.module.css";

function TodoListItem({ todo, onCompleteTodo, onUpdateTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleCancel() {
    setIsEditing(false);
    setWorkingTitle(todo.title);
  }

  function handleEdit(event) {
    setWorkingTitle(event.target.value);
  }

  function handleUpdate(event) {
    if (!isEditing) return;
    event.preventDefault();
    onUpdateTodo({ ...todo, title: workingTitle });
    setIsEditing(false);
  }

  //Covering an edge case if clicking too much
  useEffect(() => {
    if (todo.length > 0) {
      setWorkingTitle(todoList[0].list);
    }
  }, [todo]);

  return (
    <li>
      <form className={ListStyles.form} onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel
              value={workingTitle}
              onChange={handleEdit}
              elementId={todo.id}
              label
            />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button onClick={handleUpdate}>Update</button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                id={`checkbox${todo.id}`}
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
