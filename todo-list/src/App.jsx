import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './App.css'
import { useState } from 'react'


function App() {
  const [todoList, setTodoList] = useState([])

  const addTodo = (title) => {
    const newTodo = {
      title: title,
      id: Date.now(),      
    }
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm onAddTodo={addTodo}/>

      <TodoList todos={todoList}/>
    </div>
  )
}

export default App
