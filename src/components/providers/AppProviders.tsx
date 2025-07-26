"use client"
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function AppProviders({ children, ...props }: React.ComponentProps<typeof NextThemeProvider>) {

  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <NextThemeProvider {...props} attribute={"class"} enableSystem defaultTheme="dark">
        {children}
      </NextThemeProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}
