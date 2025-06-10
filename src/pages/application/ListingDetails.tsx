import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React from "react";
import { Card, UserCard } from "@/components/modules/application";
import { RouteProp, useRoute } from "@react-navigation/native";
import { navigationTypes } from "@/types/navigationTypes";
import { IList } from "@/interfaces/IListing";
import { RButton, RErrorMessage, RHeader, RInput, RWrapper } from "@/components/common";
import colors from "@/config/colors";
import { Formik } from "formik";
import { notificationSchema } from "@/schemas/message";
import { sendMessage } from "@/api/messages";

const initialValues: {
  message: string
} = {
  message: ""
}

const ListingDetails = () => {
  const route = useRoute<RouteProp<navigationTypes, "listingDetails">>();
  const { id } = route.params;
  const { images, price, title, id: listId } = id as any as IList;

  async function handleSubmit(values: { message: string }) {
    try {
      const item = { message: values.message, listId }
      const res = await sendMessage(item);
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <RWrapper>
      <RHeader name="List Details" />
      <Card
        subtitle={price}
        title={title}
        image={{
          uri: images[0].url.replace(
            "http://192.168.0.14:9000/",
            "http://192.168.0.221:9000/"
          ),
        }}
      />
      <UserCard
        avatarImage=""
        description={`5 listings`}
        name="Daniel Hon"
        onPress={() => { }}
      />

      <Formik initialValues={initialValues} onSubmit={(values, { resetForm }) => {
        handleSubmit(values);
        resetForm();
      }} validationSchema={notificationSchema}>
        {({ errors, touched, values, handleChange }) => {
          return (
            <>
              <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}>
                <RInput placeholder="Message...." customStyle={styles.input} multiline value={values.message} onChangeText={() => handleChange("message")} />
                {errors.message && touched.message && <RErrorMessage error={errors.message} />}
              </KeyboardAvoidingView>
              <RButton title="contact seller" onPressButton={() => { }} styleBtn={styles.btn} />
            </>
          )
        }}
      </Formik>

    </RWrapper>
  );

};

export default ListingDetails;

const styles = StyleSheet.create({
  input: {
    borderRadius: 100,
    marginTop: 15,
    marginBottom: 10
  },
  btn: {
    backgroundColor: colors.primary[500]
  }
});
