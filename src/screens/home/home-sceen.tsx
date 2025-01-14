import React from "react";
import { View } from "react-native";
import MainLayout from "../../layouts/main/main-layout";
import ListNewestCampain from "../../components/campain/newest/list-newest-campain";
import ListPopularBranch from "../../components/branch/list-popular-branch";
import UserInfoHome from "../../components/home/user-info-home";
import tw from "../../lib/tailwind";

const HomeScreen = () => (
  <MainLayout>
    <UserInfoHome />
    <ListNewestCampain />
    <ListPopularBranch />
    <View style={tw`h-10`} />
  </MainLayout>
);

export default HomeScreen;
