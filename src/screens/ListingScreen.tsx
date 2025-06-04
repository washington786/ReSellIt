import { FlatList, Image, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  RButton,
  RImageCon,
  RInput,
  RLoader,
  RPicker,
  RText,
  RUpload,
  Scroller,
} from "@/components/common";
import { auth_styles } from "@/styles";
import { Formik } from "formik";
import { IListing } from "@/interfaces/IListing";
import { listingSchema } from "@/schemas/listingSchema";
import * as ImagePicker from "expo-image-picker";
import { ImageSelectionList } from "@/components/modules/application";

const initialValues: IListing = {
  category: "",
  price: "0",
  description: "",
  title: "",
  images: [],
};

const ListingScreen = () => {
  const [image, setImage] = useState<string[]>([]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      const urls = result.assets.map((item) => item.uri);
      setImage((prev) => [...prev, ...urls]);
    }
  };

  return (
    <>
      <FlatList
        data={[]}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={null}
        ListFooterComponent={
          <>
            <Formik
              initialValues={initialValues}
              onSubmit={() => {}}
              validationSchema={listingSchema}
            >
              {({
                errors,
                isSubmitting,
                handleSubmit,
                values,
                handleChange,
                setFieldTouched,
                touched,
              }) => {
                return (
                  <View style={auth_styles.content_con}>
                    <RUpload onPress={pickImage} title="Upload images" />
                    {image.length > 0 && (
                      <ImageSelectionList
                        data={image}
                        onRemoveImage={(imgUri) =>
                          setImage((image) =>
                            image.filter((uri) => uri !== imgUri)
                          )
                        }
                      />
                    )}
                    {errors.images && (
                      <RText title={errors.images.toString()} />
                    )}
                    <RInput
                      placeholder="Title"
                      autoCapitalize="none"
                      autoComplete="name"
                      autoCorrect={false}
                      value={values.category}
                      onBlur={() => setFieldTouched("title")}
                      onChangeText={handleChange("title")}
                    />
                    {errors.title && touched.title && (
                      <RText title={errors.title} />
                    )}
                    <RInput
                      placeholder="Price"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={values.price.toString()}
                      onBlur={() => setFieldTouched("price")}
                      onChangeText={handleChange("price")}
                    />
                    {errors.price && touched.price && (
                      <RText title={errors.price} />
                    )}
                    <RPicker />
                    {errors.category && touched.category && (
                      <RText title={errors.category} />
                    )}
                    <RInput
                      placeholder="description"
                      autoCapitalize="none"
                      autoCorrect={false}
                      value={values.description}
                      onChangeText={handleChange("description")}
                      onBlur={() => setFieldTouched("description")}
                      multiline
                      numberOfLines={4}
                    />
                    {errors.description && touched.description && (
                      <RText title={errors.description} />
                    )}
                    <RButton
                      title="create listing"
                      onPressButton={handleSubmit}
                      styleBtn={[
                        auth_styles.btn,
                        isSubmitting && auth_styles.isLoading,
                      ]}
                    />
                    {isSubmitting && <RLoader />}
                  </View>
                );
              }}
            </Formik>
          </>
        }
      />
      {/* <Scroller></Scroller> */}
    </>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({});
