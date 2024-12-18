import { Image, View } from "react-native";
import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextInput, Text, Button } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthLayout from "../../layouts/auth/auth-layout";
import tw from "../../lib/tailwind";
import { SignUpScreenName } from "./auth";
import SocialMedia from "../../components/social-media/social-media";
import { loginSchema, LoginSchema } from "../../utils/rules";
import HeplerTextCustom from "../../components/common/hepler-text-custom";
import { MainNavigationName } from "../../navigation/main-navigation";

type FormData = LoginSchema;

const SignInScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FieldValues) => {
    navigation.reset({
      index: 0,
      routes: [{ name: MainNavigationName }],
    });
  };

  return (
    <AuthLayout>
      <View style={tw`justify-between flex-1 px-4 gap-3`}>
        <View style={tw`gap-1`}>
          <View style={tw`gap-1`}>
            <View style={tw`flex-row items-center justify-center py-2`}>
              <Image source={require("../../../assets/images/logo.png")} />
            </View>
            <Text style={tw`text-2xl font-bold`}>Welcome</Text>
            <Text style={tw``}>Please log in to use all app features.</Text>
          </View>

          {/* form login */}
          <View style={tw`my-3 gap-3`}>
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

            <Button style={tw`py-0.5`} labelStyle={tw`text-xl`} mode="contained" onPress={handleSubmit(onSubmit)}>
              Login
            </Button>
          </View>
          {/* Social Media */}
          <SocialMedia />

          {/* swap to register */}
          <View style={tw`flex-row justify-center items-center mt-1`}>
            <Text>Don&apos;t have an account yet?</Text>
            <Button mode="text" textColor="blue" onPress={() => navigation.navigate(SignUpScreenName)}>
              Register
            </Button>
          </View>
        </View>
      </View>
    </AuthLayout>
  );
};

export default SignInScreen;
