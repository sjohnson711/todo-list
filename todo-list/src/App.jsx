import TodosPage from "./pages/TodosPage";
import "./App.css";
import { useState, useEffect, useCallback, useReducer } from "react";
import {
  reducer as todosReducer,
  actions as todoActions,
  initialState as initialTodosState,
} from "./reducers/todo.reducer";
import Header from "./shared/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { useSearchParams } from "react-router";

const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;

function App() {
  const [todoState, dispatch] = useReducer(todosReducer, initialTodosState);
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("");
  const token = `Bearer ${import.meta.env.VITE_PAT}`;

  const encodeUrl = useCallback(() => {
    let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
    let searchQuery = queryString
      ? `&filterByFormula=SEARCH("${queryString}",+title)`
      : "";
    return encodeURI(`${url}?${sortQuery}${searchQuery}`);
  }, [sortField, sortDirection, queryString]);

  // Fetch Todos
  useEffect(() => {
    const fetchTodos = async () => {
      dispatch({ type: todoActions.fetchTodos });

      const options = { method: "GET", headers: { Authorization: token } };

      try {
        const resp = await fetch(encodeUrl(), options);
        if (!resp.ok) throw new Error(resp.statusText);

        const { records } = await resp.json();
        const fetchedTodos = records.map((r) => ({
          id: r.id,
          title: r.fields.title,
          isCompleted: r.fields.isCompleted ?? false,
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
      records: [{ fields: { title: newTodo, isCompleted: false } }],
    };
    const options = {
      method: "POST",
      headers: { Authorization: token, "Content-Type": "application/json" },
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
      headers: { Authorization: token, "Content-Type": "application/json" },
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
      headers: { Authorization: token, "Content-Type": "application/json" },
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
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <TodosPage
              todos={todoState.todoList || []}
              addTodo={addTodo}
              completeTodo={completeTodo}
              updateTodo={updateTodo}
              todoState={todoState}
              sortField={sortField}
              setSortField={setSortField}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
              queryString={queryString}
              setQueryString={setQueryString}
              dismissError={dismissError}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
