import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme } from "react-native";

import { AnimatedSplashOverlay } from "@/components/animated-icon";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="survey-list" />
        <Stack.Screen name="pemasangan-list" />
        <Stack.Screen name="survey" />
        <Stack.Screen name="pemasangan" />
        <Stack.Screen name="rincian-list" />
        <Stack.Screen name="rincian" />
        <Stack.Screen name="gaji-list" />
        <Stack.Screen name="gaji" />
      </Stack>
    </ThemeProvider>
  );
}
