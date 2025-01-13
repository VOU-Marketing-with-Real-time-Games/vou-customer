import React from "react";
import { registerRootComponent } from "expo";
import { PaperProvider } from "react-native-paper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNavigation from "./navigation/app-navigation";
import { persistor, store } from "./store";

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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <PaperProvider>
            <AppNavigation />
            <Toast />
          </PaperProvider>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

registerRootComponent(App);
