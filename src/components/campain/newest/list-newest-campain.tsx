import { ScrollView, View } from "react-native";
import React from "react";
import { Button, Text } from "react-native-paper";
import tw from "../../../lib/tailwind";
import SingleCampain from "./single-campain";

const ListNewestCampain = () => {
  React.useEffect(() => {
    // Fetch data
  }, []);

  return (
    <View style={tw`px-2`}>
      {/* Header */}
      <View style={tw`flex-row items-center justify-between`}>
        <Text variant="titleLarge" style={tw`font-bold`}>
          Newest Campaigns
        </Text>
        <Button icon="arrow-right-thin" mode="text" contentStyle={tw`flex-row-reverse`}>
          See all
        </Button>
      </View>
      {/* List */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={tw`mt-3`}>
        <View style={tw`flex-row gap-5`}>
          {Array.from({ length: 5 }).map((_, index) => (
            <View key={`a-${index + 1}`}>
              <SingleCampain />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};
export default ListNewestCampain;
