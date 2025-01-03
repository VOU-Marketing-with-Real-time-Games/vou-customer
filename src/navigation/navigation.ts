import { OnboardingScreenName } from "../screens/onboarding/onboarding";
import { OtpScreenName, SignInScreenName, SignUpScreenName } from "../screens/auth/auth";
import { SplashScreenName } from "../screens/splash/splash-screen";
import { HomeScreenName } from "../screens/home/home";
import { MainNavigationName } from "./main-navigation";
import { VoucherDetailScreenName, VoucherScreenName } from "../screens/voucher/voucher";
import { LocationScreenName } from "../screens/location/location";
import { ProfileScreenName } from "../screens/profile/profile";
import { FlappyBirdGameScreenName, QuizGameScreenName, ShakeGameScreenName } from "../screens/game/game";
import { VoucherGiftScreenName } from "../screens/gift/gift";

export type NavigatorParamList = {
  // splash screen
  [SplashScreenName]: undefined;

  // onboarding screen
  [OnboardingScreenName]: undefined;

  // auth screen
  [SignInScreenName]: undefined;
  [SignUpScreenName]: undefined;
  [OtpScreenName]: undefined;

  // main screen
  [MainNavigationName]: undefined;
  [HomeScreenName]: undefined;
  [VoucherScreenName]: undefined;
  [LocationScreenName]: undefined;
  [ProfileScreenName]: undefined;
  [VoucherDetailScreenName]: {
    header: string;
    // data: {
    // };
  };

  // Game
  [ShakeGameScreenName]: undefined;
  [FlappyBirdGameScreenName]: undefined;
  [QuizGameScreenName]: undefined;
  // Gift v1/quizz-game
  [VoucherGiftScreenName]: undefined;
};
