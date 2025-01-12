import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeIcon } from "react-native-heroicons/outline";
import { IconButton, MD3Colors } from "react-native-paper";
import { NavigatorParamList } from "./navigation";
import { HomeScreenName } from "../screens/home/home";
import HomeScreen from "../screens/home/home-sceen";
import { VoucherScreenName } from "../screens/voucher/voucher";
import VoucherScreen from "../screens/voucher/voucher-screen";
import { LocationScreenName } from "../screens/location/location";
import LocationScreen from "../screens/location/location-screen";
import { ProfileScreenName } from "../screens/profile/profile";
import ProfileScreen from "../screens/profile/profile-screen";

const Tab = createBottomTabNavigator<NavigatorParamList>();

const tabBarHeight = 62;
const iconSize = 32;

export const MainNavigationName = "mainNavigation";

const MainNavigation = () => (
  <Tab.Navigator
    initialRouteName={HomeScreenName}
    screenOptions={{
      tabBarActiveTintColor: "#820592",
      tabBarInactiveTintColor: "#b4b4b4",
      tabBarLabelStyle: {
        fontSize: 16,
        fontFamily: "Georgia",
        fontWeight: 500,
      },
      tabBarStyle: {
        height: tabBarHeight,
      },
      tabBarHideOnKeyboard: true,
    }}
  >
    {/* Home Screen */}
    <Tab.Screen
      name={HomeScreenName}
      component={HomeScreen}
      options={{
        headerShown: false,
        tabBarIcon({ focused }) {
          return focused ? (
            <IconButton icon="home" iconColor={MD3Colors.primary20} size={iconSize} />
          ) : (
            <IconButton icon="home" iconColor={MD3Colors.neutral50} size={iconSize} />
          );
        },
      }}
    />
    {/* Voucher Screen */}
    <Tab.Screen
      name={VoucherScreenName}
      component={VoucherScreen}
      options={{
        headerShown: false,
        tabBarIcon({ focused }) {
          return focused ? (
            <IconButton icon="barcode" iconColor={MD3Colors.primary20} size={iconSize} />
          ) : (
            <IconButton icon="barcode" iconColor={MD3Colors.neutral50} size={iconSize} />
          );
        },
      }}
    />
    {/* LocationScreen */}
    <Tab.Screen
      name={LocationScreenName}
      component={LocationScreen}
      options={{
        headerShown: false,
        tabBarIcon({ focused }) {
          return focused ? (
            <IconButton icon="map-marker" iconColor={MD3Colors.primary20} size={iconSize} />
          ) : (
            <IconButton icon="map-marker" iconColor={MD3Colors.neutral50} size={iconSize} />
          );
        },
      }}
    />
    {/* ProfileScreen */}
    <Tab.Screen
      name={ProfileScreenName}
      component={ProfileScreen}
      options={{
        headerShown: false,
        tabBarIcon({ focused }) {
          return focused ? (
            <IconButton icon="account-circle" iconColor={MD3Colors.primary20} size={iconSize} />
          ) : (
            <IconButton icon="account-circle" iconColor={MD3Colors.neutral50} size={iconSize} />
          );
        },
      }}
    />
  </Tab.Navigator>
);

export default MainNavigation;
