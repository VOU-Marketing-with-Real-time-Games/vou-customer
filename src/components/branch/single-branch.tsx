import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Icon, Surface, Text } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import tw from "../../lib/tailwind";
import { IBranch } from "../../types/branch";
import { VoucherDetailScreenName } from "../../screens/voucher/voucher";

type Props = {
  branch: IBranch;
};

const SingleBranch = ({ branch }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <TouchableOpacity onPress={() => {}}>
      <Surface style={tw`p-2 gap-6`}>
        <View style={tw`rounded-xl overflow-hidden`}>
          <Image
            source={{
              uri: "https://about.starbucks.com/uploads/2021/11/Starbucks-Virtual-Backgrounds-Holiday-Cups-2021-1024x683.jpg",
            }}
            height={150}
            alt="Branch Image"
          />
        </View>
        <View style={tw`gap-2`}>
          <Text variant="titleMedium" style={tw`font-bold`}>
            {branch.name}
          </Text>
          <View style={tw`flex-row items-center`}>
            <Icon source="map-marker" size={30} />
            <Text variant="bodyMedium" style={tw`text-center`}>
              {branch.address}
            </Text>
          </View>
        </View>
      </Surface>
    </TouchableOpacity>
  );
};

export default SingleBranch;
