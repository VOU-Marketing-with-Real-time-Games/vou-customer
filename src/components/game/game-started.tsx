import { View, Image } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import LottieView from "lottie-react-native";
import tw from "../../lib/tailwind";

const GameStarted = () => (
  <View style={tw`flex-1 items-center gap-2`}>
    <Image source={require("../../../assets/images/game/started-before.jpg")} style={tw`w-full h-50 mt-5`} />
    <Text variant="headlineLarge" style={tw`text-center text-red-500 font-bold`}>
      Quiz has started or ended
    </Text>
    <LottieView
      source={require("../../../assets/animations/opened.json")}
      autoPlay
      loop
      style={tw`absolute top-10 left-0 right-0 bottom-0`}
    />
  </View>
);

export default GameStarted;
