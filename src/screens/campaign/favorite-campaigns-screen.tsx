import { Text, View, ScrollView } from "react-native";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import tw from "../../lib/tailwind";
import { ICampaign } from "../../types/campaign";
import campaignApi from "../../api/campaign.api";
import { AppState } from "../../store";
import SingleCampain from "../../components/campain/newest/single-campain";

const FavoriteCampaignsScreen = () => {
  const user = useSelector((state: AppState) => state.user);

  const [favorites, setFavorites] = React.useState<ICampaign[] | null>(null);
  const getCampaignsByName = useQuery({
    queryKey: ["list-favorite-campaign"],
    queryFn: async () => {
      const response: ICampaign[] = await campaignApi.getAllFavorite(user.id!);
      setFavorites(response);
      return response;
    },
  });

  return (
    <View style={tw`mt-1 flex-1`}>
      {getCampaignsByName.isLoading || getCampaignsByName.isFetching ? (
        <FavoriteCampaignsScreen.Skeleton />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`mt-3`}>
          <View style={tw`gap-5`}>
            {favorites?.map((favorite) => (
              <View key={favorite.id}>
                <SingleCampain campaign={favorite} isHorizontal />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default FavoriteCampaignsScreen;

FavoriteCampaignsScreen.Skeleton = () => (
  <ScrollView showsVerticalScrollIndicator={false} style={tw`mt-3`}>
    <View style={tw`gap-3`}>
      {Array.from({ length: 4 }, (_, i) => (
        <View style={tw`bg-gray-200 rounded-lg px-4 w-full h-40`} key={i} />
      ))}
    </View>
  </ScrollView>
);
