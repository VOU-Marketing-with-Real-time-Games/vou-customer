import { Image, View } from "react-native";
import React from "react";
import { Text, Button } from "react-native-paper";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import tw from "../../lib/tailwind";
import { MainNavigationName } from "../../navigation/main-navigation";

const SocialMedia = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View>
      <Text variant="titleMedium" style={tw`text-center py-2`}>
        OR
      </Text>
      <View style={tw`gap-4 mt-1`}>
        <Button
          mode="elevated"
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: MainNavigationName }],
            });
          }}
        >
          <View style={tw`flex-row gap-2 items-center justify-between`}>
            <Image source={require("../../../assets/images/logos/google.png")} />
            <Text variant="titleMedium">Login with Google</Text>
          </View>
        </Button>
      </View>
    </View>
  );
};
export default SocialMedia;
