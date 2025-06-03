import { StyleSheet, Text, View } from "react-native";
import React, { FC, ReactNode } from "react";
import colors from "@/config/colors";

interface prop {
  children: ReactNode;
}
const RWrapper: FC<prop> = ({ children }) => {
  return <View style={styles.con}>{children}</View>;
};

export default RWrapper;

const styles = StyleSheet.create({
  con: {
    backgroundColor: colors.zinc[50],
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 3,
  },
});
