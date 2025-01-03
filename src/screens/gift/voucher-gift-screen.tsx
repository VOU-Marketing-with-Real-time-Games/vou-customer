import { View, Image } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "react-native-paper";
import tw from "../../lib/tailwind";
import { MainNavigationName } from "../../navigation/main-navigation";

const VoucherGiftScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate(MainNavigationName);
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={tw`flex-1 items-center justify-center gap-2`}>
        <Image source={require("../../../assets/images/game/voucher.png")} />
        <Text variant="headlineMedium" style={tw`text-center text-gray-700`}>
          Congratulations! You have received a voucher!
        </Text>
      </View>
      <LottieView
        source={require("../../../assets/animations/firework.json")}
        autoPlay
        loop
        style={tw`absolute top-0 left-0 right-0 bottom-0`}
      />
    </>
  );
};

export default VoucherGiftScreen;
