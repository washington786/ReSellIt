import { View } from "react-native";
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

import { ILogin } from "@/interfaces/ILogin";
import { Formik } from "formik";
import { loginSchema } from "@/schemas/loginSchema";
import { auth_styles } from "@/styles";
import { login } from "@/api/auth";
import { jwtDecode } from "jwt-decode";
import { useAuthCtx } from "@/context/auth";
import { saveSecurely } from "@/utils/storage";

const initialValues: ILogin = {
  password: "",
  email: "",
};

const LoginScreen = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { login: loginUser } = useAuthCtx();

  async function handleLogin(values: ILogin) {
    setLoading(true);
    setError("");

    try {
      const res = await login({ email: values.email, password: values.password });
      const decodedToken = jwtDecode(res);
      loginUser(decodedToken as any);
      saveSecurely({ key: "token", value: res });

    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Scroller>
      <View style={auth_styles.logo_con}>
        <RLogo stylesLogo={auth_styles.logo} />
      </View>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
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
              {
                error && <RErrorMessage error={error} />
              }
              {/* <RErrorMessage error={"Error"} /> */}

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
