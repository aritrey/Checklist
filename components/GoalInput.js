import { View, TextInput, Text, Button, StyleSheet, Modal } from "react-native";
import React, { useState } from "react";

const GoalItem = (props) => {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [errorMsg, seterrorMsg] = useState("");

  const goalInputHandler = (text) => {
    setEnteredGoal(text);
    seterrorMsg("");
  };

  const AddGoal_Clean = () => {
    if (enteredGoal !== "") {
      props.onAddGoal(enteredGoal);
      setEnteredGoal("");
    }
    seterrorMsg("Please add a text to your new goal first!");
  };

  return (
    <Modal visible={props.visible_Mua} animationType="fade">
      <View style={styles.inputContainer}>
        <Text color="red">{errorMsg}</Text>
        <TextInput
          placeholder="Whats your new Goal?"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}
        />
        <View style={styles.buttons}>
          <View style={styles.but}>
            <Button title="Add" onPress={AddGoal_Clean} />
            {/* alternative Syntax:  onPress={props.onAddGoal.bind(this,enteredGoal)} */}
          </View>
          <View style={styles.but}>
            <Button color="red" title="Go back" onPress={props.ongoBack} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "80%",
    marginBottom: 10,
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttons: {
    width: "60%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  but: {
    width: "45%",
  },
});

export default GoalItem;
