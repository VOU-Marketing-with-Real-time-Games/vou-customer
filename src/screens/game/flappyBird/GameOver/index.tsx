import React from "react";
import { View, Image } from "react-native";
import { Button, Text } from "react-native-paper";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./style";

import GAME_OVER from "../../../../../assets/images/game/flappy-bird/game-over.png";
import tw from "../../../../lib/tailwind";
import { VoucherGiftScreenName } from "../../../gift/gift";

type Props = {
  score: number;
};

const GameOver = ({ score }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <>
      <View style={styles.container}>
        <Image source={GAME_OVER} style={styles.logo} />
      </View>
      <View style={tw`absolute top-12 left-0 p-2 rounded-full w-full justify-center items-center`}>
        <Text variant="displayLarge" style={tw`text-white font-bold`}>
          {score}
        </Text>
        <Button
          mode="contained"
          style={tw`py-0.5`}
          labelStyle={tw`text-xl`}
          onPress={() => {
            navigation.navigate(VoucherGiftScreenName);
          }}
        >
          Voucher
        </Button>
      </View>
    </>
  );
};

export { GameOver };
