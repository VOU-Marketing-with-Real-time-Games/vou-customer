import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Surface, Text, Icon, MD3Colors } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import tw from "../../../lib/tailwind";
import { VoucherDetailScreenName } from "../../../screens/voucher/voucher";
import { ICampaign } from "../../../types/campaign";
import { formatDate } from "../../../utils/date-format";
import campaignApi from "../../../api/campaign.api";
import { AppState } from "../../../store";

type Props = {
  campaign: ICampaign;
  isHorizontal?: boolean;
};

const styles = StyleSheet.create({
  image: {
    objectFit: "cover",
  },
});

const SingleCampain = ({ campaign, isHorizontal = false }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const user = useSelector((state: AppState) => state.user);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const checkIsFavoriteQuery = useQuery({
    queryKey: ["check-is-favorite", campaign.id],
    queryFn: async () => {
      const res: boolean = await campaignApi.checkIsFavorite(user.userId!, campaign.id);
      setIsFavorite(res);
      return res;
    },
    enabled: !!user.userId && !!campaign.id && !isHorizontal,
  });

  const addToFavoriteQuery = useMutation({
    mutationFn: () => campaignApi.addToFavorite(user.userId!, campaign.id),
    onSuccess: () => {
      checkIsFavoriteQuery.refetch();
    },
  });

  const handleAddToFavorite = () => {
    if (!isFavorite) {
      // add to favorite
      addToFavoriteQuery.mutate();
    }
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(VoucherDetailScreenName, { header: "Voucher Detail", data: { campaign } })}
    >
      <Surface style={[tw`p-2`, isHorizontal ? tw`gap-3 flex-row flex-1` : tw`gap-6`]}>
        <View style={tw`rounded-xl overflow-hidden`}>
          <Image
            source={{
              uri: campaign.image,
            }}
            style={styles.image}
            width={isHorizontal ? 140 : 250}
            height={150}
            alt="Campain Image"
          />
        </View>
        <View style={tw`gap-2 flex justify-center`}>
          <Text variant="titleMedium" style={tw`font-bold`}>
            {campaign.name}
          </Text>
          <View>
            <Text variant="bodySmall">Start date: {formatDate(campaign.startDate)}</Text>
            <Text variant="bodySmall">End date: {formatDate(campaign.endDate)}</Text>
          </View>
        </View>
        {/* add to favorite */}
        {!isHorizontal && (
          <TouchableOpacity
            style={tw`flex-row items-center absolute top-2 right-2 p-2 bg-red-100 rounded-xl`}
            onPress={handleAddToFavorite}
          >
            {isFavorite ? (
              <Icon source="cards-heart" color={MD3Colors.error50} size={42} />
            ) : (
              <Icon source="cards-heart-outline" color={MD3Colors.error50} size={42} />
            )}
          </TouchableOpacity>
        )}
      </Surface>
    </TouchableOpacity>
  );
};

export default SingleCampain;
