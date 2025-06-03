import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { Avatar, Text } from "react-native-paper";
import { Swipeable } from "react-native-gesture-handler";

interface IUserCard {
  name: string;
  avatarImage: string;
  description: string | number;
  onPress(): void;
  renderRightActions?: any;
}

const UserCard: FC<IUserCard> = ({
  avatarImage,
  description,
  name,
  onPress,
  renderRightActions,
}) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity style={styles.con} onPress={onPress}>
        {!avatarImage ? (
          <Avatar.Text label="kb" size={50} />
        ) : (
          <Avatar.Image source={{ uri: avatarImage }} size={50} />
        )}

        <View style={styles.wrapper}>
          <Text variant="titleMedium">{name}</Text>
          <Text variant="bodySmall">
            {typeof description === "number"
              ? `R${description.toFixed(2)}`
              : description}
          </Text>
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  con: {
    flexDirection: "row",
    gap: 6,
    alignItems: "flex-start",
    marginHorizontal: 5,
    marginVertical: 8,
  },
  wrapper: {
    gap: 2,
    flexDirection: "column",
  },
});
