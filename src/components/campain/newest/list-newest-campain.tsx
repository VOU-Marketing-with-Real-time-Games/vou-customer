import { ScrollView, View } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import tw from "../../../lib/tailwind";
import SingleCampain from "./single-campain";
import campaignApi from "../../../api/campaign.api";
import { IPagination } from "../../../types/response";
import { ICampaign } from "../../../types/campaign";
import { campaignsScreenName } from "../../../screens/campaign/campain";

const ListNewestCampain = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [campaigns, setCampaigns] = React.useState<ICampaign[] | null>(null);

  const getAllCampaigns = useQuery({
    queryKey: ["list-newest-campaign"],
    queryFn: async () => {
      const response: ICampaign[] = await campaignApi.getNewest();
      setCampaigns(response);
      return response;
    },
  });

  return (
    <View style={tw`px-2 mt-34`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between`}>
        <Text variant="titleLarge" style={tw`font-bold`}>
          Newest Campaigns
        </Text>
        <Button
          icon="arrow-right-thin"
          mode="text"
          contentStyle={tw`flex-row-reverse`}
          onPress={() => navigation.navigate(campaignsScreenName)}
        >
          See all
        </Button>
      </View>
      {getAllCampaigns.isLoading || getAllCampaigns.isFetching ? (
        <ListNewestCampain.Skeleton />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-3`}>
          <View style={tw`flex-row gap-5`}>
            {campaigns?.map((campaign, idx) => {
              if (idx > 10) return <></>;
              return (
                <View key={campaign.id}>
                  <SingleCampain campaign={campaign} />
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default ListNewestCampain;

ListNewestCampain.Skeleton = () => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-3`}>
    <View style={tw`flex-row gap-4`}>
      {Array.from({ length: 4 }, (_, i) => (
        <View style={tw`bg-gray-200 rounded-lg px-4 h-52 w-68`} key={i} />
      ))}
    </View>
  </ScrollView>
);
