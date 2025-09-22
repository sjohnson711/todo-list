const actions = {
  //actions in useEffect that loads todos
  fetchTodos: "fetchTodos",
  loadTodos: "loadTodos",
  //found in useEffect and addTodo to handle failed requests
  setLoadError: "setLoadError",
  //actions found in addTodo
  startRequest: "startRequest",
  addTodo: "addTodo",
  endRequest: "endRequest",
  //found in helper functions
  updateTodo: "updateTodo",
  completeTodo: "completeTodo",
  //reverts todos when requests fail
  revertTodo: "revertTodo",
  //action on Dismiss Error button
  clearError: "clearError",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.fetchTodos:
      return {
        ...state,
        isLoading: true,
      };
    case actions.loadTodos:
      return {
        ...state,
        todoList: actions.records.map((record) => ({
          id: record.id,
          task: record.fields.task,
          completed: record.field.completed,
        })),
        isLoading: false,
      };
    case actions.setLoadError:
      return {
        ...state,
        errorMessage: action.error.message,
        isLoading: false,
      };
    case actions.startRequest: //left off here
      return {
        ...state,
      };
    case actions.addTodo:
      return {
        ...state,
      };
    case actions.endRequest:
      return {
        ...state,
      };
    case actions.updateTodo:
      return {
        ...state,
      };
    case actions.completeTodo:
      return {
        ...state,
      };

    case actions.revertTodo:
      return {
        ...state,
      };

    case actions.clearError:
      return {
        ...state,
      };

    default:
      break;
  }
};

const initialState = {
  todoList: [],
  isLoading: false,
  isSaving: false,
  errorMessage: "",
};

export { initialState, actions };
