import { StyleSheet, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="" component={() => <Text>Hello</Text>} />
    </Stack.Navigator>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
