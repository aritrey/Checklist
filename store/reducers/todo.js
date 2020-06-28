import { ADD_TODO, SET_TODOS, DELETE_TODOS } from "../actions/todo";
import Todo from "../../models/todo";

const initialState = {
  todos: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_TODOS:
      return {
        todos: action.todos.map(
          (todo) => new Todo(todo.id.toString(), todo.title)
        ),
      };
    case ADD_TODO:
      const newTodo = new Todo(action.newTodoData.id, action.newTodoData.title);
      return { ...state, todos: state.todos.concat(newTodo) };
    case DELETE_TODOS:
      const newTodos = state.todos.filter((todo) => todo.id != action.id);
      return { ...state, todos: newTodos };
    default:
      return state;
  }
};
