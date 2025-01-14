import React from "react";
import { View, Image } from "react-native";
import { Button, Text } from "react-native-paper";

import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { styles } from "./style";

import GAME_OVER from "../../../../../assets/images/game/flappy-bird/game-over.png";
import tw from "../../../../lib/tailwind";
import { PuzzleGiftScreenName, VoucherGiftScreenName } from "../../../gift/gift";
import puzzleApi from "../../../../api/puzzle.api";
import { AppState } from "../../../../store";

type Props = {
  score: number;
};

const GameOver = ({ score }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const user = useSelector((state: AppState) => state.user);

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

  return (
    <>
      <View style={styles.container}>
        <Image source={GAME_OVER} style={styles.logo} />
      </View>
      <View style={tw`absolute top-12 left-0 p-2 rounded-full w-full justify-center items-center`}>
        <Text variant="displayLarge" style={tw`text-white font-bold`}>
          {score}
        </Text>
        {score > 2 && (
          <Button
            mode="contained"
            style={tw`py-0.5`}
            labelStyle={tw`text-xl`}
            onPress={() => {
              receiveRandomItem.mutate();
            }}
          >
            Receive Puzzle
          </Button>
        )}
      </View>
    </>
  );
};

export { GameOver };
