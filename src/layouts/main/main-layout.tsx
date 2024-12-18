import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from "react-native";
import React from "react";
import tw from "../../lib/tailwind";

interface Props {
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  flexGrow: {
    flexGrow: 1,
  },
});

const MainLayout = ({ children }: Props) => (
  <View style={tw`flex-1`}>
    <ScrollView
      style={{ ...tw`bg-white relative` }}
      contentContainerStyle={styles.flexGrow}
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={tw`flex-col flex-1 gap-0 bg-white`}>
        <StatusBar />
        <View style={tw`flex-1`}>{children}</View>
      </SafeAreaView>
    </ScrollView>
  </View>
);

export default MainLayout;
