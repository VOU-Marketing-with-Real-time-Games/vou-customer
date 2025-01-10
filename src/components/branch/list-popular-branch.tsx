import { ScrollView, View } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import tw from "../../lib/tailwind";
import { IBranch } from "../../types/branch";
import branchApi from "../../api/branch.api";
import SingleBranch from "./single-branch";

const ListPopularBranch = () => {
  const [branches, setBranches] = React.useState<IBranch[] | null>(null);

  const getAllBranch = useQuery({
    queryKey: ["list-popular-branches"],
    queryFn: async () => {
      const response: IBranch[] = await branchApi.getAll();
      setBranches(response);
      return response;
    },
  });
  return (
    <View style={tw`px-2 mt-5`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between`}>
        <Text variant="titleLarge" style={tw`font-bold`}>
          Popular Branch
        </Text>
        <Button icon="arrow-right-thin" mode="text" contentStyle={tw`flex-row-reverse`}>
          See all
        </Button>
      </View>
      {getAllBranch.isLoading || getAllBranch.isFetching ? (
        <ListPopularBranch.Skeleton />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-3`}>
          <View style={tw`flex-row gap-5`}>
            {branches?.map((branch) => (
              <View key={branch.id}>
                <SingleBranch branch={branch} />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ListPopularBranch;

ListPopularBranch.Skeleton = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-3`}>
    <View style={tw`flex-row gap-4`}>
      {Array.from({ length: 4 }, (_, i) => (
        <View style={tw`bg-gray-200 rounded-lg px-4 h-46 w-68`} key={i} />
      ))}
    </View>
  </ScrollView>
);
