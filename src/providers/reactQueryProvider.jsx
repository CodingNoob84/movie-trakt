"use client";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

//const STALE_TIME = 1000 * 60 * 2; // 1 minute

// Configure the default query client options
const queryClientConfig = {
  //   defaultOptions: {
  //     queries: {
  //       staleTime: STALE_TIME,
  //     },
  //   },
};

export const ReactQueryProvider = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
