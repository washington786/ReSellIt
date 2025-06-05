import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationTypes } from "@/types/navigationTypes";
import { LoginScreen, RegisterScreen } from "@/screens";
import { Welcome } from "@/pages/authentication";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator<navigationTypes>();

const RootStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="app"
    >
      <Stack.Screen name="welcome" component={Welcome} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />

      <Stack.Screen name="app" component={AppStack} />
    </Stack.Navigator>
  );
};

export default RootStack;
