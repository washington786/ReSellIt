import React, { FC, ReactNode } from "react";
import { NavigationContainer } from "@react-navigation/native";

const ParentNavigation: FC<{ children: ReactNode }> = ({ children }) => {
  return <NavigationContainer>{children}</NavigationContainer>;
};

export default ParentNavigation;
