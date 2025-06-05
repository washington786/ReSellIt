// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React, { FC } from "react";
// import colors from "@/config/colors";

// import { AntDesign } from "@expo/vector-icons";

// const RoundedTabButton: FC<{ onPress(): any }> = ({ onPress }) => {
//   return (
//     <TouchableOpacity style={styles.con} onPress={onPress}>
//       <AntDesign name="pluscircle" size={35} color={colors.slate[50]} />
//     </TouchableOpacity>
//   );
// };

// export default RoundedTabButton;

import {
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
  AccessibilityRole,
} from "react-native";
import React, { FC } from "react";
import colors from "@/config/colors";
import { AntDesign } from "@expo/vector-icons";

type Props = {
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle | ViewStyle[];
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: object;
  testID?: string;
};

const RoundedTabButton: FC<Props> = ({ onPress, style, ...restProps }) => {
  return (
    <TouchableOpacity
      style={[styles.con, style]}
      onPress={onPress}
      {...restProps}
    >
      <AntDesign name="pluscircle" size={35} color={colors.slate[50]} />
    </TouchableOpacity>
  );
};

export default RoundedTabButton;

const styles = StyleSheet.create({
  con: {
    height: 80,
    width: 80,
    borderRadius: 100,
    backgroundColor: colors.primary[500],
    bottom: -40,
    borderWidth: 10,
    borderColor: colors.slate[50],
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    zIndex: 100,
  },
});
