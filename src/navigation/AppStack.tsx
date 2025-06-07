import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";

import HomeStack from "./HomeStack";
import AccountStack from "./AccountStack";
import { ListingScreen } from "@/screens";
import { RoundedTabButton } from "@/components/modules/application";

import colors from "@/config/colors";
import type { navigationTypes } from "@/types/navigationTypes";

const Tabs = createBottomTabNavigator<navigationTypes>();

const AppStack = () => (
  <Tabs.Navigator
    initialRouteName="homeStack"
    screenOptions={{
      headerShown: false,
      tabBarInactiveBackgroundColor: colors.slate[50],
      tabBarInactiveTintColor: colors.zinc[500],
      tabBarActiveTintColor: colors.primary[600],
    }}
  >
    <Tabs.Screen
      name="homeStack"
      component={HomeStack}

      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <AntDesign
            name={"appstore-o"}
            size={size}
            color={focused ? color : colors.gray[400]}
          />
        ),
        tabBarLabel: "Listings"
      }}
    />
    <Tabs.Screen
      name="listings"
      component={ListingScreen}
      options={({ navigation }) => ({
        tabBarButton: () => (
          <RoundedTabButton onPress={() => navigation.navigate("listings")} />
        ),
        tabBarIcon: ({ color, focused, size }) => (
          <AntDesign
            name={"pluscircle"}
            size={size}
            color={focused ? color : colors.gray[400]}
          />
        ),
        tabBarItemStyle: { position: "absolute", left: 0, right: 0 },
      })}
    />
    <Tabs.Screen
      name="profileStack"
      component={AccountStack}
      options={{
        tabBarIcon: ({ color, focused, size }) => (
          <AntDesign
            name={"user"}
            size={size}
            color={focused ? color : colors.gray[400]}
          />
        ),
        tabBarLabel: "Account"
      }}
    />
  </Tabs.Navigator>
);

export default AppStack;
