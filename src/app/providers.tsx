"use client";

import { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CacheProvider } from "@chakra-ui/next-js";
import themes from "@/utils/themes";

let browserQueryClient: QueryClient | undefined = undefined;

const makeQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
};

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
};

export const Providers = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider theme={themes}>
          {children}
          {/* <ProtectedLayout>{children}</ProtectedLayout> */}
          <ToastContainer position="top-center" theme="colored" limit={3} />
        </ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
};
