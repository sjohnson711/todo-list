import React from "react";
import { useState, useEffect, debounce } from "react";
import styled from "styled-components";

const Button = styled.button`
  background-color: white;
  font-weight: bold;
  border-radius: 5px;
  margin-left: 2px;
`;

const Search = styled.label`
  font-weight: bold;
  padding: 10px;
`;

const TodosViewForm = ({
  sortField,
  setSortField,
  sortDirection,
  setSortDirection,
  queryString,
  setQueryString,
}) => {
  const preventRefresh = (e) => e.preventDefault();
  const [localQueryString, setLocalQueryString] = useState(queryString);

  useEffect(() => {
    setTimeout(() => {
      setQueryString(localQueryString);
    }, 500);
    return () => clearTimeout(debounce);
  }, [localQueryString, setQueryString]);

  function handleQueryString() {
    setLocalQueryString("");
  }
  return (
    <form onSubmit={preventRefresh}>
      <div>
        <Search>Search todos</Search>
        <input
          type="text"
          value={localQueryString}
          onChange={(e) => {
            setLocalQueryString(e.target.value);
          }}
        />
        <Button onClick={handleQueryString}>Clear</Button>
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
