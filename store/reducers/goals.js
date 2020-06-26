import { ADD_GOAL, SET_GOALS, DELETE_GOALS } from "../actions/goals";
import Goal from "../../models/goal";

const initialState = {
  goals: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GOALS:
      return {
        goals: action.goals.map(
          (goal) => new Goal(goal.id.toString(), goal.title)
        ),
      };
    case ADD_GOAL:
      const newGoal = new Goal(action.newGoalData.id, action.newGoalData.title);
      return { ...state, goals: state.goals.concat(newGoal) };
    case DELETE_GOALS:
      const newGoals = state.goals.filter((goal) => goal.id != action.id);
      return { ...state, goals: newGoals };
    default:
      return state;
  }
};
