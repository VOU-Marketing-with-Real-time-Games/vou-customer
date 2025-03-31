import { View } from "react-native";
import { Text, Avatar, IconButton } from "react-native-paper";
import React from "react";
import { useSelector } from "react-redux";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AppState } from "../../store";
import tw from "../../lib/tailwind";
import { NotifyScreenName } from "../../screens/notify/notify";

const UserInfoHome = () => {
  const user = useSelector((state: AppState) => state.user);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <LinearGradient
      colors={["#914c9f", "#9d40c2", "#a10e8e"]}
      style={tw`absolute top-0 right-0 left-0 pr-2 pl-4 py-8 rounded-b-[50px] mb-2 flex-row items-center justify-between flex-1`}
    >
      <LottieView
        source={require("../../../assets/animations/welcome.json")}
        autoPlay
        loop
        style={tw`absolute -top-1 right-10 w-50 h-50`}
      />
      <View style={tw`flex-row items-center gap-2`}>
        <Avatar.Image
          size={42}
          source={{
            uri: user.image || "https://avatar.iran.liara.run/public",
          }}
        />
        <Text variant="bodyLarge" style={tw`text-white`}>
          Hi {user.username}
        </Text>
      </View>
      <IconButton icon="bell" iconColor="white" size={32} onPress={() => navigation.navigate(NotifyScreenName)} />
    </LinearGradient>
  );
};

export default UserInfoHome;
