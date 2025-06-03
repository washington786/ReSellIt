import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import colors from "@/config/colors";

const RPicker = () => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View style={styles.con}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
};

export default RPicker;

const styles = StyleSheet.create({
  con: {
    minHeight: 45,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 5,
  },
});
