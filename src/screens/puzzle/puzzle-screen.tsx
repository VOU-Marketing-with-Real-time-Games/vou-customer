import { Dimensions, Image, ImageProps, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import { data } from "./puzzle-image";

type Props = {
  imageLink: ImageProps;
};

const SinglePuzzle = ({ imageLink }: Props) => (
  <Image source={imageLink} style={tw`w-30 h-30 border-2 border-gray-200`} />
);
const row = 3;

const PuzzleScreen = () => (
  <View style={tw`flex-1 justify-center items-center`}>
    <View style={tw`border-[10px] border-red-500 rounded-lg relative`}>
      <Image
        source={require("../../../assets/images/puzzle/luffy.png")}
        style={tw`w-90 h-90 border-2 border-gray-200`}
      />
      {Array.from(new Array(row)).map((_, index) => (
        <View key={index} style={tw`absolute top-${index * (90 / row)} left-0 flex-row`}>
          {Array.from(new Array(row)).map((__, index2) => (
            <TouchableOpacity key={index2} style={tw`border-2 border-gray-100 w-[${90 / row}] h-[${90 / row}]`} />
          ))}
        </View>
      ))}
    </View>
  </View>
);

export default PuzzleScreen;
