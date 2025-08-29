import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm";
import "./App.css";
import { useState, useEffect } from "react";

const encodeUrl = ({ sortField, sortDirection }) => {
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  return encodeURI(`${url}?${sortQuery}`);
};

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  //URL INCLUDING ID AND TABLE NAME
  import.meta.env.VITE_TABLE_NAME
}`;

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  // -----------------------
  // Load Todos
  // -----------------------
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);

      const options = {
        method: "GET", //read the todos from airtable to window
        headers: { Authorization: token }, //AUTHRIZATION TOKEN
      };

      try {
        const resp = await fetch(encodeUrl(sortDirection, sortField), options);
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        const { records } = await resp.json();

        const fetchedTodos = records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
          };
          if (!todo.isCompleted) {
            todo.isCompleted = false;
          }
          return todo;
        });

        setTodoList(fetchedTodos);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, [sortDirection, sortField]);

  //Adding New todo
  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo,
            isCompleted: false,
          },
        },
      ],
    };

    //posting to my airtable
    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);
      const resp = await fetch(
        encodeUrl({ sortDirection, sortField }),
        options
      );
      if (!resp.ok) throw new Error("Failed to save todo");

      const { records } = await resp.json();
      const savedTodo = { id: records[0].id, ...records[0].fields };

      if (!savedTodo.isCompleted) savedTodo.isCompleted = false;

      setTodoList([...todoList, savedTodo]);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  //Update current todo
  const updateTodo = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };
    //modify todo in airtable
    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      setTodoList(
        todoList.map((todo) => (todo.id === editedTodo.id ? editedTodo : todo))
      );

      const resp = await fetch(
        encodeUrl({ sortDirection, sortField }),
        options
      );
      if (!resp.ok) throw new Error("Failed to update todo");
    } catch (err) {
      setErrorMessage(`${err.message}. Reverting todo...`);
      // Revert if failed
      setTodoList(
        todoList.map((todo) =>
          todo.id === originalTodo.id ? originalTodo : todo
        )
      );
    }
  };

  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);
    const updatedTodo = {
      ...originalTodo,
      isCompleted: !originalTodo.isCompleted,
    };

    const payload = {
      records: [
        {
          id: updatedTodo.id,
          fields: {
            title: updatedTodo.title,
            isCompleted: updatedTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      setTodoList(
        todoList.map((todo) => (todo.id === id ? updatedTodo : todo))
      );

      const resp = await fetch(
        encodeUrl({ sortDirection, sortField }),
        options
      );
      if (!resp.ok) throw new Error("Failed to complete todo");
    } catch (err) {
      setErrorMessage(`${err.message}. Reverting todo...`);
      setTodoList(
        todoList.map((todo) =>
          todo.id === originalTodo.id ? originalTodo : todo
        )
      );
    }
  };

  const dismissError = () => setErrorMessage("");
  if (isLoading) {
    return <p>Loading todos....</p>;
  }

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />

      <TodoList
        todos={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />

      {errorMessage && (
        <div>
          <hr />
          <p className="error">{errorMessage}</p>
          <button onClick={dismissError}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
