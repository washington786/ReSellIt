import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import React, { FC } from "react";
import colors from "@/config/colors";
import { Feather } from "@expo/vector-icons";

interface props extends TextInputProps {
  icon?: any;
}
const RInput: FC<props> = (props) => {
  return (
    <View style={styles.inputCon}>
      {props.icon && (
        <Feather size={20} name={props.icon} color={colors.gray[400]} />
      )}
      <TextInput {...props} style={styles.input} />
    </View>
  );
};

export default RInput;

const styles = StyleSheet.create({
  inputCon: {
    paddingHorizontal: 10,
    paddingVertical: 12,
    minHeight: 50,
    borderWidth: 1,
    borderColor: colors.gray[200],
    // marginHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderRadius: 5,
  },
  input: {
    height: "100%",
    flex: 1,
    width: "100%",
  },
});
