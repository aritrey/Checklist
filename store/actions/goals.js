export const ADD_GOAL = "ADD_GOAL";
export const SET_GOALS = "SET_GOALS";
export const DELETE_GOALS = "DELETE_GOALS";

import { insertGoal, fetchGoals, deleteGoalDB } from "../../helpers/database";

export const addGoal = (title) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertGoal(title);
      dispatch({
        type: ADD_GOAL,
        newGoalData: {
          id: dbResult.insertId,
          title: title,
        },
      });
    } catch (err) {
      throw err;
    }
  };
};

export const loadGoals = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchGoals();
      dispatch({ type: SET_GOALS, goals: dbResult.rows._array });
    } catch (e) {
      throw e;
    }
  };
};

export const deleteGoal = (id) => {
  return async (dispatch) => {
    try {
      const dbResult = await deleteGoalDB(id);
      dispatch({ type: DELETE_GOALS, id: id });
    } catch (e) {
      throw e;
    }
  };
};
