import { TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { Text, Surface } from "react-native-paper";
import React from "react";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IPuzzle } from "../../types/puzzle";
import tw from "../../lib/tailwind";
import { PuzzleScreenName } from "../../screens/puzzle/puzzle";

type Props = {
  puzzle: IPuzzle;
};

const styles = StyleSheet.create({
  image: {
    objectFit: "cover",
  },
});

const SinglePuzzle = ({ puzzle }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(PuzzleScreenName, { puzzle })}>
      <Surface style={[tw`p-2`, tw`gap-3 flex-row flex-1`]}>
        <View style={tw`rounded-xl overflow-hidden`}>
          <Image
            source={{
              uri: puzzle.image,
            }}
            style={styles.image}
            width={140}
            height={150}
            alt="Puzzle Image"
          />
        </View>
        <View style={tw`gap-1 flex justify-center flex-1`}>
          <Text variant="titleMedium" style={tw`font-bold`}>
            {puzzle.name}
          </Text>
          <Text variant="titleSmall">{puzzle.description}</Text>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

export default SinglePuzzle;
