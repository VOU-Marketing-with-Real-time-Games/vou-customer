import { Dimensions, Image, View } from "react-native";
import React from "react";
import { Text, Icon, MD3Colors, Button } from "react-native-paper";
import tw from "../../lib/tailwind";

const { width } = Dimensions.get("window");

type Props = {
  name: string;
};

const LocationNear = ({ name }: Props) => (
  <View style={tw`rounded-lg bg-white pb-0.5`}>
    <Image
      source={{
        uri: "https://about.starbucks.com/uploads/2021/11/Starbucks-Virtual-Backgrounds-Holiday-Cups-2021-1024x683.jpg",
      }}
      style={tw`w-96 h-36 rounded-t-lg`}
    />
    <View style={tw`px-5 py-2`}>
      <View style={tw`gap-2`}>
        <Text style={tw`font-bold`} variant="titleMedium">
          {name}
        </Text>
        <View style={tw`gap-1`}>
          <Text>Open: 7:30 AM and Close: 9:00 PM</Text>
          <View style={tw`flex-row items-center gap-1`}>
            <Icon source="map-marker" color={MD3Colors.error50} size={20} />
            <Text>7.6 kilometers away</Text>
          </View>
        </View>
      </View>
    </View>
    <Button mode="outlined">Direction</Button>
  </View>
);

export default LocationNear;
