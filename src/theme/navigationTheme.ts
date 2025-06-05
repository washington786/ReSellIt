import colors from "@/config/colors";
import { DefaultTheme } from "@react-navigation/native";

const appTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary[600],
    background: colors.slate[50],
  },
};
export default appTheme;
