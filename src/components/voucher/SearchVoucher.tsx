import React from "react";
import { Card, IconButton, Text } from "react-native-paper";
import { TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import tw from "../../lib/tailwind";
import { VoucherDetailScreenName } from "../../screens/voucher/voucher";

const SearchVoucher = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(VoucherDetailScreenName, { header: "Voucher Detail" })}>
      <Card style={tw`flex-row`}>
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} style={tw`h-38`} />
        <Card.Title
          title={
            <Text variant="titleLarge" style={tw`font-bold mt-2`}>
              Discount 50%
            </Text>
          }
          subtitle="28/02/2023 20:22:12"
          left={() => <IconButton icon="gift" mode="contained" />}
        />
        <Card.Content>
          <Text variant="bodyMedium" numberOfLines={3}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis aliquam, ratione illum ipsa nam, deleniti
            possimus quibusdam enim quam consequatur facilis dolorum labore harum eligendi facere saepe
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

export default SearchVoucher;
