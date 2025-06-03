import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card, UserCard } from "@/components/modules/application";

const ListingDetails = () => {
  return (
    <View>
      <Card
        subtitle={500}
        title="Red Jacket For sale"
        image={require("../../../assets/jacket.jpg")}
      />
      <UserCard
        avatarImage=""
        description={4500}
        name="Daniel Hon"
        onPress={() => {}}
      />
    </View>
  );
};

export default ListingDetails;

const styles = StyleSheet.create({});
