import { ScrollView, View } from "react-native";
import React from "react";
import { Searchbar } from "react-native-paper";
import { useQuery } from "@tanstack/react-query";
import tw from "../../lib/tailwind";
import { ICampaign } from "../../types/campaign";
import campaignApi from "../../api/campaign.api";
import SingleCampain from "../../components/campain/newest/single-campain";

const CampaignsScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [campaigns, setCampaigns] = React.useState<ICampaign[] | null>(null);

  const getCampaignsByName = useQuery({
    queryKey: ["list-search-campaign", searchQuery],
    queryFn: async () => {
      const response: ICampaign[] = await campaignApi.search(searchQuery);
      setCampaigns(response);
      return response;
    },
  });

  return (
    <View style={tw`mt-1 flex-1`}>
      <Searchbar placeholder="Search Vouchers" onChangeText={setSearchQuery} value={searchQuery} />
      {getCampaignsByName.isLoading || getCampaignsByName.isFetching ? (
        <CampaignsScreen.Skeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`mt-3`}>
          <View style={tw`gap-5`}>
            {campaigns?.map((campaign) => (
              <View key={campaign.id}>
                <SingleCampain campaign={campaign} isHorizontal />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CampaignsScreen;

CampaignsScreen.Skeleton = () => (
  <ScrollView showsVerticalScrollIndicator={false} style={tw`mt-3`}>
    <View style={tw`gap-3`}>
      {Array.from({ length: 4 }, (_, i) => (
        <View style={tw`bg-gray-200 rounded-lg px-4 w-full h-40`} key={i} />
      ))}
    </View>
  </ScrollView>
);
