import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import tw from "../../lib/tailwind";
import { IFullItem, IPuzzle } from "../../types/puzzle";
import { AppState } from "../../store";
import puzzleApi from "../../api/puzzle.api";

type RouteParams = {
  params: {
    puzzle: IPuzzle;
  };
};

const PuzzleScreen = ({ route }: { route: RouteParams }) => {
  const { puzzle } = route.params;
  const user = useSelector((state: AppState) => state.user);
  const [puzzles, setPuzzles] = React.useState<IFullItem[] | null>(null);
  const row = Math.round(Math.sqrt(puzzle.itemNum));

  const getAllPuzzleItemsQuery = useQuery({
    queryKey: ["puzzle-items"],
    queryFn: async () => {
      const res = await puzzleApi.getUserItemsByPuzzleId(user.userId!, puzzle.id);
      setPuzzles(res);
      return res;
    },
  });

  function checkHave(position: number) {
    if (!puzzles) return false;
    return puzzles.some((_puzzle) => _puzzle.item.position === position);
  }

  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <View style={tw`border-[10px] border-red-500 rounded-lg relative`}>
        <Image
          source={{
            uri: puzzle.image,
          }}
          style={tw`w-90 h-90 border-2 border-gray-200`}
        />
        {Array.from(new Array(row)).map((_, index) => (
          <View key={index} style={tw`absolute top-${index * (90 / row)} left-0 flex-row`}>
            {Array.from(new Array(row)).map((__, index2) => (
              <TouchableOpacity
                key={index2}
                style={[
                  tw`border-2 border-gray-100 w-[${90 / row}] h-[${90 / row}]`,
                  !checkHave(index * row + index2 + 1) ? tw`` : "",
                ]}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
};

export default PuzzleScreen;
