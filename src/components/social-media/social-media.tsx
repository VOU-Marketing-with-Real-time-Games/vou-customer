import { Image, View } from "react-native";
import React from "react";
import { Text, Button } from "react-native-paper";
import tw from "../../lib/tailwind";

const SocialMedia = () => (
  <View>
    <Text variant="titleMedium" style={tw`text-center py-2`}>
      OR
    </Text>
    <View style={tw`gap-4 mt-1`}>
      <Button mode="elevated" onPress={() => {}}>
        <View style={tw`flex-row gap-2 items-center justify-between`}>
          <Image source={require("../../../assets/images/logos/google.png")} />
          <Text variant="titleMedium">Login with Google</Text>
        </View>
      </Button>
      <Button mode="elevated" onPress={() => {}}>
        <View style={tw`flex-row gap-2 items-center justify-between`}>
          <Image source={require("../../../assets/images/logos/facebook.png")} />
          <Text variant="titleMedium">Login with Facebook</Text>
        </View>
      </Button>
    </View>
  </View>
);

export default SocialMedia;
