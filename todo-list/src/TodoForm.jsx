
function TodoForm({onAddTodo}){


    function handleAddTodo(event){
        event.preventDefault();
        const title = event.target.title.value;

        if(title.trim()){
            onAddTodo(title);
            event.target.title.value = '';
        }

    }


    return (
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Todo</label>
            <input type="text" id="todoTitle" name='title'></input>
            <button>Add Todo</button>
        </form> 
    )
}

export default TodoForm