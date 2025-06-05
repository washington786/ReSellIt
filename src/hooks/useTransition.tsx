import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { navigationTypes } from "@/types/navigationTypes";

const useTransition = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<navigationTypes>>();

  function goBack() {
    navigation.goBack();
  }
  function onLogin() {
    navigation.navigate("login");
  }
  function onRegister() {
    navigation.navigate("register");
  }
  function onListDetails(id: string) {
    navigation.navigate("listingDetails", { id });
  }

  // app
  function onMessages() {
    navigation.navigate("messages");
  }
  function onMyList() {
    navigation.navigate("listings");
  }
  return { goBack, onLogin, onRegister, onListDetails, onMessages, onMyList };
};

export default useTransition;
