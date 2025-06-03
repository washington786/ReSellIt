import { StyleSheet } from "react-native";
import colors from "@/config/colors";

const auth_styles = StyleSheet.create({
  logo: {
    height: 60,
    width: 60,
  },
  logo_con: {
    flex: 0.2,
    alignItems: "center",
    justifyContent: "center",
  },
  content_con: {
    flex: 1,
    gap: 6,
    paddingHorizontal: 12,
  },
  btn: {
    backgroundColor: colors.primary[600],
    borderRadius: 8,
    marginVertical: 22,
  },
  isLoading: {
    backgroundColor: colors.zinc[600],
  },
});
export default auth_styles;
