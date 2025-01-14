import { OnboardingScreenName } from "../screens/onboarding/onboarding";
import { OtpScreenName, SignInScreenName, SignUpScreenName } from "../screens/auth/auth";
import { SplashScreenName } from "../screens/splash/splash-screen";
import { HomeScreenName } from "../screens/home/home";
import { MainNavigationName } from "./main-navigation";
import { VoucherDetailScreenName, VoucherScreenName } from "../screens/voucher/voucher";
import { LocationScreenName } from "../screens/location/location";
import { ProfileScreenName } from "../screens/profile/profile";
import { FlappyBirdGameScreenName, QuizGameScreenName, ShakeGameScreenName } from "../screens/game/game";
import { PuzzleGiftScreenName, VoucherGiftScreenName } from "../screens/gift/gift";
import { campaignsScreenName, FavoriteCampaignsScreenName } from "../screens/campaign/campain";
import { ICampaign } from "../types/campaign";
import { NotifyScreenName } from "../screens/notify/notify";
import { PuzzleScreenName } from "../screens/puzzle/puzzle";

export type NavigatorParamList = {
  // splash screen
  [SplashScreenName]: undefined;

  // onboarding screen
  [OnboardingScreenName]: undefined;

  // auth screen
  [SignInScreenName]: undefined;
  [SignUpScreenName]: undefined;
  [OtpScreenName]: {
    data: {
      email: string;
    };
  };

  // main screen
  [MainNavigationName]: undefined;
  [HomeScreenName]: undefined;
  [VoucherScreenName]: undefined;
  [LocationScreenName]: undefined;
  [ProfileScreenName]: undefined;
  [VoucherDetailScreenName]: {
    header: string;
    data: {
      campaign: ICampaign;
    };
  };

  // Game
  [ShakeGameScreenName]: undefined;
  [FlappyBirdGameScreenName]: undefined;
  [QuizGameScreenName]: undefined;
  // Gift v1/quizz-game
  [VoucherGiftScreenName]: undefined;
  [PuzzleGiftScreenName]: {
    puzzleId: number;
    position: number;
  };
  // Campaign
  [campaignsScreenName]: undefined;
  // notify
  [NotifyScreenName]: undefined;
  // favorite
  [FavoriteCampaignsScreenName]: undefined;
  // puzzle
  [PuzzleScreenName]: undefined;
};
