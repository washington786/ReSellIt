import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { FC } from "react";
import colors from "@/config/colors";

interface ICard {
  title: string;
  subtitle: number;
  image: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  onPress?(): void;
}
const Card: FC<ICard> = ({ image, subtitle, title, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.con, style]} onPress={onPress}>
      <View style={styles.imgCon}>
        <Image
          source={image ?? require("../../../../assets/jacket.jpg")}
          resizeMode="cover"
          resizeMethod="resize"
          style={styles.img}
        />
        {/* <CachedImage source={{uri:image,}}/> */}
      </View>
      <View style={styles.txtCon}>
        <Text style={[styles.txt, styles.name]}>{title}</Text>
        <Text style={[styles.txt, styles.price]}>
          R{parseFloat(subtitle.toFixed(2))}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  con: {
    backgroundColor: colors.slate[50],
    minHeight: 300,
  },
  imgCon: {
    height: 220,
    width: "100%",
  },
  img: {
    height: "100%",
    width: "100%",
  },
  txtCon: {
    paddingHorizontal: 5,
  },
  txt: {
    fontSize: 25,
  },
  price: {
    color: colors.blue[300],
  },
  name: {
    color: colors.slate[800],
  },
});
