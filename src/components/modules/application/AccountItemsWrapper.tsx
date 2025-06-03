import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface prop {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}
function AccountItemsWrapper({ children, style }: prop) {
  return <View style={style}>{children}</View>;
}

export default AccountItemsWrapper;
