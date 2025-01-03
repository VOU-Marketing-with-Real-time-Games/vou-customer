import { ScrollView, View } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import React from "react";
import MainLayout from "../../layouts/main/main-layout";
import tw from "../../lib/tailwind";
import SearchVoucher from "../../components/voucher/SearchVoucher";

const VoucherScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <View style={tw`p-2 gap-2`}>
      <Text variant="displaySmall" style={tw`font-bold`}>
        My Vouchers
      </Text>
      <Searchbar placeholder="Search Vouchers" onChangeText={setSearchQuery} value={searchQuery} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`gap-3 mb-10`}>
          {Array.from({ length: 10 }, (_, i) => (
            <SearchVoucher key={i} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default VoucherScreen;
