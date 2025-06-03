import { View } from "react-native";
import React from "react";
import {
  RButton,
  RInput,
  RLoader,
  RLogo,
  RText,
  Scroller,
} from "@/components/common";
import { ILogin } from "@/interfaces/ILogin";
import { Formik } from "formik";
import { loginSchema } from "@/schemas/loginSchema";
import { auth_styles } from "@/styles";

const initialValues: ILogin = {
  password: "",
  email: "",
};

const LoginScreen = () => {
  return (
    <Scroller>
      <View style={auth_styles.logo_con}>
        <RLogo stylesLogo={auth_styles.logo} />
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validationSchema={loginSchema}
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
                title="login"
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

export default LoginScreen;
