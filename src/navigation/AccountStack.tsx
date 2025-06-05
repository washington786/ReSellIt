import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationTypes } from "@/types/navigationTypes";
import { MessagesList } from "@/pages/application";
import { AccountScreen } from "@/screens";
const Stack = createNativeStackNavigator<navigationTypes>();
const AccountStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="profile"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="messages"
        component={MessagesList}
        options={{ title: "My Messages" }}
      />
    </Stack.Navigator>
  );
};

export default AccountStack;
