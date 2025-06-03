import { Image, StyleSheet, View } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
const ViewImage = () => {
  return (
    <View style={styles.con}>
      <View style={styles.iconsCon}>
        <Feather name="x" size={30} />
        <Feather name="trash" size={30} color={"red"} />
      </View>
      <View style={styles.imgCon}>
        <Image
          source={require("../../../assets/chair.jpg")}
          resizeMethod="resize"
          resizeMode="contain"
          style={styles.img}
        />
      </View>
    </View>
  );
};

export default ViewImage;

const styles = StyleSheet.create({
  con: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: "white",
  },
  iconsCon: {
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.1,
    flexDirection: "row",
    padding: 10,
  },
  imgCon: {
    flex: 1,
    padding: 10,
  },
  img: {
    width: "100%",
    height: "100%",
  },
});
