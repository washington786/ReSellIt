import React from "react";
import ParentNavigation from "./ParentNavigation";
import RootStack from "./RootStack";
import { SafeArea } from "@/components/common";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const NavigationMain = () => {
  return (
    <SafeArea>
      <GestureHandlerRootView>
        <ParentNavigation>
          <RootStack />
        </ParentNavigation>
      </GestureHandlerRootView>
    </SafeArea>
  );
};

export default NavigationMain;
