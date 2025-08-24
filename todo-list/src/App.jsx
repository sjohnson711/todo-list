import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
    import.meta.env.VITE_TABLE_NAME
  }`;
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  useEffect(() => {
    const fetchTodos = async () => {
      console.log("fetched todos function is called");
      setIsLoading(true);
      const options = {
        method: "GET",
        headers: {
          Authorization: token,
        },
      };
      try {
        console.log(url);
        const resp = await fetch(url, options);
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        const response = await resp.json();
        const fetchedTodos = response.records.map((record) => {
          const todo = {
            id: record.id,
            ...record.fields,
            isCompleted: record.fields.isCompleted || false,
          };
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
  }, []);

  const addTodo = (title) => {
    const newTodo = {
      title: title,
      id: Date.now(),
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
  };

  const completeTodo = (id) => {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: true };
      } else {
        return todo;
      }
    });
    setTodoList(updatedTodos);
  };

  function updateTodo(editedTodo) {
    const updatedTodos = todoList.map((todo) => {
      if (todo.id === editedTodo.id) {
        return editedTodo;
      } else {
        return todo;
      }
    });
    setTodoList(updatedTodos);
  }

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onAddTodo={addTodo} />

      {errorMessage && <p className="error">{errorMessage}</p>}

      <TodoList
        todos={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
