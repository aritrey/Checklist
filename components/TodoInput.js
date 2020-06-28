import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  Modal,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SCREEN_HEIGHT = Dimensions.get("window").height;

const TodoItem = (props) => {
  const [errorMsg, seterrorMsg] = useState("");
  const [text, setText] = useState("");

  const todoInputHandler = (text) => {
    setText(text);
    seterrorMsg("");
  };

  const addTodo = () => {
    if (text !== "") {
      props.onAddTodo(text);
      setText("");
    }
    seterrorMsg("Please add a task first!");
  };

  return (
    <Modal visible={props.isVisible} animationType="fade">
      <View style={styles.inputContainer}>
        <MaterialCommunityIcons
          name="playlist-edit"
          size={SCREEN_HEIGHT / 4}
          color="#4ea8de"
        />
        <Text>{errorMsg}</Text>
        <TextInput
          placeholder="Add your tasks here \(^-^)/"
          style={styles.input}
          onChangeText={todoInputHandler}
          value={text}
        />
        <View style={styles.buttons}>
          <View style={styles.but}>
            <Button title="Add" onPress={addTodo} color="#90be6d" />
          </View>
          <View style={styles.but}>
            <Button color="#f8961e" title="Go back" onPress={props.ongoBack} />
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
    borderColor: "#90be6d",
    borderRadius: 5,
    borderWidth: 1,
    padding: 10,
  },
  inputContainer: {
    top: SCREEN_HEIGHT / 8,
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

export default TodoItem;
