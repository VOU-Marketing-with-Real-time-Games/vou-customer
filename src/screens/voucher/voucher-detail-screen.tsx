import { Image, Text, View } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";
import MainLayout from "../../layouts/main/main-layout";
import ButtonChooseGame from "../../components/game/button-choose-game";

const VoucherDetailScreen = () => (
  <MainLayout>
    <View style={tw`gap-4`}>
      <Image
        source={{
          uri: "https://about.starbucks.com/uploads/2021/11/Starbucks-Virtual-Backgrounds-Holiday-Cups-2021-1024x683.jpg",
        }}
        width={250}
        height={150}
        style={tw`w-full`}
        alt="Campain Image"
      />
      <ButtonChooseGame />
    </View>
  </MainLayout>
);

export default VoucherDetailScreen;
