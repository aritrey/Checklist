import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight
} from "react-native";
import React, { useState } from "react";

const GoalItem = props => {
  return (
    //touchable gibt detailed touch events wie langer touch...
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={props.onDelete.bind(this, props.id)}
      // oder onPress={() => props.onDelete(props.id)}
    >
      <View style={styles.listItem}>
        <Text>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    marginTop: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1
  }
});

export default GoalItem;
