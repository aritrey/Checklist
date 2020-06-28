export const ADD_TODO = "ADD_TODO";
export const SET_TODOS = "SET_TODOS";
export const DELETE_TODOS = "DELETE_TODOS";

import { insertTodo, fetchTodos, deleteTodoDB } from "../../helpers/database";

export const addTodo = (title) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertTodo(title);
      dispatch({
        type: ADD_TODO,
        newTodoData: {
          id: dbResult.insertId,
          title: title,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const loadTodos = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchTodos();
      dispatch({ type: SET_TODOS, todos: dbResult.rows._array });
    } catch (e) {
      throw e;
    }
  };
};

export const deleteTodo = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await deleteTodoDB(id);
      dispatch({ type: DELETE_TODOS, id: id });
    } catch (e) {
      throw e;
    }
  };
};
