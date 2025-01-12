import React from "react";
import { registerRootComponent } from "expo";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import AppNavigation from "./navigation/app-navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <AppNavigation />
        <Toast />
      </PaperProvider>
    </QueryClientProvider>
  );
}

registerRootComponent(App);
