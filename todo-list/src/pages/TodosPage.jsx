import TodoForm from "../features/TodoForm";
import TodoList from "../features/TodoList";
import TodosViewForm from "../features/TodosViewForm";

export default function TodoPage({
  todos = [],
  addTodo,
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
  completeTodo,
  updateTodo,
}) {
  return (
    <div>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={todos}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        onAddTodo={addTodo}
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
