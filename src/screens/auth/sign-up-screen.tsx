import { Image, View } from "react-native";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextInput, Text, Button } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../../layouts/auth/auth-layout";
import tw from "../../lib/tailwind";
import { OtpScreenName, SignInScreenName } from "./auth";
import { registerSchema, RegisterSchema } from "../../utils/rules";
import HeplerTextCustom from "../../components/common/hepler-text-custom";

type FormData = RegisterSchema;

const SignUpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
      phoneNumber: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    navigation.navigate(OtpScreenName);
  };

  return (
    <AuthLayout>
      <View style={tw`justify-between flex-1 px-4`}>
        <View style={tw`gap-1`}>
          <View style={tw`gap-1`}>
            <View style={tw`flex-row items-center justify-center py-2`}>
              <Image source={require("../../../assets/images/logo.png")} />
            </View>
            <Text style={tw`text-2xl font-bold`}>Register</Text>
            <Text style={tw``}>Please register to use all features of the application</Text>
          </View>

          {/* form register */}
          <View style={tw`mt-3 gap-3`}>
            <View style={tw`gap-1`}>
              <Text variant="titleMedium">Full Name</Text>
              <View>
                <TextInput
                  mode="outlined"
                  onChangeText={(e) => setValue("fullName", e)}
                  placeholder="Your fullname"
                  left={<TextInput.Icon icon="account" />}
                  error={!!errors.fullName?.message}
                />
                <HeplerTextCustom errorText={errors.fullName?.message} />
              </View>
            </View>

            <View style={tw`gap-1`}>
              <Text variant="titleMedium">Phone number</Text>
              <View>
                <TextInput
                  mode="outlined"
                  onChangeText={(e) => setValue("phoneNumber", e)}
                  placeholder="Your phone number"
                  left={<TextInput.Icon icon="cellphone" />}
                  error={!!errors.phoneNumber?.message}
                />
                <HeplerTextCustom errorText={errors.phoneNumber?.message} />
              </View>
            </View>

            <View style={tw`gap-1`}>
              <Text variant="titleMedium">Email</Text>
              <View>
                <TextInput
                  mode="outlined"
                  onChangeText={(e) => setValue("email", e)}
                  placeholder="abc@gmail.com"
                  left={<TextInput.Icon icon="email" />}
                  error={!!errors.email?.message}
                />
                <HeplerTextCustom errorText={errors.email?.message} />
              </View>
            </View>

            <View style={tw`gap-1`}>
              <Text variant="titleMedium">Password</Text>
              <View>
                <TextInput
                  mode="outlined"
                  onChangeText={(e) => setValue("password", e)}
                  placeholder="Your password"
                  secureTextEntry={!showPassword}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    showPassword ? (
                      <TextInput.Icon icon="eye-off" onPress={() => setShowPassword(false)} />
                    ) : (
                      <TextInput.Icon icon="eye" onPress={() => setShowPassword(true)} />
                    )
                  }
                  error={!!errors.password?.message}
                />
                <HeplerTextCustom errorText={errors.password?.message} />
              </View>
            </View>

            <View style={tw`gap-1`}>
              <Text variant="titleMedium">Confirm Password</Text>
              <View>
                <TextInput
                  mode="outlined"
                  onChangeText={(e) => setValue("confirmPassword", e)}
                  placeholder="Your confirm password"
                  secureTextEntry={!showConfirmPassword}
                  left={<TextInput.Icon icon="lock" />}
                  right={
                    showConfirmPassword ? (
                      <TextInput.Icon icon="eye-off" onPress={() => setShowConfirmPassword(false)} />
                    ) : (
                      <TextInput.Icon icon="eye" onPress={() => setShowConfirmPassword(true)} />
                    )
                  }
                  error={!!errors.confirmPassword?.message}
                />
                <HeplerTextCustom errorText={errors.confirmPassword?.message} />
              </View>
            </View>

            <Button style={tw`py-0.5 mt-2`} labelStyle={tw`text-xl`} mode="contained" onPress={handleSubmit(onSubmit)}>
              Register
            </Button>
          </View>

          {/* swap to login */}
          <View style={tw`flex-row justify-center items-center`}>
            <Text>Already have an account?</Text>
            <Button mode="text" textColor="blue" onPress={() => navigation.navigate(SignInScreenName)}>
              Login
            </Button>
          </View>
        </View>
      </View>
    </AuthLayout>
  );
};
export default SignUpScreen;
