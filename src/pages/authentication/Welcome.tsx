import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import React from "react";
import { RButton } from "@/components/common";
import colors from "@/config/colors";

const Welcome = () => {
  const { width } = useWindowDimensions();
  return (
    <ImageBackground
      style={styles.container}
      source={require("../../../assets/background.jpg")}
      blurRadius={10}
    >
      <View style={styles.logoCon}>
        <Image
          source={require("../../../assets/logo-red.png")}
          resizeMode="contain"
          resizeMethod="resize"
          style={{ width: width * 0.2, height: width * 0.2 }}
        />
        <Text>Sell What You Don't Need</Text>
      </View>
      <View style={styles.btnsCon}>
        <RButton
          title="login"
          onPressButton={() => {}}
          styleBtn={styles.btnLogin}
        />
        <RButton
          title="register"
          onPressButton={() => {}}
          styleBtn={styles.btnRegister}
        />
      </View>
    </ImageBackground>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
  logoCon: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 15,
    marginTop: 50,
    gap: 10,
  },
  btnsCon: {
    flex: 0.2,
    paddingHorizontal: 8,
    gap: 6,
  },
  btnLogin: {
    backgroundColor: colors.primary[500],
  },
  btnRegister: {
    backgroundColor: colors.green[500],
  },
});
