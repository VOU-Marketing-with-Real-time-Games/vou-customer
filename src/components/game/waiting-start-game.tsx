import { View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import LottieView from "lottie-react-native";
import tw from "../../lib/tailwind";

const WaitingStartGame = () => (
  <View style={tw`flex-1 items-center gap-2`}>
    <Text variant="headlineLarge" style={tw`text-center text-blue-500 font-bold mt-10`}>
      Please wait for the quiz to start
    </Text>
    <LottieView
      source={require("../../../assets/animations/waiting.json")}
      autoPlay
      loop
      style={tw`absolute top-10 left-0 right-0 bottom-0`}
    />
  </View>
);

export default WaitingStartGame;
