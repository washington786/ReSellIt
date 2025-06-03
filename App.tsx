import { RInput, RPicker, RSwitch, SafeArea } from "@/components/common";
import { Card } from "@/components/modules/application";
import { ListingDetails, MessagesList, ViewImage } from "@/pages/application";
import { Welcome } from "@/pages/authentication";
import {
  AccountScreen,
  HomeScreen,
  ListingScreen,
  LoginScreen,
  RegisterScreen,
} from "@/screens";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <SafeArea>
      <GestureHandlerRootView>
        {/* <MessagesList /> */}
        {/* <AccountScreen /> */}
        {/* <HomeScreen /> */}
        {/* <RInput />
        <RSwitch />
        <RPicker /> */}
        {/* <LoginScreen /> */}
        {/* <RegisterScreen /> */}
        <ListingScreen />
      </GestureHandlerRootView>
      {/* <Welcome /> */}
      {/* <ViewImage /> */}
      {/* <ListingDetails /> */}
    </SafeArea>
  );
}
