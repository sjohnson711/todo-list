import React from "react";

const TodosViewForm = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) => {
  const preventRefresh = (e) => e.preventDefault();

  function handleQueryString() {
    setQueryString("");
  }
  return (
    <form onSubmit={preventRefresh}>
      <div>
        <label>Search todos</label>
        <input
          type="text"
          value={queryString}
          onChange={(e) => {
            setQueryString(e.target.value);
          }}
        />
        <button onClick={handleQueryString}>Clear</button>
      </div>
      <div>
        <label htmlFor="sortField">Sort by: </label>
        <select
          id="sortField"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="title">Title</option>
          <option value="createdTime">Time added</option>
        </select>

        <label htmlFor="sortDirection"> Direction: </label>
        <select
          id="sortDirection"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </form>
  );
};

export default TodosViewForm;
