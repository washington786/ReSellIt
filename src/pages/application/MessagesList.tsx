import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { RightActions, UserCard } from "@/components/modules/application";
import { dummyUsers } from "@/utils/dummyUsers";
import { Divider } from "react-native-paper";
import { RWrapper } from "@/components/common";

const MessagesList = () => {
  const [message, setMessage] = useState(dummyUsers);
  const [isRefreshing, setRefreshing] = useState(false);
  function handleDeleteMessage(item: any) {
    setMessage((prev) => {
      return prev.filter((msg) => msg._id !== item._id);
    });
  }
  function handleRefresh() {
    setRefreshing(true);
    setMessage(dummyUsers);
    setRefreshing(false);
  }
  return (
    <RWrapper>
      <FlatList
        data={message}
        renderItem={({ item }) => (
          <UserCard
            avatarImage={item.user.avatar}
            description={item.text}
            onPress={() => {}}
            name={item.user.name}
            renderRightActions={() => (
              <RightActions onDeleteItem={() => handleDeleteMessage(item)} />
            )}
          />
        )}
        keyExtractor={(message) => message._id.toString()}
        ItemSeparatorComponent={() => <Divider />}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
      />
    </RWrapper>
  );
};

export default MessagesList;

const styles = StyleSheet.create({});
