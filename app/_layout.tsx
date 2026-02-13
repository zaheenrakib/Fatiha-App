import {
    Amiri_400Regular,
    Amiri_700Bold,
    useFonts,
} from "@expo-google-fonts/amiri";
import { Galada_400Regular } from "@expo-google-fonts/galada";
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    Amiri_400Regular,
    Amiri_700Bold,
    Galada_400Regular,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#EFE8D8" },
          headerTintColor: "#000",
          contentStyle: { backgroundColor: "#EFE8D8" },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "ফাতিহা",
            headerTitleAlign: "center",
            headerTitleStyle: { fontFamily: "Amiri_700Bold", fontSize: 24 },
          }}
        />
        <Stack.Screen
          name="surah/[id]"
          options={{ title: "সূরা", headerBackTitle: "" }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
      </Stack>
      <StatusBar style="dark" backgroundColor="#EFE8D8" />
    </ThemeProvider>
  );
}
