import { useState, useRef } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";
import styled from "styled-components";

const Button = styled.button`
  font-weight: 400;
  border-radius: 4px;
  cursor: pointer;
  background-color: bisque;
  margin-left: 2px;
  &:hover {
    background-color: black;
    color: bisque;
  }
`;

const Font = styled.div`
  font-style: italic;
  color: red;
  font-family: "Roboto", sans-serif;
`;

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
    <Font>
      <form onSubmit={handleAddTodo}>
        <TextInputWithLabel
          elementId="toDoTitle"
          labelText="Todo"
          value={workingTodoTitle}
          onChange={(e) => setWorkingTodoTitle(e.target.value)}
          ref={inputRef}
        />

        <Button disabled={!workingTodoTitle.trim() === ""}>
          {isSaving ? "Saving..." : "Add Todo"}
        </Button>
      </form>
    </Font>
  );
}

export default TodoForm;
