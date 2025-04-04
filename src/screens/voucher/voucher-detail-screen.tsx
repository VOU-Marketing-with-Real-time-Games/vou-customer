import { Image, View } from "react-native";
import React from "react";
import { Text, Icon, MD3Colors } from "react-native-paper";
import tw from "../../lib/tailwind";
import MainLayout from "../../layouts/main/main-layout";
import ButtonChooseGame from "../../components/game/button-choose-game";

import { ICampaign } from "../../types/campaign";
import { formatDateToRFC } from "../../utils/date-format";
import GroupButtonSharing from "../../components/voucher/group-button-sharing";

type RouteParams = {
  params: {
    data: {
      campaign: ICampaign;
    };
  };
};

const VoucherDetailScreen = ({ route }: { route: RouteParams }) => {
  const { data } = route.params;
  const { campaign } = data;

  return (
    <MainLayout>
      <View style={tw`gap-4 mb-5`}>
        <Image
          source={{
            uri:
              campaign?.image ||
              "https://about.starbucks.com/uploads/2021/11/Starbucks-Virtual-Backgrounds-Holiday-Cups-2021-1024x683.jpg",
          }}
          width={250}
          height={150}
          style={tw`w-full rounded-b-xl`}
          alt="Campain Image"
        />
        <View style={tw`px-2 gap-2`}>
          <Text style={tw`text-center font-bold`} variant="headlineLarge">
            {campaign.name}
          </Text>
          <GroupButtonSharing campaign={campaign} />
          {/* Group turn, date */}
          <View style={tw`flex-row items-center gap-3 p-2 rounded-xl bg-green-100`}>
            <View style={tw`bg-blue-200 py-2 w-12 flex-row items-center justify-center rounded-lg`}>
              <Icon source="calendar-month" color={MD3Colors.primary20} size={30} />
            </View>
            <View style={tw`gap-1`}>
              <Text style={tw`text-red-500 font-bold`} variant="bodyLarge">
                {formatDateToRFC(campaign.startDate)}
              </Text>
              <Text variant="bodyMedium">Exp date: {formatDateToRFC(campaign.endDate)}</Text>
            </View>
          </View>
          <View style={tw`mb-3`}>
            <Text style={tw`font-bold mb-1`} variant="headlineSmall">
              Description
            </Text>
            <View style={tw`gap-5 mt-2`}>
              <Text variant="bodyMedium">
                Tất cả các khuyến mãi được lưu trữ trong phần khuyến mãi của ứng dụng. Bạn nên kiểm tra thường xuyên để
                cập nhật và sử dụng phiếu khuyến mãi mới nhất.
              </Text>
              <Text variant="bodyMedium">
                Để sử dụng khuyến mãi, bạn cần đến cửa hàng. Lựa chọn khuyến mãi bạn muốn sử dụng, đưa cho nhân viên
                trước khi gọi món để được áp dụng.
              </Text>
            </View>
          </View>
          <ButtonChooseGame campaignId={campaign.id} />
        </View>
      </View>
    </MainLayout>
  );
};

export default VoucherDetailScreen;
