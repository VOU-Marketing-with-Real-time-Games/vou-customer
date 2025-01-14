import { Image, View } from "react-native";
import React from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import OnboardingLayout from "../../layouts/onboarding/onboarding-layout";
import { OnboardingScreenName } from "../onboarding/onboarding";
import tw from "../../lib/tailwind";
import { MainNavigationName } from "../../navigation/main-navigation";
import { AppState } from "../../store";

const SplashScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const user = useSelector((state: AppState) => state.user);

  React.useEffect(() => {
    setTimeout(() => {
      if (user && user.username) {
        navigation.replace(MainNavigationName);
      } else {
        navigation.replace(OnboardingScreenName);
      }
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <OnboardingLayout>
      <View style={tw`flex-1 items-center justify-center`}>
        <Image source={require("../../../assets/images/logo.png")} />
      </View>
    </OnboardingLayout>
  );
};

export default SplashScreen;

export const SplashScreenName = "splash";
