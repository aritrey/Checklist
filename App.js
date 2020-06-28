import React, { useState, useEffect } from "react";
import { StyleSheet, View, Button, FlatList } from "react-native";
import { useSelector, useDispatch, Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";

import TodoItem from "./components/TodoItem";
import TodoInput from "./components/TodoInput";
import * as todoActions from "./store/actions/todo";
import todoReducer from "./store/reducers/todo";
import { init } from "./helpers/database";

init()
  .then(() => {
    console.log("database initialized");
  })
  .catch((err) => {
    console.log("initializing database failed");
    console.log(err);
  });

const store = createStore(todoReducer, applyMiddleware(ReduxThunk));

export default function AppWrapper() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
}

const App = (props) => {
  const todos = useSelector((state) => state.todos);
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoActions.loadTodos());
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <View style={styles.button}>
        <Button
          title="add new Todo"
          color="#4ea8de"
          onPress={() => setIsEditMode(true)}
        />
      </View>
      <TodoInput
        isVisible={isEditMode}
        ongoBack={() => setIsEditMode(false)}
        onAddTodo={(enteredTodo) => dispatch(todoActions.addTodo(enteredTodo))}
      />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={todos}
        renderItem={(itemData) => {
          return (
            <TodoItem
              id={itemData.item.id}
              onDelete={(id) => {
                dispatch(todoActions.deleteTodo(id));
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
    flex: 1,
    padding: "12%",
  },
  button: { paddingBottom: "8%" },
});
