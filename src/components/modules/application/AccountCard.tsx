import { StyleSheet, TouchableOpacity } from "react-native";
import React, { FC } from "react";
import { Text } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import colors from "@/config/colors";

interface IAccountCard {
  icon: "list" | "mail" | "log-out";
  title: string;
  onPress(): void;
}
const AccountCard: FC<IAccountCard> = ({ icon, onPress, title }) => {
  return (
    <TouchableOpacity style={styles.con} onPress={onPress}>
      <Feather name={icon} size={25} />
      <Text variant="titleMedium">{title}</Text>
    </TouchableOpacity>
  );
};

export default AccountCard;

const styles = StyleSheet.create({
  con: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    backgroundColor: colors.slate[100],
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
});
