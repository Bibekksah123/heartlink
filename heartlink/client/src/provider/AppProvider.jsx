import React from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function AppProvider({ children }) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>{children}</Provider>
      </QueryClientProvider>
    </>
  );
}

export default AppProvider;
