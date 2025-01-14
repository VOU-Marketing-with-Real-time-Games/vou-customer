import { Image, View } from "react-native";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextInput, Text, Button } from "react-native-paper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import { useDispatch } from "react-redux";
import AuthLayout from "../../layouts/auth/auth-layout";
import tw from "../../lib/tailwind";
import { SignUpScreenName } from "./auth";
import SocialMedia from "../../components/social-media/social-media";
import { loginSchema, LoginSchema } from "../../utils/rules";
import HeplerTextCustom from "../../components/common/hepler-text-custom";
import { MainNavigationName } from "../../navigation/main-navigation";
import { userApi } from "../../api/user.api";
import { IFullUser, ILoginRes, IUser } from "../../types/user";
import { AppDispatch } from "../../store";
import { setUser } from "../../store/user";

type FormData = LoginSchema;

const SignInScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [token, setToken] = React.useState<string>("");

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const profileMutation = useMutation({
    mutationFn: (email: string) => userApi.getProfile(email),
    onError: (error: AxiosError) => {
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
        text2: typeof error.response?.data === "string" ? error.response.data : "Vui lòng thử lại sau",
      });
    },
    onSuccess: (response: IFullUser) => {
      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công",
      });
      // luu vao localstorage
      console.log("response", response);
      dispatch(
        setUser({
          email: response.email,
          token,
          userId: response.id,
          username: response.userName || response.username || "",
          image: response.image || "https://avatar.iran.liara.run/public",
        }),
      );
      // ve trang home
      navigation.reset({
        index: 0,
        routes: [{ name: MainNavigationName }],
      });
    },
  });

  const signinMutation = useMutation({
    mutationFn: (body: FormData) => userApi.login(body.username, body.password),
    onError: (error: AxiosError) => {
      Toast.show({
        type: "error",
        text1: "Đăng nhập thất bại",
        text2: typeof error.response?.data === "string" ? error.response.data : "Vui lòng thử lại sau",
      });
    },
    onSuccess: (response: ILoginRes) => {
      Toast.show({
        type: "success",
        text1: "Đăng nhập thành công",
      });
      // lay thong tin user va token
      setToken(response.token);
      // luu vao localstorage
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await signinMutation.mutate(data);
    await profileMutation.mutate(data.username);
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
              <Text variant="titleMedium">Username</Text>
              <View>
                <TextInput
                  mode="outlined"
                  onChangeText={(e) => setValue("username", e)}
                  placeholder="Username"
                  left={<TextInput.Icon icon="account" />}
                  error={!!errors.username?.message}
                />
                <HeplerTextCustom errorText={errors.username?.message} />
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

            <Button
              style={tw`py-0.5 mt-5`}
              labelStyle={tw`text-xl`}
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              disabled={signinMutation.isPending}
            >
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
