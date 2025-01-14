import { StyleSheet, Image, View } from "react-native";
import React from "react";
import OTPTextView from "react-native-otp-textinput";
import { Button, Text } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Toast from "react-native-toast-message";
import AuthLayout from "../../layouts/auth/auth-layout";
import tw from "../../lib/tailwind";
import { SignInScreenName } from "./auth";
import { userApi } from "../../api/user.api";
import { IResError } from "../../types/response";

type RouteParams = {
  params: {
    data: {
      email: string;
    };
  };
};

const styles = StyleSheet.create({
  otpInput: {
    borderRadius: 10,
    borderWidth: 3,
    color: "#e706c9",
    fontSize: 16,
  },
});

const OtpScreen = ({ route }: { route: RouteParams }) => {
  const { email } = route.params.data;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [otp, setOtp] = React.useState<string>("");

  const sendOtpMutation = useMutation({
    mutationFn: () => userApi.sendOtp(email),
    onError: (error: AxiosError) => {
      Toast.show({
        type: "error",
        text1: "Lỗi gửi OTP",
        text2: (error.response?.data as IResError)?.errors[0] || "Vui lòng thử lại sau",
      });
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Gửi OTP thành công",
        text2: `Vui lòng kiểm tra email: ${email} của bạn`,
      });
    },
  });

  const verifyMutation = useMutation({
    mutationFn: () => userApi.verifyAccount(email, otp),
    onError: (error: AxiosError) => {
      Toast.show({
        type: "error",
        text1: "Lỗi xác thực email",
        text2: (error.response?.data as string) || "Vui lòng thử lại sau",
      });
    },
    onSuccess: () => {
      Toast.show({
        type: "success",
        text1: "Xác thực thành công",
        text2: "Bây giờ bạn có thể đăng nhập vào ứng dụng",
      });
      navigation.navigate(SignInScreenName);
    },
  });

  const onSubmit = () => {
    verifyMutation.mutate();
  };

  return (
    <AuthLayout>
      <View style={tw`flex-1 px-4 py-1 gap-5`}>
        <View style={tw`items-center justify-center gap-5 mt-2`}>
          <Image source={require("../../../assets/images/logo.png")} />
          <Image source={require("../../../assets/images/verify-otp.png")} />
        </View>
        <View style={tw`gap-1`}>
          <Text variant="headlineSmall" style={tw`text-center font-bold`}>
            Enter Verification Code
          </Text>
          <Text variant="bodyLarge" style={tw`text-center`}>
            We have sent the otp code to your email
          </Text>
        </View>
        <View style={tw`flex-1 items-center justify-center`}>
          <OTPTextView
            inputCount={6}
            handleTextChange={(e) => setOtp(e)}
            offTintColor="#fdb0f3"
            tintColor="#e706c9"
            autoFocus
            textInputStyle={styles.otpInput}
          />
        </View>
        <View style={tw`gap-4 mb-5`}>
          <Button mode="contained" onPress={onSubmit} disabled={verifyMutation.isPending || sendOtpMutation.isPending}>
            Confirm
          </Button>
          <Button
            mode="outlined"
            onPress={() => sendOtpMutation.mutate()}
            disabled={verifyMutation.isPending || sendOtpMutation.isPending}
          >
            Resend OTP
          </Button>
        </View>
      </View>
    </AuthLayout>
  );
};

export default OtpScreen;
