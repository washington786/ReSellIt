import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import {
  RButton,
  RErrorMessage,
  RInput,
  RLoader,
  RLogo,
  RText,
  Scroller,
} from "@/components/common";
import { auth_styles } from "@/styles";
import { Formik } from "formik";
import { IAccount } from "@/interfaces/IRegister";
import { accountCreateSchema } from "@/schemas/accountSchema";
import { register } from "@/api/auth";
import { useAuthCtx } from "@/context/auth";

const initialValues: IAccount = {
  email: "",
  fullname: "",
  password: "",
};


const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthCtx()
  const [error, setError] = useState("");
  async function handleSubmit(values: IAccount) {
    try {
      const res = await register(values);
      console.log("reg response", res);
      login(res)
    } catch (error: any) {
      setError(error);
      setIsLoading(false);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Scroller>
      <View style={auth_styles.logo_con}>
        <RLogo stylesLogo={auth_styles.logo} />
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={accountCreateSchema}
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
              {error &&
                <RErrorMessage error={error.toString()} />
              }
              <RInput
                placeholder="Name"
                icon={"user"}
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect={false}
                value={values.fullname}
                onBlur={() => setFieldTouched("fullname")}
                onChangeText={handleChange("fullname")}
              />
              {errors.fullname && touched.fullname && (
                <RText title={errors.fullname} />
              )}
              <RInput
                placeholder="Email"
                icon={"mail"}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                value={values.email}
                onBlur={() => setFieldTouched("email")}
                onChangeText={handleChange("email")}
              />
              {errors.email && touched.email && <RText title={errors.email} />}
              <RInput
                placeholder="Password"
                icon={"lock"}
                autoCapitalize="none"
                autoComplete="password"
                autoCorrect={false}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
              />
              {errors.password && touched.password && (
                <RText title={errors.password} />
              )}
              <RButton
                title="create account"
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

export default RegisterScreen;

const styles = StyleSheet.create({});
