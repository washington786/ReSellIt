import React, { FC, ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";
import appTheme from "@/theme/navigationTheme";

const ParentNavigation: FC<{ children: ReactNode }> = ({ children }) => {
  return <NavigationContainer theme={appTheme}>{children}</NavigationContainer>;
};

export default ParentNavigation;
