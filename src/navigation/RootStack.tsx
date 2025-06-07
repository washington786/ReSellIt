import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationTypes } from "@/types/navigationTypes";
import { LoginScreen, RegisterScreen } from "@/screens";
import { Welcome } from "@/pages/authentication";
import AppStack from "./AppStack";
import { useAuthCtx } from "@/context/auth";
import { getSecurely } from "@/utils/storage";
import { jwtDecode } from "jwt-decode";
import RSplash from "@/components/common/RSplash";

const Stack = createNativeStackNavigator<navigationTypes>();

const RootStack = () => {
  const { user, login, setIsLoading, isLoading } = useAuthCtx();

  useEffect(() => {
    async function retreiveToken() {
      try {
        setIsLoading(true);
        const token = await getSecurely({ key: "token", value: "" });
        if (!token) return;
        const stored_user = jwtDecode(token);
        login(stored_user as any)

      } catch (error) {
        console.log('token error: ', error)
      } finally {
        setIsLoading(false);
      }
    }
    retreiveToken();
  }, []);

  if (isLoading) return <RSplash />;

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={user ? "app" : "welcome"}
    >
      {
        user ?
          <Stack.Screen name="app" component={AppStack} />
          :
          <>
            <Stack.Screen name="welcome" component={Welcome} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={RegisterScreen} />
          </>
      }
    </Stack.Navigator>
  );
};

export default RootStack;
