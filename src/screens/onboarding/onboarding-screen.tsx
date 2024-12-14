import { Image, View, Text } from "react-native";
import React from "react";
import { Button } from "react-native-paper";

import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import OnboardingLayout from "../../layouts/onboarding/onboarding-layout";

import tw from "../../lib/tailwind";
import { SignInScreenName } from "../auth/auth";

const OnboardingScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <OnboardingLayout>
      <View style={tw`mt-20`}>
        <Image source={require("../../../assets/images/onboarding/onboarding_0.png")} />
      </View>
      <View style={tw`px-5 w-full flex-col justify-between`}>
        <Image source={require("../../../assets/images/logo.png")} />
        <Text style={tw`text-center mt-2 text-xl`}>Play, Win, Connect! Your Rewards Await.</Text>
      </View>
      <View style={tw`px-4 absolute bottom-10 w-full flex-col justify-between`}>
        <Button
          style={tw`w-full py-1`}
          labelStyle={tw`text-xl`}
          mode="contained"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: SignInScreenName }],
            })
          }
        >
          Get Started
        </Button>
      </View>
    </OnboardingLayout>
  );
};
export default OnboardingScreen;
