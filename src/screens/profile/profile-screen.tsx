import { TouchableOpacity, View } from "react-native";
import React from "react";
import { Avatar, Text, Icon, MD3Colors, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import MainLayout from "../../layouts/main/main-layout";
import tw from "../../lib/tailwind";
import { AppDispatch, AppState } from "../../store";
import { clearUser } from "../../store/user";
import { SignInScreenName } from "../auth/auth";
import { IFullUser } from "../../types/user";
import { userApi } from "../../api/user.api";
import { NotifyScreenName } from "../notify/notify";

const ProfileScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [profile, setProfile] = React.useState<IFullUser | null>(null);
  const user = useSelector((state: AppState) => state.user);

  const getMeQuery = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await userApi.getProfile(user?.username || "");
      setProfile(res);
      return res;
    },
    gcTime: 0,
    enabled: user.username !== "" && user.username !== null,
  });

  const handleLogout = async () => {
    dispatch(clearUser());
    navigation.reset({
      index: 0,
      routes: [{ name: SignInScreenName }],
    });
  };

  return (
    <MainLayout>
      {/* Avatar, name */}
      <View style={tw`items-center`}>
        <Avatar.Image
          size={120}
          source={{
            uri: profile?.avatar || "https://i.pravatar.cc/300",
          }}
          style={tw`my-4`}
        />
        <Text variant="displaySmall" style={tw`text-center font-bold`}>
          {profile?.username}
        </Text>
      </View>
      {/* Information */}
      <View style={tw`px-3 my-5 gap-2`}>
        <View style={tw`flex-row items-center gap-5`}>
          <Icon source="phone" color={MD3Colors.neutral20} size={20} />
          <Text variant="bodyLarge" style={tw`flex-1`}>
            {profile?.phoneNumber}
          </Text>
        </View>
        <View style={tw`flex-row items-center gap-5`}>
          <Icon source="email" color={MD3Colors.neutral20} size={20} />
          <Text variant="bodyLarge" style={tw`flex-1`}>
            {profile?.email}
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
        <TouchableOpacity style={tw`flex-row items-center gap-5`} onPress={() => navigation.navigate(NotifyScreenName)}>
          <Icon source="bell-outline" color={MD3Colors.primary20} size={28} />
          <Text variant="titleLarge" style={tw`flex-1 text-gray-600 font-medium`}>
            Notification
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row items-center gap-5`}>
          <Icon source="cards-heart-outline" color={MD3Colors.primary20} size={28} />
          <Text variant="titleLarge" style={tw`flex-1 text-gray-600 font-medium`}>
            Your Favorites
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row items-center gap-5`} onPress={handleLogout}>
          <Icon source="logout" color={MD3Colors.primary20} size={28} />
          <Text variant="titleLarge" style={tw`flex-1 text-gray-600 font-medium`}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
};

export default ProfileScreen;
