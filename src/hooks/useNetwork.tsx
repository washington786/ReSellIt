import { useNetInfo } from "@react-native-community/netinfo";

const useNetwork = () => {
  const { isInternetReachable } = useNetInfo();
  return { isInternetReachable };
};

export default useNetwork;
