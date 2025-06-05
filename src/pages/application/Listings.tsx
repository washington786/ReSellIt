import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import useTransition from "@/hooks/useTransition";
import { RWrapper } from "@/components/common";
import { Card } from "@/components/modules/application";

const Listings = () => {
  const { onListDetails } = useTransition();
  return (
    <RWrapper>
      <FlatList
        data={[1, 2]}
        contentContainerStyle={{ gap: 5, paddingHorizontal: 6 }}
        keyExtractor={(_, index) => `$-${index.toString}`}
        renderItem={({ index }) => {
          return (
            <Card
              subtitle={500}
              title="Red Jacket For sale"
              image={require("../../assets/jacket.jpg")}
              style={{ borderRadius: 10, overflow: "hidden" }}
              onPress={() => onListDetails(index.toString())}
            />
          );
        }}
      />
    </RWrapper>
  );
};

export default Listings;
