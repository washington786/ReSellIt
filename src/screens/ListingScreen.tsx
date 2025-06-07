import { FlatList, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  RButton,
  RInput,
  RLoader,
  RModal,
  RPicker,
  RServerError,
  RText,
  RUpload,
} from "@/components/common";
import { auth_styles } from "@/styles";
import { Formik } from "formik";
import { IListing } from "@/interfaces/IListing";
import { listingSchema } from "@/schemas/listingSchema";
import * as ImagePicker from "expo-image-picker";
import { ImageSelectionList } from "@/components/modules/application";
import useGetLocation from "@/hooks/useGetLocation";
import { createListing } from "@/api/listings";
import { listAddingData } from "@/utils/listAdding";

const initialValues: IListing = {
  category: "",
  price: "0",
  description: "",
  title: "",
  images: [],
};

const ListingScreen = () => {
  // const [image, setImage] = useState<string[]>([]);
  // const { values } = useFormikContext<any>();
  const { location } = useGetLocation();

  const cords: { lat: any; long: any } = {
    lat: location?.coords.latitude,
    long: location?.coords.longitude,
  };

  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function handleCreateList(values: IListing) {
    setLoading(true);
    setError("");
    try {
      const data = listAddingData({
        values: values,
        cords: cords,
        image: values.images,
      });
      const res = await createListing({
        data: data,
        onUploadProgress: (progress: number) => {
          setProgress(progress);
        },
      });
      console.log("response: ", res);

      alert("success");
    } catch (error: any) {
      setLoading(false);
      setError(error);
      alert(error);
    } finally {
      setError("");
      setLoading(false);
    }
  }

  if (error) {
    return (
      <RServerError
        title={error.toString()}
        onPress={() => {
          setError("");
        }}
      />
    );
  }

  return (
    <>
      <FlatList
        style={{ paddingTop: 10 }}
        data={[]}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={null}
        ListFooterComponent={
          <>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, { resetForm }) => {
                handleCreateList(values);
                resetForm();
              }}
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
                setFieldValue,
              }) => {
                const pickImage = async () => {
                  let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ["images", "videos"],
                    allowsEditing: false,
                    aspect: [4, 3],
                    quality: 1,
                    allowsMultipleSelection: true,
                  });

                  if (!result.canceled) {
                    const urls = result.assets.map((item) => item.uri);
                    const currentImg = values.images || [];
                    setFieldValue("images", [...currentImg, ...urls]);
                  }
                };

                const removeImage = (uriToRemove: string) => {
                  const filtered = values.images.filter(
                    (uri: string) => uri !== uriToRemove
                  );
                  setFieldValue("images", filtered);
                };
                return (
                  <View style={auth_styles.content_con}>
                    <RUpload onPress={pickImage} title="Upload images" />
                    {values.images?.length > 0 && (
                      <ImageSelectionList
                        data={values.images}
                        onRemoveImage={removeImage}
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
                      value={values.title}
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
                      keyboardType="numeric"
                      value={values.price.toString()}
                      onBlur={() => setFieldTouched("price")}
                      onChangeText={handleChange("price")}
                    />
                    {errors.price && touched.price && (
                      <RText title={errors.price} />
                    )}
                    <RPicker category="category" />
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
      {isLoading && progress !== 100 && (
        <RModal isDone={progress === 100 ? true : false} progress={progress} />
      )}
    </>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({});
