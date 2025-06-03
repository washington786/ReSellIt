import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  RButton,
  RInput,
  RLoader,
  RLogo,
  RPicker,
  RText,
  Scroller,
} from "@/components/common";
import { auth_styles } from "@/styles";
import { Formik } from "formik";
import { IListing } from "@/interfaces/IListing";
import { listingSchema } from "@/schemas/listingSchema";

const initialValues: IListing = {
  category: "",
  price: "0",
  description: "",
  title: "",
};

const ListingScreen = () => {
  return (
    <Scroller>
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
              <RInput
                placeholder="Title"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect={false}
                value={values.category}
                onBlur={() => setFieldTouched("title")}
                onChangeText={handleChange("title")}
              />
              {errors.title && touched.title && <RText title={errors.title} />}
              <RInput
                placeholder="Price"
                autoCapitalize="none"
                autoCorrect={false}
                value={values.price.toString()}
                onBlur={() => setFieldTouched("price")}
                onChangeText={handleChange("price")}
              />
              {errors.price && touched.price && <RText title={errors.price} />}
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
    </Scroller>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({});
