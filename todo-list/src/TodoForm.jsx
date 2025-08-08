import { useState } from 'react';


function TodoForm({onAddTodo}){

    const [workingTodoTitle, setWorkingTodoTitle] = useState("")


    function handleAddTodo(event){
        event.preventDefault();
        

        if(workingTodoTitle.trim()){
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle("")
        }

    }
    


    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" 
            id="todoTitle" 
            name='title' 
            value={workingTodoTitle} 
            onChange={(e) => setWorkingTodoTitle(e.target.value)}
            placeholder="add todo..."
            
            >

            </input>
            <button disabled={!workingTodoTitle}>Add Todo</button>
        </form> 
    )
}

export default TodoForm