import { View, Image } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import tw from "../../lib/tailwind";
import { MainNavigationName } from "../../navigation/main-navigation";
import puzzleApi from "../../api/puzzle.api";
import { IPuzzle } from "../../types/puzzle";

type RouteParams = {
  params: {
    puzzleId: number;
    position: number;
  };
};

const PuzzleGiftScreen = ({ route }: { route: RouteParams }) => {
  const { puzzleId, position } = route.params;
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [puzzle, setPuzzle] = React.useState<IPuzzle | null>(null);
  const [row, setRow] = React.useState(1);

  const getItemNumQuery = useQuery({
    queryKey: ["getItemNum", puzzleId],
    queryFn: async () => {
      const res: IPuzzle = await puzzleApi.getPuzzle(puzzleId!);
      setPuzzle(res);
      setRow(Math.round(Math.sqrt(res.itemNum)));
      return res;
    },
  });

  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate(MainNavigationName);
    }, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <View style={tw`flex-1 items-center justify-center gap-2`}>
        <View style={tw`border-[10px] border-red-500 rounded-lg relative`}>
          <Image
            source={{
              uri: puzzle?.image,
            }}
            style={tw`w-90 h-90 border-2 border-gray-200`}
          />
          {Array.from(new Array(row)).map((_, index) => (
            <View key={index} style={tw`absolute top-${index * (90 / row)} left-0 flex-row`}>
              {Array.from(new Array(row)).map((__, index2) => (
                <View
                  key={index2}
                  style={[
                    tw`border-2 border-gray-100 w-[${90 / row}] h-[${90 / row}]`,
                    index * row + index2 + 1 !== position ? tw`bg-white` : "",
                  ]}
                />
              ))}
            </View>
          ))}
        </View>
        <Text variant="headlineMedium" style={tw`text-center text-gray-700`}>
          Congratulations! You have received a puzzle!
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

export default PuzzleGiftScreen;
