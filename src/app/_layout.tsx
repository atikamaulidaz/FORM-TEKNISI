import { Stack } from "expo-router";
import { LogBox, View } from "react-native";
import Navbar from "../../component/Navbar";
import "../global.css";

LogBox.ignoreAllLogs();

export default function RootLayout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="pages/HomeScreen" />
        <Stack.Screen name="pages/ResponseScreen" />
        <Stack.Screen name="pages/PemasanganScreen" />
        <Stack.Screen name="pages/FormDetailScreen" />
        <Stack.Screen name="pages/CreateForm" />
        <Stack.Screen name="pages/ActivityScreen" />
        <Stack.Screen name="pages/ProfileScreen" />
        <Stack.Screen name="pages/FormulirScreen" />
        <Stack.Screen name="pages/KasbonScreen" />
        <Stack.Screen name="pages/LoginScreen" />
        <Stack.Screen name="pages/DaftarKaryawanScreen" />
      </Stack>

      <Navbar />
    </View>
  );
}
