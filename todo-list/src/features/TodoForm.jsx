import { useState, useRef } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

function TodoForm({ onAddTodo }) {
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const inputRef = useRef();
  const [isSaving, setIsSaving] = useState(false);

  function handleAddTodo(event) {
    event.preventDefault();

    if (workingTodoTitle.trim()) {
      onAddTodo(workingTodoTitle);
      setWorkingTodoTitle("");
    }
  }

  return (
    <form onSubmit={handleAddTodo}>
      <TextInputWithLabel
        elementId="toDoTitle"
        labelText="Todo"
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        ref={inputRef}
      />

      <button disabled={!workingTodoTitle.trim() === ""}>
        {isSaving ? "Saving..." : "Add Todo"}
      </button>
    </form>
  );
}

export default TodoForm;
