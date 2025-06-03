import { FlatList, StyleSheet } from "react-native";
import React from "react";
import { RWrapper } from "@/components/common";
import { Card } from "@/components/modules/application";

const HomeScreen = () => {
  return (
    <RWrapper>
      <FlatList
        data={[1, 2]}
        contentContainerStyle={{ gap: 5, paddingHorizontal: 6 }}
        keyExtractor={(_, index) => `$-${index.toString}`}
        renderItem={() => {
          return (
            <Card
              subtitle={500}
              title="Red Jacket For sale"
              image={require("../../assets/jacket.jpg")}
              style={{ borderRadius: 10, overflow: "hidden" }}
              onPress={() => {}}
            />
          );
        }}
      />
    </RWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
