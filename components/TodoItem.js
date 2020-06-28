import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const TodoItem = (props) => {
  const animation = useState(new Animated.Value(0))[0];
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    Animated.timing(animation, {
      toValue: selected ? 0 : 1,
      duration: 1000,
    }).start();
    setSelected((value) => !value);
  };

  const color_interpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["#f8961e", "#90be6d"],
  });
  const width_interpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["100%", "80%"],
  });

  const animatedStyle = {
    backgroundColor: color_interpolation,
    width: width_interpolation,
  };

  return (
    <Animated.View style={[styles.listItem, animatedStyle]}>
      <TouchableOpacity onPress={props.onDelete.bind(this, props.id)}>
        <MaterialCommunityIcons name="delete" size={25} color="black" />
      </TouchableOpacity>
      <View style={styles.text}>
        <Text>{props.title}</Text>
      </View>

      <TouchableOpacity onPress={toggleSelected}>
        <MaterialCommunityIcons
          name={selected ? "checkbox-marked-outline" : "checkbox-blank-outline"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  listItem: {
    alignSelf: "center",
    padding: 10,
    marginVertical: "2%",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  text: { flex: 1, alignItems: "center" },
});

export default TodoItem;
