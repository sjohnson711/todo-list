import React from "react";
import TodoList from "../features/TodoList";
import TodoForm from "../features/TodoForm";
import TodosViewForm from "../features/TodosViewForm";

export default function TodoPage({
  todos = [],
  onAddTodo,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
  onCompleteTodo,
  onUpdateTodo,
}) {
  return (
    <div>
      <TodoForm onAddTodo={onAddTodo} />
      <TodoList
        todos={todos}
        onCompleteTodo={onCompleteTodo}
        onUpdateTodo={onUpdateTodo}
      />
      <TodosViewForm
        sortField={sortField}
        setSortField={setSortField}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        queryString={queryString}
        setQueryString={setQueryString}
      />
    </div>
  );
}
