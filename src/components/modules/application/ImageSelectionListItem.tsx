import { Image } from "react-native";
import React, { FC } from "react";
import { RImageCon } from "@/components/common";

const ImageSelectionListItem: FC<{ setImage(): void; image: string }> = ({
  image,
  setImage,
}) => {
  return (
    <RImageCon onRemove={setImage}>
      <Image
        source={{ uri: image }}
        style={{ height: "100%", width: "100%" }}
        resizeMethod="resize"
        resizeMode="cover"
      />
    </RImageCon>
  );
};

export default ImageSelectionListItem;
