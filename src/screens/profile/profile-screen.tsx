import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, Text, Icon, MD3Colors, Divider } from "react-native-paper";
import MainLayout from "../../layouts/main/main-layout";
import tw from "../../lib/tailwind";

const ProfileScreen = () => (
  <MainLayout>
    {/* Avatar, name */}
    <View style={tw`items-center`}>
      <Avatar.Image size={120} source={require("../../../assets/images/game/quiz-background.jpg")} style={tw`my-4`} />
      <Text variant="displaySmall" style={tw`text-center font-bold`}>
        Profile Screen
      </Text>
    </View>
    {/* Information */}
    <View style={tw`px-3 my-5 gap-2`}>
      <View style={tw`flex-row items-center gap-5`}>
        <Icon source="phone" color={MD3Colors.neutral20} size={20} />
        <Text variant="bodyLarge" style={tw`flex-1`}>
          0356565656
        </Text>
      </View>
      <View style={tw`flex-row items-center gap-5`}>
        <Icon source="email" color={MD3Colors.neutral20} size={20} />
        <Text variant="bodyLarge" style={tw`flex-1`}>
          user@gmail.com
        </Text>
      </View>
    </View>
    <Divider />
    {/* collection */}
    <View style={tw`px-3 mt-8 mb-5 gap-6`}>
      <TouchableOpacity style={tw`flex-row items-center gap-5`}>
        <Icon source="barcode" color={MD3Colors.primary20} size={28} />
        <Text variant="titleLarge" style={tw`flex-1 text-gray-600 font-medium`}>
          My Vouchers
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`flex-row items-center gap-5`}>
        <Icon source="puzzle" color={MD3Colors.primary20} size={28} />
        <Text variant="titleLarge" style={tw`flex-1 text-gray-600 font-medium`}>
          Puzzle Collection
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`flex-row items-center gap-5`}>
        <Icon source="history" color={MD3Colors.primary20} size={28} />
        <Text variant="titleLarge" style={tw`flex-1 text-gray-600 font-medium`}>
          History
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`flex-row items-center gap-5`}>
        <Icon source="cards-heart-outline" color={MD3Colors.primary20} size={28} />
        <Text variant="titleLarge" style={tw`flex-1 text-gray-600 font-medium`}>
          Your Favorites
        </Text>
      </TouchableOpacity>
    </View>
  </MainLayout>
);

export default ProfileScreen;
