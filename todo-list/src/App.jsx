import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm";
import "./App.css";
import { useState, useEffect, useCallback, useReducer } from "react";
import TodosViewForm from "./TodosViewForm.jsx";
import Styled from "./App.module.css";
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from "./reducers/todo.reducer";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);

  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const token = `Bearer ${import.meta.env.VITE_PAT}`;
  const [queryString, setQueryString] = useState("");

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = "";
    if (queryString) {
      searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
    }
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  // Fetch Todos
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      const options = {
        method: "GET",
        headers: { Authorization: token },
      };

      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) throw new Error(resp.statusText);

        const { records } = await resp.json();

        const fetchedTodos = records.map((record) => ({
          id: record.id,
          title: record.fields.title,
          isCompleted: record.fields.isCompleted ?? false,
        }));

        dispatch({ type: todoActions.loadTodos, records: fetchedTodos });
      } catch (error) {
        dispatch({ type: todoActions.setLoadError, error });
      }
    };

    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  // Add Todo
  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: { title: newTodo, isCompleted: false },
        },
      ],
    };

    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({ type: todoActions.startRequest });
      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error("Failed to save todo");

      const { records } = await resp.json();
      const savedTodo = {
        id: records[0].id,
        title: records[0].fields.title,
        isCompleted: records[0].fields.isCompleted ?? false,
      };

      dispatch({ type: todoActions.addTodo, records: [savedTodo] });
    } catch (err) {
      dispatch({ type: todoActions.setLoadError, error: err });
    } finally {
      dispatch({ type: todoActions.endRequest });
    }
  };

  // Update Todo
  const updateTodo = async (editedTodo) => {
    const originalTodo = todoState.todoList.find(
      (todo) => todo.id === editedTodo.id
    );

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

    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      dispatch({ type: todoActions.updateTodo, editedTodo });
      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error("Failed to update todo");
    } catch (err) {
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: originalTodo,
        error: err,
      });
    }
  };

  // Complete Todo
  const completeTodo = async (id) => {
    const originalTodo = todoState.todoList.find((todo) => todo.id === id);
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
      dispatch({ type: todoActions.completeTodo, id });
      const resp = await fetch(url, options);
      if (!resp.ok) throw new Error("Failed to complete todo");
    } catch (err) {
      dispatch({
        type: todoActions.revertTodo,
        editedTodo: originalTodo,
        error: err,
      });
    }
  };

  const dismissError = () => dispatch({ type: todoActions.clearError });

  if (todoState.isLoading) return <p>Loading todos...</p>;

  return (
    <div className={Styled.container}>
      <h1 className={Styled.title}>Todo App</h1>
      <TodoForm onAddTodo={addTodo} isSaving={todoState.isSaving} />

      <TodoList
        todos={todoState.todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        isLoading={todoState.isLoading}
      />

      <hr />
      <TodosViewForm
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        sortField={sortField}
        setSortField={setSortField}
        queryString={queryString}
        setQueryString={setQueryString}
      />

      {todoState.errorMessage && (
        <div>
          <hr />
          <p className="error">{todoState.errorMessage}</p>
          <button onClick={dismissError}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;
