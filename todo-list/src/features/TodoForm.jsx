import { useState, useRef } from 'react';
import TextInputWithLabel from '../shared/TextInputWithLabel';


function TodoForm({onAddTodo}){

    const [workingTodoTitle, setWorkingTodoTitle] = useState("")
    const inputRef = useRef();


    function handleAddTodo(event){
        event.preventDefault();
        

        if(workingTodoTitle.trim()){
            onAddTodo(workingTodoTitle);
            setWorkingTodoTitle("")
        }

    }

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel 
                elementId="toDoTitle"
                labelText="Todo"
                value={workingTodoTitle}
                onChange={(e) => setWorkingTodoTitle(e.target.value)}
                ref={inputRef}
            />
            

            <button disabled={!workingTodoTitle}>Add Todo</button>
        </form> 
    )
}

export default TodoForm