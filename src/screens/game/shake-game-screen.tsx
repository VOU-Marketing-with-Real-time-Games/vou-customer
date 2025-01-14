import { View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { Accelerometer, AccelerometerMeasurement } from "expo-sensors";
import { Subscription } from "expo-sensors/build/DeviceSensor";
import LottieView from "lottie-react-native";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "../../lib/tailwind";
import { IIncreasePlayTurnReq } from "../../types/user";
import { userApi } from "../../api/user.api";
import { AppState } from "../../store";
import puzzleApi from "../../api/puzzle.api";
import { PuzzleGiftScreenName } from "../gift/gift";

const SHAKE_THRESHOLD = 4;
const SHAKE_DURATION = 2000;

const ShakeGameScreen = () => {
  const [count, setCount] = React.useState(0);
  const [subscription, setSubscription] = React.useState<Subscription | null>(null);
  const [isShakingActive, setIsShakingActive] = React.useState(false);
  const user = useSelector((state: AppState) => state.user);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // Detect shake by evaluating the magnitude of acceleration
  const detectShake = (accelerometerData: AccelerometerMeasurement) => {
    const { x, y, z } = accelerometerData;
    const totalAcceleration = Math.sqrt(x * x + y * y + z * z);

    if (totalAcceleration > SHAKE_THRESHOLD) {
      setCount((prevCount) => prevCount + 1);
    }
  };

  const decreasePlayTurnMutation = useMutation({
    mutationFn: (body: IIncreasePlayTurnReq) => userApi.decreasePlayTurn(body),
  });

  // TODO: puzzleId
  const receiveRandomItem = useMutation({
    mutationFn: () => puzzleApi.addRandomItem(user.userId!, 1),
    onSuccess: (data) => {
      // redirect to puzzle reward screen white position
      // TODO: puzzleId
      navigation.navigate(PuzzleGiftScreenName, {
        puzzleId: 1,
        position: data.position,
      });
    },
  });

  const handleShakeGameEnd = () => {
    // nhan random puzzle
    setCount((prevCount) => {
      if (prevCount >= 1) {
        receiveRandomItem.mutate();
      }
      return prevCount;
    });
  };

  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (isShakingActive) {
      // Subscribe to the accelerometer
      const sub = Accelerometer.addListener((accelerometerData: AccelerometerMeasurement) => {
        detectShake(accelerometerData);
      });
      Accelerometer.setUpdateInterval(16); // Set update interval to ~60Hz (16ms)
      setSubscription(sub);

      // Stop shaking after 5 seconds
      const timer = setTimeout(() => {
        handleShakeGameEnd();
        subscription?.remove();
        setSubscription(null);
        setIsShakingActive(false); // Stop the shake activity
      }, SHAKE_DURATION);

      return () => {
        clearTimeout(timer);
        sub.remove();
        setSubscription(null);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShakingActive]);

  const startShaking = () => {
    console.log("startShaking");
    if (!isShakingActive) {
      decreasePlayTurnMutation.mutate({
        userID: user.userId!,
        quantity: 1,
        method: "describe",
      });
      setCount(0); // Reset score
      setIsShakingActive(true); // Activate shake detection
    }
  };

  return (
    <View style={tw`flex-1 justify-center items-center gap-10 bg-white`}>
      <Text variant="titleLarge" style={tw`text-center absolute top-20 text-green-700`}>
        Shake your phone to receive a gift.
      </Text>
      <LottieView
        source={require("../../../assets/animations/shake.json")}
        autoPlay
        loop={isShakingActive}
        style={tw`absolute top-0 left-0 right-0 bottom-10`}
      />

      <Text variant="displayLarge" style={tw`bottom-30 absolute text-green-500`}>
        Score: {count}
      </Text>

      {!isShakingActive && (
        <Text variant="titleMedium" style={tw`absolute bottom-10 text-green-700`} onPress={startShaking}>
          Tap to start shaking!
        </Text>
      )}
    </View>
  );
};
export default ShakeGameScreen;
