import { StyleSheet, Image, View } from "react-native";
import React from "react";
import OTPTextView from "react-native-otp-textinput";
import { Button, Text } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import AuthLayout from "../../layouts/auth/auth-layout";
import tw from "../../lib/tailwind";
import { SignInScreenName } from "./auth";

const styles = StyleSheet.create({
  otpInput: {
    borderRadius: 10,
    borderWidth: 3,
    color: "#e706c9",
  },
});

const OtpScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [otp, setOtp] = React.useState<string>("");

  const onSubmit = async () => {
    navigation.navigate(SignInScreenName);
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
            We are automactically detecting a SMS send to your phone number
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
          <Button mode="contained" onPress={onSubmit}>
            Confirm
          </Button>
          <Button mode="outlined" onPress={() => {}}>
            Resend OTP
          </Button>
        </View>
      </View>
    </AuthLayout>
  );
};

export default OtpScreen;
