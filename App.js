import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import { useSelector, useDispatch, Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";
import * as goalActions from "./store/actions/goals";
import goalReducer from "./store/reducers/goals";
import { init } from "./helpers/database";

init()
  .then(() => {
    console.log("initialized database");
  })
  .catch((err) => {
    console.log("initializing database failed");
    console.log(err);
  });

const store = createStore(goalReducer, applyMiddleware(ReduxThunk));

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = (props) => {
  const goals = useSelector((state) => {
    return state.goals;
  });
  const [isAddMode, setIsAddMode] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(goalActions.loadGoals());
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <Button title="add new goal" onPress={() => setIsAddMode(true)} />
      <GoalInput
        ongoBack={() => setIsAddMode(false)}
        visible_Mua={isAddMode}
        onAddGoal={(enteredGoal) => dispatch(goalActions.addGoal(enteredGoal))}
      />
      <FlatList
        keyExtractor={(item) => item.id}
        data={goals}
        renderItem={(itemData) => {
          return (
            <GoalItem
              id={itemData.item.id}
              onDelete={(id) => {
                dispatch(goalActions.deleteGoal(id));
              }}
              title={itemData.item.title}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // alignItems: "center",
    padding: 50,
    flexDirection: "column",
  },
});
