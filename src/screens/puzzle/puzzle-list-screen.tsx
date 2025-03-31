import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import puzzleApi from "../../api/puzzle.api";
import { IPuzzle } from "../../types/puzzle";
import tw from "../../lib/tailwind";
import SinglePuzzle from "../../components/puzzle/single-puzzle";

const PuzzleListScreen = () => {
  const [puzzles, setPuzzles] = React.useState<IPuzzle[] | null>(null);

  const getAllPuzzlesQuery = useQuery({
    queryKey: ["puzzles"],
    queryFn: async () => {
      const res = await puzzleApi.getPuzzles();
      setPuzzles(res);
      return res;
    },
  });

  return (
    <View style={tw`mt-1 flex-1`}>
      {getAllPuzzlesQuery.isLoading || getAllPuzzlesQuery.isFetching ? (
        <PuzzleListScreen.Skeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`mt-3`}>
          <View style={tw`gap-5`}>
            {puzzles?.map((puzzle) => (
              <View key={puzzle.id}>
                <SinglePuzzle puzzle={puzzle} />
              </View>
            ))}
            {puzzles?.length === 0 && (
              <Text variant="displaySmall" style={tw`text-center text-red-500`}>
                Không có Puzzle được tạo
              </Text>
            )}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default PuzzleListScreen;

PuzzleListScreen.Skeleton = () => (
  <ScrollView showsVerticalScrollIndicator={false} style={tw`mt-3`}>
    <View style={tw`gap-3`}>
      {Array.from({ length: 4 }, (_, i) => (
        <View style={tw`bg-gray-200 rounded-lg px-4 w-full h-40`} key={i} />
      ))}
    </View>
  </ScrollView>
);
