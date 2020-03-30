import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList
} from "react-native";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [CourseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false);

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const goBack = () => {
    setIsAddMode(false);
  };

  //wenn wir  id={itemData.item.id} bei GoalItem wegnehmen ist goalId undefined
  //woher weiß die function, dass es mit Id vergleichen muss?
  //vergl. automatisch gleiche pros (id mit id von goalitem)
  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };

  return (
    <View style={styles.screen}>
      <Button
        title="add new Papas Geburtstag Nachricht"
        onPress={() => setIsAddMode(true)}
      />
      <GoalInput
        ongoBack={goBack}
        visible_Mua={isAddMode}
        onAddGoal={addGoalHandler}
      />

      <FlatList
        keyExtractor={(item, index) => item.id}
        // wenn item key als attribut hat wird das genommen und kein key extractor gebraucht
        data={CourseGoals}
        renderItem={itemData => (
          <GoalItem
            // ALTERNATIV: id fuer onDelete: onDelete={removeGoalHandler.bind(this,itemData.item.id)}
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
    flexDirection: "column"
  }
});
