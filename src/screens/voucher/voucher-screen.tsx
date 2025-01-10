import { FlatList, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import { Text, Searchbar } from "react-native-paper";
import React from "react";
import tw from "../../lib/tailwind";
import SearchVoucher from "../../components/voucher/SearchVoucher";
import { theme } from "../../theme";

const VoucherScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <View style={tw`p-2 gap-2 flex-1`}>
      <Text variant="displaySmall" style={tw`font-bold`}>
        My Vouchers
      </Text>
      <Searchbar placeholder="Search Vouchers" onChangeText={setSearchQuery} value={searchQuery} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`gap-3 mb-3`}>
          {Array.from({ length: 10 }, (_, i) => (
            <SearchVoucher key={i} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default VoucherScreen;

VoucherScreen.Skeleton = () => (
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={tw`p-2 gap-2`}
    nestedScrollEnabled
    data={[1, 2, 3, 4]}
    renderItem={({ item }) => (
      <TouchableWithoutFeedback key={item}>
        <View style={tw`bg-[${theme.skeleton}] rounded-3xl py-4 mx-2`} />
      </TouchableWithoutFeedback>
    )}
  />
);
