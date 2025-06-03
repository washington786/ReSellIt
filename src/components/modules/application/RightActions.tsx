import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Feather } from "@expo/vector-icons";
import colors from "@/config/colors";

interface prop {
  onDeleteItem(): void;
}
const RightActions: FC<prop> = ({ onDeleteItem }) => {
  return (
    <TouchableOpacity style={styles.con} onPress={onDeleteItem}>
      <Feather
        name="trash"
        size={30}
        color={colors.slate[50]}
        style={styles.con}
      />
    </TouchableOpacity>
  );
};

export default RightActions;

const styles = StyleSheet.create({
  con: {
    backgroundColor: colors.primary[700],
    alignItems: "center",
    justifyContent: "center",
  },
});
