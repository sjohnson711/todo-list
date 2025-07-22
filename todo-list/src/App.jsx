import TodoList from './TodoList';
import TodoForm from './TodoForm';
import './App.css'
import { useState } from 'react'


function App() {
  const [newTodo, setNewTodo] = useState('Example Text')

  return (
    <div>
      <h1>Todo App</h1>
      <TodoForm/>
      <p>{newTodo}</p>
      <TodoList/>
    </div>
  )
}

export default App
