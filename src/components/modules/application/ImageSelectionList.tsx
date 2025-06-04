import { StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { FlatList } from "react-native-gesture-handler";
import ImageSelectionListItem from "./ImageSelectionListItem";

interface props {
  data: string[];
  onRemoveImage(image: string): void;
}
const ImageSelectionList: FC<props> = ({ data, onRemoveImage }) => {
  return (
    <View>
      <FlatList
        numColumns={3}
        data={data}
        columnWrapperStyle={{ gap: 8 }}
        keyExtractor={(item, index) => `${item.toString()}-${index}`}
        renderItem={({ item }) => {
          return (
            <>
              <ImageSelectionListItem
                image={item}
                setImage={() => onRemoveImage(item)}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default ImageSelectionList;

const styles = StyleSheet.create({});
