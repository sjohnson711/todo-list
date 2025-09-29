import TodoForm from "../features/TodoForm";
import TodoList from "../features/TodoList";
import TodosViewForm from "../features/TodosViewForm";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const itemsPerPage = 15;
  const totalPages = Math.ceil(todos.length / itemsPerPage);
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const indexOfFirstTodo = (currentPage - 1) * itemsPerPage;
  const currentTodos = todos.slice(
    indexOfFirstTodo,
    indexOfFirstTodo + itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setSearchParams({ page: currentPage - 1 });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setSearchParams({ page: currentPage + 1 });
    }
  };

  useEffect(() => {
    if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
      navigate("/");
    }
  }, [currentPage, totalPages, navigate]);

  return (
    <div>
      <TodoForm onAddTodo={addTodo} />
      <TodoList
        todos={currentTodos}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodo}
        onAddTodo={addTodo}
      />

      <div className="paginationControls">
        <button disabled={currentPage === 1} onClick={handlePreviousPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          Next
        </button>
      </div>

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
