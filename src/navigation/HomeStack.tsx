import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationTypes } from "@/types/navigationTypes";
import { HomeScreen } from "@/screens";
import { ListingDetails } from "@/pages/application";

const Stack = createNativeStackNavigator<navigationTypes>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="listingDetails"
        component={ListingDetails}
        options={{ title: "List Details" }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
