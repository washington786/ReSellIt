import React from "react";
import ParentNavigation from "./ParentNavigation";
import RootStack from "./RootStack";
import { RNetworkAlert, SafeArea } from "@/components/common";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useNetwork from "@/hooks/useNetwork";
import { AuthProvider, useAuthCtx } from "@/context/auth";

const NavigationMain = () => {
  const { isInternetReachable } = useNetwork();

  const { isLoading } = useAuthCtx();

  return (
    <SafeArea>
      <AuthProvider>
        <GestureHandlerRootView>
          <ParentNavigation>
            {!isInternetReachable && !isLoading && <RNetworkAlert />}
            <RootStack />
          </ParentNavigation>
        </GestureHandlerRootView>
      </AuthProvider>
    </SafeArea>
  );
};

export default NavigationMain;
