import TodoList from "./features/TodoList/TodoList.jsx";
import TodoForm from "./features/TodoForm";
import "./App.css";
import { useState } from "react";




function App() {
  const [todoList, setTodoList] = useState([]);

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

  function updateTodo (editedTodo) {
  const updatedTodos = todos.map((todo) => {
    if(todo.id === id){
      return {editedTodo}
      
    }else {
      return todo;
    }
  }
    
  );
  setTodoList(updatedTodos)
}

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onAddTodo={addTodo} />

      <TodoList todos={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodo} />
    </div>
  );
}

export default App;
