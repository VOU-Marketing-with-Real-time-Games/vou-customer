import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Surface, Text } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import tw from "../../../lib/tailwind";
import { VoucherDetailScreenName } from "../../../screens/voucher/voucher";
import { ICampaign } from "../../../types/campaign";
import { formatDate } from "../../../utils/date-format";

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
          {/* <View style={tw`flex-row items-center`}>
            <Icon source="map-marker" size={30} />
            <Text variant="bodyMedium" style={tw`text-center`}>
              Nha Trang, Khanh Hoa
            </Text>
          </View> */}
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

export default SingleCampain;
