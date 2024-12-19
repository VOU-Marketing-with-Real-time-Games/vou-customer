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
import { NavigatorParamList } from "./navigation";
import MainNavigation, { MainNavigationName } from "./main-navigation";
import { VoucherDetailScreenName } from "../screens/voucher/voucher";
import VoucherDetailScreen from "../screens/voucher/voucher-detail-screen";
import Header from "../components/common/header";
import { ShakeGameScreenName } from "../screens/game/game";
import ShakeGameScreen from "../screens/game/shake-game-screen";

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

      {/* Home */}
      <Stack.Screen options={options} name={MainNavigationName} component={MainNavigation} />
      <Stack.Screen
        options={({ route }) => ({
          header: () => <Header title={route.params.header} canGoBack />,
        })}
        name={VoucherDetailScreenName}
        component={VoucherDetailScreen}
      />
      {/* Game */}
      <Stack.Screen
        options={({ route }) => ({
          header: () => <Header title="Shake Game" canGoBack />,
        })}
        name={ShakeGameScreenName}
        component={ShakeGameScreen}
      />
    </Stack.Navigator>
  );
};

const AppNavigation = () => (
  <NavigationContainer>
    <StackNavigation />
  </NavigationContainer>
);

export default AppNavigation;
