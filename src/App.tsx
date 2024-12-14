import React from "react";
import { registerRootComponent } from "expo";
import { PaperProvider } from "react-native-paper";
import AppNavigation from "./navigation/app-navigation";

export default function App() {
  return (
    <PaperProvider>
      <AppNavigation />
    </PaperProvider>
  );
}

registerRootComponent(App);
