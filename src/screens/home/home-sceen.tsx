import React from "react";
import MainLayout from "../../layouts/main/main-layout";
import ListNewestCampain from "../../components/campain/newest/list-newest-campain";
import ListPopularBranch from "../../components/branch/list-popular-branch";

const HomeScreen = () => (
  <MainLayout>
    <ListNewestCampain />
    <ListPopularBranch />
  </MainLayout>
);

export default HomeScreen;
