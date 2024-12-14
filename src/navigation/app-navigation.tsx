import React from "react";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen, { SplashScreenName } from "../screens/splash/splash-screen";
import OnboardingScreen from "../screens/onboarding/onboarding-screen";
import { OnboardingScreenName } from "../screens/onboarding/onboarding";
import { OtpScreenName, SignInScreenName, SignUpScreenName } from "../screens/auth/auth";
import SignInScreen from "../screens/auth/sign-in-screen";
import SignUpScreen from "../screens/auth/sign-up-screen";
import OtpScreen from "../screens/auth/otp-screen";

export type NavigatorParamList = {
  [SplashScreenName]: undefined;
  [OnboardingScreenName]: undefined;
  [SignInScreenName]: undefined;
  [SignUpScreenName]: undefined;
  [OtpScreenName]: undefined;
};

const Stack = createNativeStackNavigator<NavigatorParamList>();

const StackNavigation = () => {
  const options: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
    <Stack.Navigator initialRouteName={SplashScreenName}>
      {/* slash screen */}
      <Stack.Screen options={options} name={SplashScreenName} component={SplashScreen} />

      {/* on boarding */}
      <Stack.Screen options={options} name={OnboardingScreenName} component={OnboardingScreen} />

      {/* auth */}
      <Stack.Screen options={options} name={SignInScreenName} component={SignInScreen} />
      <Stack.Screen options={options} name={SignUpScreenName} component={SignUpScreen} />
      <Stack.Screen options={options} name={OtpScreenName} component={OtpScreen} />
    </Stack.Navigator>
  );
};

const AppNavigation = () => (
  <NavigationContainer>
    <StackNavigation />
  </NavigationContainer>
);

export default AppNavigation;
